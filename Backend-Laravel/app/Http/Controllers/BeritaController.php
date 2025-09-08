<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Berita;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;


class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // menampilkan semua berita (publik dan admin)
    public function index()
    {
        $beritaPaginated = Berita::latest()->paginate(7);

        // Transformasi data sebelum dikirim
        $beritaPaginated->getCollection()->transform(function ($berita) {
            // Buat properti baru 'imageUrl' dengan URL lengkap
            $berita->imageUrl = Storage::url($berita->image_path);
            // Buat excerpt sederhana
            $berita->excerpt = Str::limit(strip_tags(html_entity_decode($berita->content)), 150);
            // Format tanggal
            $berita->date = $berita->created_at->translatedFormat('d F Y');
            return $berita;
        });

        return $beritaPaginated;
    }

    /**
     * Store a newly created resource in storage.
     */
    // menyimpan berita baru (admin)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        $path = $request->file('image')->store('berita', 'public');
        // $db_path = str_replace('public/', '', $path);

        $berita = Berita::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']), // Otomatis buat slug
            'content' => $validated['content'],
            'image_path' => $path,
        ]);

        return response()->json($berita, 201);
    }

    /**
     * Display the specified resource.
     */
    // menampilkan satu berita(untuk edit dan detail page)
    public function show(Berita $berita)
    {
        return $berita;
    }

    /**
     * Update the specified resource in storage.
     */
    // memperbarui berita (admin)
// app/Http/Controllers/BeritaController.php

public function update(Request $request, Berita $berita)
{
    // 1. Validasi input yang masuk
    $validated = $request->validate([
        'title' => 'sometimes|required|string|max:255',
        'content' => 'sometimes|required|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
    ]);

    // 2. Siapkan data yang akan diupdate dari input teks
    //    Gunakan only() untuk mengambil data hanya jika ada di request
    $updateData = $request->only(['title', 'content']);

    // 3. Jika ada judul baru, buat slug baru
    if ($request->has('title')) {
        $updateData['slug'] = Str::slug($request->title);
    }

    // 4. Proses gambar jika ada file baru yang diupload
    if ($request->hasFile('image')) {
        // Hapus gambar lama dari storage jika ada
        if ($berita->image_path) {
            Storage::disk('public')->delete($berita->image_path);
        }

        // Simpan gambar baru dan tambahkan path-nya ke data yang akan diupdate
        $path = $request->file('image')->store('berita', 'public');
        $updateData['image_path'] = $path;
    }

    // 5. Jalankan update ke database dengan data yang sudah siap
    $berita->update($updateData);

    return response()->json($berita);
}
    /**
     * Remove the specified resource from storage.
     */
    // menghapus berita (admin) 
    public function destroy(Berita $berita)
    {
        // Hapus file gambar dari disk 'public'
        Storage::disk('public')->delete($berita->image_path);

        // Hapus record dari database
        $berita->delete();

        return response()->json(['message' => 'Berita berhasil dihapus']);
    }

    public function latest()
    {
        // Ambil tiga berita terbaru
        $latest = Berita::latest()->take(3)->get();

        $latest->transform(function ($berita) {
            $berita->imageUrl = Storage::url($berita->image_path);
            $berita->excerpt = Str::limit(strip_tags(html_entity_decode($berita->content)), 150);
            $berita->date = $berita->created_at->translatedFormat('d F Y');
            return $berita;
        });

        return response()->json($latest);
    }
}
