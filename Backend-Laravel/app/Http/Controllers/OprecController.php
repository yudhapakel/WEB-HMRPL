<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Oprec;

class OprecController extends Controller
{
    // app/Http/Controllers/OprecController.php

public function store(Request $request)
{
    $validated = $request->validate([
        'poster' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
    ]);

    // Simpan file baru
    $path = $request->file('poster')->store('posters', 'public');
    
    // Buat record baru di database
    Oprec::create(['poster_path' => $path]);

    // Tentukan batas maksimal poster
    $maxPosters = 3;
    $allPosters = Oprec::orderBy('created_at', 'desc')->get();

    // Jika jumlah poster melebihi batas
    if ($allPosters->count() > $maxPosters) {
        // Ambil semua poster kecuali 3 yang terbaru
        $postersToDelete = $allPosters->slice($maxPosters);

        foreach ($postersToDelete as $oldPoster) {
            // Hapus file fisik dari storage
            Storage::disk('public')->delete($oldPoster->poster_path);
            // Hapus record dari database
            $oldPoster->delete();
        }
    }

    return response()->json([
        'message' => 'Poster berhasil diunggah',
        'path' => Storage::url($path)
    ], 201);
}

    public function index()
    {
        $latestOprec = Oprec::orderBy('created_at', 'desc')->take(3)->get();

        $formattedOprec = $latestOprec->map(function ($oprec) {
            return [
                'id' => $oprec->id,
                'poster_url' => Storage::url($oprec->poster_path) 
            ];
        });

        return response()->json($formattedOprec);
    }
}
