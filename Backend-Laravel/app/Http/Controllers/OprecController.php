<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Oprec;

class OprecController extends Controller {
    public function store(Request $request) {
       $request->validate([
            'poster' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('poster')) {
            // 1. Simpan file baru ke disk 'public' di dalam folder 'posters'. Ini akan menyimpan file fisik.
            $path = $request->file('poster')->store('posters', 'public');
            
            // 2. Buat record baru di tabel 'oprecs' untuk poster yang baru diunggah.
            //    Ini akan otomatis memiliki `created_at` yang paling baru.
            Oprec::create(['poster_path' => $path]);

            // 3. Tentukan batas maksimal poster yang ingin disimpan.
            $maxPosters = 3;

            // 4. Cek jumlah poster setelah penambahan.
            $currentPosterCount = Oprec::count();

            // 5. Jika jumlah poster melebihi batas, hapus poster terlama.
            if ($currentPosterCount > $maxPosters) {
                // Ambil semua poster kecuali yang terbaru (sebanyak $maxPosters)
                // dan urutkan berdasarkan created_at secara ascending (terlama ke terbaru).
                // Kemudian ambil yang pertama (yang paling lama).
                $oldestPostersToDelete = Oprec::orderBy('created_at', 'asc')
                                            ->take($currentPosterCount - $maxPosters) // Ambil sejumlah yang perlu dihapus
                                            ->get();

                foreach ($oldestPostersToDelete as $oldPoster) {
                    // Hapus file fisik dari storage
                    Storage::disk('public')->delete($oldPoster->poster_path);
                    // Hapus record dari database
                    $oldPoster->delete();
                }
            }

            return response()->json([
                'message' => 'Poster berhasil diunggah',
                'path' => Storage::url($path)
            ], 201); // 201 Created karena resource baru dibuat.
        }

        return response()->json(['message' => 'Upload gagal.'], 400);
    }

    public function index()  {
        // 1. Ambil 3 data oprec TERBARU saja, diurutkan dari yang paling baru.
        //    Ini akan secara alami menampilkan poster yang "bergeser" ke posisi terbaru.
        $latestOprec = Oprec::orderBy('created_at', 'desc')->take(3)->get();

        // 2. Format datanya agar mudah digunakan di frontend
        $formattedOprec = $latestOprec->map(function ($oprec) {
            return [
                'id' => $oprec->id,
                'poster_url' => Storage::url($oprec->poster_path) // Asumsi nama kolomnya poster_path
            ];
        });

        // 3. Kirim sebagai array JSON
        return response()->json($formattedOprec);
    }

}