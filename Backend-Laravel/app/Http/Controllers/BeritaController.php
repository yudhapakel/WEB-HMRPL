<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Berita;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


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
        $berita->excerpt = Str::limit(strip_tags($berita->content), 150);
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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
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
    public function show(string $id)
    {
        return $berita;
    }

    /**
     * Update the specified resource in storage.
     */
    // memperbarui berita (admin)
    public function update(Request $request, string $id)
    {
         $validated = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // 1. SIAPKAN NILAI AWAL DARI GAMBAR YANG SUDAH ADA
    $db_path = $berita->image_path;

    // 2. JIKA ADA GAMBAR BARU DIUPLOAD, BARU PERBARUI NILAI VARIABELNYA
    if ($request->hasFile('image')) {
        // Hapus file lama
        Storage::disk('public')->delete($berita->image_path);
        // Simpan file baru dan perbarui variabel $db_path
        $db_path = $request->file('image')->store('berita', 'public');
    }

    // 3. SEKARANG $db_path PASTI PUNYA NILAI (PATH LAMA ATAU PATH BARU)
    $berita->update([
        'title' => $validated['title'],
        'slug' => Str::slug($validated['title']),
        'content' => $validated['content'],
        'image_path' => $path,
    ]);

    return response()->json($berita);
    }

    /**
     * Remove the specified resource from storage.
     */
    // menghapus berita (admin) 
    public function destroy(string $id)
    {
        // Hapus file gambar dari disk 'public'
        Storage::disk('public')->delete($berita->image_path);
        $berita->delete();

        return response()->json(['message' => 'Berita berhasil dihapus']);
    }
}
