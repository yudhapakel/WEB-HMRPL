<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Aspirasi extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nim',
        'kategori',
        'pesan',
        'is_anonim',
    ];
}
