import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";

import "./LoginPage.css";
import { useAuth } from "../Context/AuthContext";

import LogoHima from "../assets/LogoHima.png";
import LogoKabinet from "../assets/LogoKabinet.png";

import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";


import axiosInstance from "../api/axiosInstance";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); 


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  console.log("--- MEMULAI PROSES LOGIN ---");

  try {
    console.log("Langkah 1: Mengambil CSRF cookie...");
    await axiosInstance.get('/sanctum/csrf-cookie');
    console.log("Langkah 1: CSRF Cookie berhasil didapat.");

    console.log("Langkah 2: Mengirim data login ke /api/login...", { email: username, password: "Password sengaja disembunyikan" });
    const res = await axiosInstance.post('/api/login', {
      email: username,
      password: password
    }, { withCredentials: true });

    console.log("Langkah 3: Menerima response dari Laravel. Isinya:", res);
    console.log("Langkah 3.1: Data di dalam response (res.data):", res.data);

    const token = res.data.token;
    console.log("Langkah 4: Mencoba mengambil token dari res.data.token. Isinya:", token);

    if (!token) {
        console.error("!!! KESALAHAN KRITIS: Token tidak ditemukan di dalam response dari server. Cek 'Langkah 3.1' di atas, pastikan object 'data' memiliki properti 'token'.");
        setError("Gagal mendapatkan token dari server.");
        setLoading(false);
        return; 
    }

    console.log("Langkah 5: Mencoba menyimpan token ke localStorage...");
    localStorage.setItem('token', token);
    console.log("Langkah 5.1: Token SEHARUSNYA sudah tersimpan. Silakan cek tab Application > Local Storage sekarang.");

    console.log("Langkah 6: Login berhasil, data user dan token akan disimpan ke context.");
    const userData = res.data.user;
    login(userData, token);

  } catch (err) {
    console.error("!!! TERJADI ERROR DI BLOK CATCH !!!");
    console.error("Isi error (err):", err);

    if (err.response) {
      console.error("Response error dari server (err.response):", err.response);
      setError(err.response?.data?.message || "Terjadi kesalahan pada server");
    } else {
      setError("Tidak bisa terhubung ke server.");
    }

  } finally {
    setLoading(false);
    console.log("--- PROSES LOGIN SELESAI ---");
  }
};

  return (
    <div className="login-container">
      {/* Kolom Kiri */}
      <div className="login-branding">
        <img src={LogoHima} alt="Logo Himpunan" className="login-main-logo" />
        <h1 className="branding-title">
          WEBSITE HIMPUNAN MAHASISWA REKAYASA PERANGKAT LUNAK
        </h1>
      </div>

      {/* Kolom Kanan */}
      <div className="login-form-wrapper">
        <div className="form-header">
          <img src={LogoHima} alt="Logo HIMA" height="50" />
          <img src={LogoKabinet} alt="Logo Kabinet" height="50" />
        </div>

        <h2 className="login-title">LOGIN ADMIN</h2>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger text-center">{error}</p>}

          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Masukkan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-login w-100"
            disabled={loading}
          >
            {loading ? "LOADING..." : "LOGIN"}
          </button>
        </form>

        <div className="social-media-section">
          <p>Kunjungi sosial media HMRPL</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/hmrpl.telu/">
              <FaInstagram />
            </a>
            <a href="https://youtube.com">
              <FaYoutube />
            </a>
            <a href="https://www.linkedin.com/company/hmrpl-telkom-university/">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
