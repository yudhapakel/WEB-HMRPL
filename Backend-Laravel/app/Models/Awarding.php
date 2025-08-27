<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Awarding extends Model
{
    use HasFactory;
    protected $fillable = ['staff_image_path', 'divisi_image_path', 'departemen_image_path'];
}
