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
                'staff' => $awards->staff_image_path ? Storage::url($awards->staff_image_path) : null,
                'divisi' => $awards->divisi_image_path ? Storage::url($awards->divisi_image_path) : null,
                'departemen' => $awards->departemen_image_path ? Storage::url($awards->departemen_image_path) : null,
            ];
        }

        return response()->json($response);
    }

    // FUNGSI UNTUK MENG-UPDATE GAMBAR (KHUSUS ADMIN)
    public function update(Request $request)
    {
        $request->validate([
            'staff_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'divisi_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'departemen_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $awards = Awarding::firstOrCreate([]);

        $categories = ['staff', 'divisi', 'departemen'];

        foreach ($categories as $category) {
            $fileKey = $category . '_image';
            $dbColumn = $category . '_image_path';

            if ($request->hasFile($fileKey)) {
                if ($awards->$dbColumn) {
                    Storage::disk('public')->delete($awards->$dbColumn);
                }
                $path = $request->file($fileKey)->store('awarding', 'public');
                $awards->$dbColumn = $path;
            }
        }

        $awards->save();

        return response()->json(['message' => 'Gambar awarding berhasil diperbarui.']);
    }
}
