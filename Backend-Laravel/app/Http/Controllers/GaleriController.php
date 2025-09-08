<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GaleriController extends Controller
{
    // MENAMPILKAN SEMUA GAMBAR (UNTUK PUBLIK)
    public function index(Request $request)
    {
       // Ambil limit dari query parameter, jika tidak ada, default-nya 6
        $limit = $request->query('limit', 6);

        $galeriPaginated = Galeri::latest()->paginate($limit);

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
            'images' => 'required|array',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240' // Naikkan batas & tambah webp
        ]);

        $uploadedImages = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                
                // --- KITA TERAPKAN POLA YANG SAMA SEPERTI BERITA ---
                // 1. Buat nama file unik sendiri
                $namaFile = Str::random(40) . '.' . $file->getClientOriginalExtension();

                // 2. Simpan dengan nama yang sudah kita buat
                $file->storeAs('galeri', $namaFile, 'public');

                // 3. Simpan path yang bersih ke database
                $galeri = Galeri::create([
                    'image_path' => 'galeri/' . $namaFile
                ]);
                // --------------------------------------------------

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
