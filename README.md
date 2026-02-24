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

## ⚙ Prasyarat

Sebelum memulai instalasi, pastikan perangkat Anda telah terinstal software berikut:

* [Git](https://git-scm.com/) - Untuk manajemen versi.
* [Docker Desktop](https://www.docker.com/products/docker-desktop) - **Sangat disarankan** untuk kemudahan instalasi environment.
* **Opsional (Jika instalasi manual tanpa Docker):**
    * [PHP](https://www.php.net/) (Versi 8.2 atau lebih baru)
    * [Composer](https://getcomposer.org/)
    * [Node.js](https://nodejs.org/) (LTS Version) & NPM
    * MySQL Server

---

## 🚀 Instalasi dan Menjalankan Project

### Opsi 1: Menggunakan Docker (Direkomendasikan)

Metode ini akan menjalankan Backend (Laravel), Frontend (React), dan Database (MySQL) secara otomatis dalam container.

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username/web-hmrpl.git](https://github.com/username/web-hmrpl.git)
    cd web-hmrpl
    ```

2.  **Setup Environment Backend**
    Salin file konfigurasi lingkungan untuk backend.
    ```bash
    cp Backend-Laravel/.env.example Backend-Laravel/.env
    ```
    *Catatan: Pastikan `DB_HOST` di dalam `.env` diatur ke `mysql` (sesuai nama service di docker-compose).*

3.  **Jalankan Container**
    ```bash
    docker-compose up -d --build
    ```

4.  **Setup Database & Dependencies**
    Masuk ke dalam container backend untuk melakukan instalasi dependensi PHP dan migrasi database.
    ```bash
    docker-compose exec app bash
    ```
    
    Setelah masuk ke terminal container (`root@...:/var/www`), jalankan perintah berikut:
    ```bash
    composer install
    php artisan key:generate
    php artisan migrate --seed
    php artisan storage:link
    exit
    ```

5.  **Akses Aplikasi**
    * 🏠 **Frontend:** [http://localhost:3000](http://localhost:3000)
    * 📡 **Backend API:** [http://localhost:8000](http://localhost:8000)

### Opsi 2: Instalasi Manual (Tanpa Docker)

Jika Anda ingin menjalankan service satu per satu di host machine Anda.

#### 1. Setup Backend (Laravel)
```bash
cd Backend-Laravel
cp .env.example .env
# Edit .env: Pastikan DB_HOST=127.0.0.1 dan DB_DATABASE sudah dibuat di MySQL lokal Anda.

composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve

#### 2. Setup Frontend (React)
```bash
cd Frontend-React
npm install
npm start
Frontend berjalan di port 3000.

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi dari anggota HMRPL! Silakan ikuti langkah-langkah berikut:

1.  **Fork** repository ini.
2.  Buat branch fitur baru:
    ```bash
    git checkout -b fitur/nama-fitur-keren
    ```
3.  Commit perubahan Anda:
    ```bash
    git commit -m 'Menambahkan fitur X'
    ```
4.  Push ke branch:
    ```bash
    git push origin fitur/nama-fitur-keren
    ```
5.  Buat **Pull Request** baru di GitHub.

---

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).

---

<center>
  <p>Dibuat dengan 💻, ☕, dan ❤️ oleh <b>Tim Developer HMRPL</b></p>
</center>

