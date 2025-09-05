<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Oprec;

class OprecController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'poster' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('poster')) {
            $path = $request->file('poster')->store('posters', 'public');

            Oprec::create(['poster_path' => $path]);

            $maxPosters = 3;

            $currentPosterCount = Oprec::count();

            if ($currentPosterCount > $maxPosters) {
                $oldestPostersToDelete = Oprec::orderBy('created_at', 'asc')
                    ->take($currentPosterCount - $maxPosters)
                    ->get();

                foreach ($oldestPostersToDelete as $oldPoster) {
                    Storage::disk('public')->delete($oldPoster->poster_path);
                    $oldPoster->delete();
                }
            }

            return response()->json([
                'message' => 'Poster berhasil diunggah',
                'path' => Storage::url($path)
            ], 201); 
        }

        return response()->json(['message' => 'Upload gagal.'], 400);
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
