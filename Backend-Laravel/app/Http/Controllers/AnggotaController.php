<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Anggota;
use Illuminate\Support\Facades\Storage;

class AnggotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $anggota = Anggota::orderBy('urutan', 'asc')->get();
        return response()->json(['data' => $anggota]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'departemen' => 'required|string|max:255',
            'divisi' => 'nullable|string|max:255',
            'is_kepala_departemen' => 'required',
            'urutan' => 'required|integer|min:1',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        $isKadep = filter_var($request->input('is_kepala_departemen'), FILTER_VALIDATE_BOOLEAN);

        $path = $request->file('image')->store('anggota', 'public');

        $anggota = Anggota::create([
            'nama' => $validated['nama'],
            'jabatan' => $validated['jabatan'],
            'departemen' => $validated['departemen'],
            'divisi' => $validated['divisi'] ?? null,
            'is_kepala_departemen' => $isKadep,
            'urutan' => (int) $validated['urutan'],
            'image_path' => $path,
        ]);

        return response()->json($anggota, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $anggota = Anggota::findOrFail($id);
        return response()->json($anggota);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $anggota = Anggota::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'jabatan' => 'sometimes|required|string|max:255',
            'departemen' => 'sometimes|required|string|max:255',
            'divisi' => 'nullable|string|max:255',
            'is_kepala_departemen' => 'sometimes|required',
            'urutan' => 'sometimes|required|integer|min:1',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        $updateData = $request->only(['nama', 'jabatan', 'departemen', 'divisi', 'urutan']);

        if ($request->has('is_kepala_departemen')) {
            $updateData['is_kepala_departemen'] = filter_var($request->input('is_kepala_departemen'), FILTER_VALIDATE_BOOLEAN);
        }

        if ($request->hasFile('image')) {
            // Hapus foto lama jika ada
            if ($anggota->image_path) {
                Storage::disk('public')->delete($anggota->image_path);
            }

            $path = $request->file('image')->store('anggota', 'public');
            $updateData['image_path'] = $path;
        }

        $anggota->update($updateData);

        return response()->json($anggota);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $anggota = Anggota::findOrFail($id);

        if ($anggota->image_path) {
            Storage::disk('public')->delete($anggota->image_path);
        }

        $anggota->delete();

        return response()->json(['message' => 'Anggota berhasil dihapus']);
    }
}
