<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aspirasi;

class AspirasiController extends Controller
{
     public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama' => 'nullable|string|max:255',
            'nim' => 'nullable|string|max:255',
            'kategori' => 'required|string|in:Kritik,Saran,Apresiasi',
            'pesan' => 'required|string',
            'isAnonim' => 'required|boolean',
        ]);

        $validatedData['is_anonim'] = $validatedData['isAnonim'];
        unset($validatedData['isAnonim']);

        Aspirasi::create($validatedData);

        return response()->json(['message' => 'Aspirasi berhasil terkirim'], 201);
    }

    /**
     * Fungsi untuk menampilkan semua aspirasi (Khusus Admin).
     */
    public function index()
    {
        return Aspirasi::latest()->get();
    }
}
