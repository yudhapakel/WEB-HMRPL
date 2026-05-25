<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GaleriController extends Controller
{
    // MENYIMPAN GAMBAR BARU (ADMIN)
    public function index(Request $request)
    {
        $limit = $request->query('limit', 6);

        // Jika minta seluruh data tanpa pagination (biasanya untuk Kelola Galeri di Admin)
        if ($limit === 'all') {
            $galeri = Galeri::latest()->get()->map(function ($item) {
                $item->imageUrl = Storage::url($item->image_path);
                return $item;
            });
            return response()->json(['data' => $galeri]);
        }

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
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'caption' => 'nullable|string|max:1000',
            'images' => 'nullable|array',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240'
        ]);

        $uploadedImages = [];

        // Opsi A: Upload single image dengan deskripsi/caption
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $namaFile = Str::random(40) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('galeri', $namaFile, 'public');

            $galeri = Galeri::create([
                'image_path' => 'galeri/' . $namaFile,
                'caption' => $request->input('caption')
            ]);

            $uploadedImages[] = $galeri;
        }
        // Opsi B: Upload multiple images sekaligus (legacy)
        elseif ($request->hasFile('images')) {
            $caption = $request->input('caption'); // Ambil caption umum jika dikirim
            foreach ($request->file('images') as $file) {
                $namaFile = Str::random(40) . '.' . $file->getClientOriginalExtension();
                $file->storeAs('galeri', $namaFile, 'public');

                $galeri = Galeri::create([
                    'image_path' => 'galeri/' . $namaFile,
                    'caption' => $caption
                ]);

                $uploadedImages[] = $galeri;
            }
        }

        if (count($uploadedImages) === 0) {
            return response()->json(['message' => 'Tidak ada gambar yang diunggah.'], 400);
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
