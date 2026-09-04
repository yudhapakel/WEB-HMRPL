<?php

namespace Database\Seeders;

use App\Models\Anggota;
use Illuminate\Database\Seeder;

class DummyAnggotaSeeder extends Seeder
{
    public function run(): void
    {
        // Daftar gambar yang sudah ada di storage/app/public/anggota/
        $imgs = [
            'anggota/dummy.png',
            'anggota/6uTgkvnLU9vt0VASNyuz9zeMpX3IpdEvdFUpiRYL.jpg',
            'anggota/7HA7fY8cty6PvnhrpHYogU4jw2boKWnP01CWSZsM.jpg',
            'anggota/G5arFzkkZkDV6CCUgEs4aJNoN8tBwm2KX2uDFLh1.jpg',
            'anggota/TPqEuIuKe1TJWKcVzNOz3HjS7So9pvxclDUHMFlj.jpg',
            'anggota/tMDQtMiJDSNuMeSQNKjapO1UEuz8ZllYJO5fdak6.jpg',
        ];

        $i = 0;
        $getImg = function () use (&$i, $imgs) {
            $img = $imgs[$i % count($imgs)];
            $i++;
            return $img;
        };

        $rows = [];

        // === INTI (tanpa divisi) ===
        $rows[] = ['nama' => 'Ahmad Fauzi',           'jabatan' => 'Ketua Umum',             'departemen' => 'inti',         'divisi' => null,  'is_kepala_departemen' => false, 'urutan' => 1];
        $rows[] = ['nama' => 'Siti Rahmawati',        'jabatan' => 'Wakil Ketua Umum',       'departemen' => 'inti',         'divisi' => null,  'is_kepala_departemen' => false, 'urutan' => 2];
        $rows[] = ['nama' => 'Dwi Santoso',           'jabatan' => 'Sekretaris Umum',        'departemen' => 'inti',         'divisi' => null,  'is_kepala_departemen' => false, 'urutan' => 3];
        $rows[] = ['nama' => 'Rina Purnamasari',      'jabatan' => 'Bendahara Umum',         'departemen' => 'inti',         'divisi' => null,  'is_kepala_departemen' => false, 'urutan' => 4];

        // === INTERNAL ===
        $rows[] = ['nama' => 'Rizky Pratama',         'jabatan' => 'Kepala Departemen Internal', 'departemen' => 'internal',  'divisi' => null,  'is_kepala_departemen' => true, 'urutan' => 1];
        $rows[] = ['nama' => 'Nurul Aini',            'jabatan' => 'Kepala Kaderisasi',      'departemen' => 'internal',     'divisi' => 'kaderisasi', 'is_kepala_departemen' => false, 'urutan' => 1];
        $rows[] = ['nama' => 'Budi Setiawan',         'jabatan' => 'Kepala Pengembangan SDM', 'departemen' => 'internal',     'divisi' => 'psdm', 'is_kepala_departemen' => false, 'urutan' => 1];
        $rows[] = ['nama' => 'Maya Anggraini',        'jabatan' => 'Kepala Akademik & Riset', 'departemen' => 'internal',     'divisi' => 'akademik-riset', 'is_kepala_departemen' => false, 'urutan' => 1];
        $rows[] = ['nama' => 'Andi Saputra',          'jabatan' => 'Staff Kaderisasi',       'departemen' => 'internal',     'divisi' => 'kaderisasi', 'is_kepala_departemen' => false, 'urutan' => 2];
        $rows[] = ['nama' => 'Dewi Lestari',          'jabatan' => 'Staff PSDM',             'departemen' => 'internal',     'divisi' => 'psdm', 'is_kepala_departemen' => false, 'urutan' => 2];

        // === EKSTERNAL ===
        $rows[] = ['nama' => 'Fajar Nugroho',         'jabatan' => 'Kepala Departemen Eksternal', 'departemen' => 'eksternal', 'divisi' => null,  'is_kepala_departemen' => true, 'urutan' => 1];
        $rows[] = ['nama' => 'Intan Permata',         'jabatan' => 'Kepala Relasi Eksternal','departemen' => 'eksternal',    'divisi' => 'relasi-eksternal', 'is_kepala_departemen' => false, 'urutan' => 1];
        $rows[] = ['nama' => 'Galih Ramadhan',        'jabatan' => 'Kepala Kerjasama & Kewirausahaan', 'departemen' => 'eksternal', 'divisi' => 'kerjasama', 'is_kepala_departemen' => false, 'urutan' => 1];
        $rows[] = ['nama' => 'Citra Ayu',             'jabatan' => 'Staff Relasi Eksternal', 'departemen' => 'eksternal',    'divisi' => 'relasi-eksternal', 'is_kepala_departemen' => false, 'urutan' => 2];

        // === MEDIA KREATIF ===
        $rows[] = ['nama' => 'Rafi Ananda',           'jabatan' => 'Kepala Media Kreatif',   'departemen' => 'mediakreatif', 'divisi' => null,  'is_kepala_departemen' => true, 'urutan' => 1];
        $rows[] = ['nama' => 'Aulia Putri',           'jabatan' => 'Kepala Komunikasi & Informasi', 'departemen' => 'mediakreatif', 'divisi' => 'komunikasiInformasi', 'is_kepala_departemen' => false, 'urutan' => 1];
        $rows[] = ['nama' => 'Yoga Prasetyo',         'jabatan' => 'Staff Kominfo',          'departemen' => 'mediakreatif', 'divisi' => 'komunikasiInformasi', 'is_kepala_departemen' => false, 'urutan' => 2];

        // === STAFF MUDA (section terpisah, tanpa divisi) ===
        $rows[] = ['nama' => 'Rendi Firmansyah',      'jabatan' => 'Staff Muda',            'departemen' => 'staffmuda',    'divisi' => null,  'is_kepala_departemen' => false, 'urutan' => 1];
        $rows[] = ['nama' => 'Nadia Putri',           'jabatan' => 'Staff Muda',            'departemen' => 'staffmuda',    'divisi' => null,  'is_kepala_departemen' => false, 'urutan' => 2];
        $rows[] = ['nama' => 'Dimas Aji',             'jabatan' => 'Staff Muda',            'departemen' => 'staffmuda',    'divisi' => null,  'is_kepala_departemen' => false, 'urutan' => 3];
        $rows[] = ['nama' => 'Sarah Azizah',          'jabatan' => 'Staff Muda',            'departemen' => 'staffmuda',    'divisi' => null,  'is_kepala_departemen' => false, 'urutan' => 4];

        foreach ($rows as $r) {
            Anggota::create([
                'nama' => $r['nama'],
                'jabatan' => $r['jabatan'],
                'departemen' => $r['departemen'],
                'divisi' => $r['divisi'],
                'is_kepala_departemen' => $r['is_kepala_departemen'],
                'urutan' => $r['urutan'],
                'image_path' => $getImg(),
            ]);
        }

        $this->command->info('Dummy anggota seeded: ' . count($rows));
    }
}
