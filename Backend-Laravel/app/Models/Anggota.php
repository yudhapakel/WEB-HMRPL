<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Anggota extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'jabatan',
        'departemen',
        'divisi',
        'is_kepala_departemen',
        'urutan',
        'image_path'
    ];

    protected $casts = [
        'is_kepala_departemen' => 'boolean',
        'urutan' => 'integer',
    ];
}
