

#  HIMA Project Setup Guide

Panduan buat setup environment lokal project ini biar semua tim bisa jalanin dengan environment yang sama.


##  Prasyarat

Pastikan udah install:

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [HeidiSQL](https://www.heidisql.com/download.php) (opsional, buat manage DB)
* Git


##  Setup Project

1. **Clone repository**

   git clone https://github.com/ORG/REPO.git
   cd REPO
   

2. **Atur file `.env`**

   * Di backend (`/backend/.env`) → isi sesuai contoh `.env.example`
   * Di frontend (`/frontend/.env`) → isi API key, dsb (hubungi be buat dapet key)

3. **Build & jalankan container**

   bash
   docker-compose up -d --build
   

4. **Set permission folder Laravel**

   bash
   docker exec -it hima-laravel-app bash
   chown -R www-data:www-data storage bootstrap/cache
   chmod -R 775 storage bootstrap/cache
   exit
   

5. **Buat symlink storage Laravel**

   bash
   docker exec -it hima-laravel-app php artisan storage:link
   


##  Setup Database

Ada dua opsi untuk setup database:

###  Opsi 1 – Import file `.sql` (snapshot dari lead dev)

1. Dapetin file `db_dump.sql` dari be (via Drive/WA/Discord).
2. Import ke container database:

   bash
   docker exec -i hima-laravel-db mysql -u root -p laravel_db < db_dump.sql
   
3. Selesai, DB udah sama dengan punya be dev.



###  Opsi 2 – Pakai Migration & Seeder (Laravel way)

1. Jalanin migration & seeder di container:

   bash
   docker exec -it hima-laravel-app php artisan migrate --seed
   
2. DB kosong langsung keisi struktur + data awal.


## Akses & Cek

* **Frontend**: [http://localhost:3000](http://localhost:3000) (ubah sesuai port di `docker-compose.yml`)
* **Backend Laravel**: [http://localhost:8000](http://localhost:8000)
* **DB Manager (HeidiSQL)**:

  * Host: `127.0.0.1`
  * Port: `3306` (atau sesuai di docker-compose)
  * User: `root`
  * Password: `root` (atau cek `.env` backend)

---

##  Catatan untuk Tim

* Jangan commit file `.env` → isinya sensitif (API key, DB password, dsb).
* Kalau ada perubahan schema DB, **wajib update migration/seeder** atau export `.sql` baru lalu share ke tim.
* Kalau ada error permission, ulangin step **Set permission folder Laravel**.

