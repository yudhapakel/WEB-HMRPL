<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class GaleriController extends Controller
{
    // MENAMPILKAN SEMUA GAMBAR (UNTUK PUBLIK)
    public function index(Request $request)
    {
       // Ambil limit dari query parameter, jika tidak ada, default-nya 6
        $limit = $request->query('limit', 6);

    // GUNAKAN ->paginate() BUKAN ->get()
        $galeriPaginated = Galeri::latest()->paginate($limit);

    // Transformasi data untuk menambahkan URL lengkap
    // Ini penting agar gambar bisa tampil
        $galeriPaginated->getCollection()->transform(function ($item) {
        // Buat properti baru 'imageUrl'
            $item->imageUrl = Storage::url($item->image_path);
            return $item;
        });

    return $galeriPaginated;
    }

    // MENYIMPAN GAMBAR BARU (ADMIN)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'images' => 'required|array', // Pastikan 'images' adalah array
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048' // Validasi setiap item di dalam array
        ]);

        $uploadedImages = [];
        if ($request->hasFile('images')) {
            // Loop untuk setiap file yang diupload
            foreach ($request->file('images') as $file) {
                $path = $file->store('galeri', 'public');

                $galeri = Galeri::create([
                    'image_path' => $path
                ]);

                $uploadedImages[] = $galeri;
            }
        }

        return response()->json([
            'message' => count($uploadedImages) . ' gambar berhasil diunggah.',
            'data' => $uploadedImages
        ], 201);
    }

    // FUNGSI UNTUK HAPUS GAMBAR (NANTI DIPERLUKAN ADMIN)
    public function destroy(Galeri $galeri)
    {
        Storage::disk('public')->delete($galeri->image_path);
        $galeri->delete();
        return response()->json(['message' => 'Gambar berhasil dihapus.']);
    }
}
