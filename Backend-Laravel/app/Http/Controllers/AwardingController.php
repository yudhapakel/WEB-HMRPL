<?php

namespace App\Http\Controllers;

use App\Models\Awarding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AwardingController extends Controller
{
    // FUNGSI UNTUK MENGAMBIL DATA GAMBAR TERKINI (UNTUK PUBLIK & ADMIN)
    public function show()
    {
        $awards = Awarding::first();

        $response = [
            'staff' => null,
            'divisi' => null,
            'departemen' => null,
        ];

        if ($awards) {
            $response = [
                'staff_image_path' => $awards->staff_image_path ?? null,
                'divisi_image_path' => $awards->divisi_image_path ?? null,
                'departemen_image_path' => $awards->departemen_image_path ?? null,
            ];
        }

        return response()->json($response);
    }

    // FUNGSI UNTUK MENG-UPDATE GAMBAR (KHUSUS ADMIN)


public function update(Request $request)
{
    $request->validate([
        'staff_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        'divisi_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        'departemen_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
    ]);

    $awards = Awarding::firstOrCreate([]);
    $updateData = [];

    $categories = ['staff', 'divisi', 'departemen'];

    foreach ($categories as $category) {
        $fileKey = $category . '_image';
        $dbColumn = $category . '_image_path';

        if ($request->hasFile($fileKey)) {
            if ($awards->$dbColumn) {
                Storage::disk('public')->delete($awards->$dbColumn);
            }
            $path = $request->file($fileKey)->store('awarding', 'public');
            $updateData[$dbColumn] = $path;
        }
    }
    
    // Hanya jalankan 'update' jika ada data baru
    if (!empty($updateData)) {
        $awards->update($updateData);
    }

    return response()->json(['message' => 'Gambar awarding berhasil diperbarui.']);
}
}
