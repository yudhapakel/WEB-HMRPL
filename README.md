# Website Himpunan Mahasiswa Rekayasa Perangkat Lunak (WEB HMRPL) 🚀

![HMRPL Logo](Frontend-React/public/LogoHMRPL.jpg)

Repository ini berisi source code untuk website resmi **Himpunan Mahasiswa Rekayasa Perangkat Lunak (HMRPL)**. Website ini berfungsi sebagai pusat informasi, profil organisasi, portal berita, galeri kegiatan, serta sarana penyampaian aspirasi bagi mahasiswa.

Proyek ini dibangun menggunakan arsitektur **Monorepo** yang memisahkan Backend (Laravel) dan Frontend (React).

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Proyek](#-struktur-proyek)
- [Prasyarat](#-prasyarat)
- [Instalasi dan Menjalankan Project](#-instalasi-dan-menjalankan-project)
  - [Menggunakan Docker (Direkomendasikan)](#opsi-1-menggunakan-docker)
  - [Instalasi Manual](#opsi-2-instalasi-manual)
- [Environment Variables](#-environment-variables)
- [Kontribusi](#-kontribusi)

## ✨ Fitur

### 👤 Pengunjung (Public)
* **Beranda:** Informasi umum dan highlight kegiatan terkini.
* **Tentang Kami:** Visi, Misi, Sejarah, dan Struktur Organisasi HMRPL.
* **Berita:** Artikel dan pengumuman terbaru seputar prodi dan himpunan.
* **Galeri:** Dokumentasi foto kegiatan Himpunan.
* **Rekrutmen (Oprec):** Informasi pendaftaran anggota atau kepanitiaan baru.
* **Aspirasi:** Form untuk menyampaikan kritik, saran, atau aspirasi secara online.
* **Awarding:** Halaman penghargaan (Department/Staff terbaik).

### 🛡️ Admin (Dashboard)
* **Autentikasi:** Login aman untuk pengurus/admin.
* **Manajemen Berita:** Tambah, edit, dan hapus berita.
* **Manajemen Galeri:** Upload dan kelola foto dokumentasi.
* **Manajemen Oprec:** Mengelola informasi open recruitment.
* **Lihat Aspirasi:** Melihat data aspirasi yang masuk dari mahasiswa.
* **Manajemen Awarding:** Mengatur data penghargaan internal.

## 🛠 Teknologi yang Digunakan

### Backend (`/Backend-Laravel`)
* **Framework:** Laravel 10/11
* **Database:** MySQL
* **API:** REST API dengan Laravel Sanctum (Authentication)
* **Containerization:** Docker & Nginx

### Frontend (`/Frontend-React`)
* **Library:** React.js
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Styling:** CSS3 / Custom CSS

## 📂 Struktur Proyek

```bash
├── Backend-Laravel/      # Source code backend (API)
│   ├── app/              # Controllers, Models (Aspirasi, Berita, dll)
│   ├── database/         # Migrations & Seeders
│   ├── docker/           # Konfigurasi Nginx & Supervisor
│   └── ...
├── Frontend-React/       # Source code frontend (UI)
│   ├── src/
│   │   ├── admin/        # Halaman & Komponen Dashboard Admin
│   │   ├── components/   # Komponen UI Reusable
│   │   ├── pages/        # Halaman Publik
│   │   └── context/      # State Management (Auth, Galeri, dll)
│   └── ...
├── docker-compose.yml    # Orkestrasi container Docker
└── README.md
