<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OprecController extends Controller {
    public function store(Request $request) {
        $request->validate([
            'poster' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

            // Simpan ke file storage/public/posters
            $path = $request->file('poster')->store('posters', 'public');


            return response()->json([
                'message' => 'Poster berhasil diunggah',
                'path' => asset('storage/'. $path)
            ], 201);
    }

    public function index()  {
        // 1. Ambil SEMUA data oprec, urutkan dari yang paling baru
        $allOprec = Oprec::latest()->get();

        // 2. Format datanya agar mudah digunakan di frontend
        $formattedOprec = $allOprec->map(function ($oprec) {
            return [
                'id' => $oprec->id,
                'poster_url' => Storage::url($oprec->poster_path) // Asumsi nama kolomnya poster_path
            ];
        });

        // 3. Kirim sebagai array JSON
        return response()->json($formattedOprec);
    }
}