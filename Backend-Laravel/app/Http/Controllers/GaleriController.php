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
        $limit = $request->query('limit', 6);

        $galeriPaginated = Galeri::latest()->paginate($limit);

        $galeriPaginated->getCollection()->transform(function ($item) {
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
                
                $namaFile = Str::random(40) . '.' . $file->getClientOriginalExtension();

                $file->storeAs('galeri', $namaFile, 'public');

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
