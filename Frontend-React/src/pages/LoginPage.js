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

  try {
    // 1. Dapatkan CSRF cookie (Ini sudah benar)
    await axiosInstance.get('/sanctum/csrf-cookie');

    // 2. Kirim request login (Ini sudah benar)
    const res = await axiosInstance.post('/login', {
      email: username,
      password: password
    });

    // --- INI BAGIAN YANG DIUBAH ---

    // 3. Ambil data user dari respons
    // Kita TIDAK butuh token.
    const userData = res.data.user; // (Pastikan backend-mu mengirim 'user')

    // 4. Panggil fungsi login dari Context HANYA dengan data user
    // Cookie session sudah otomatis disimpan oleh browser.
    login(userData);

  } catch (err) {
    console.error("Isi error (err):", err);

    if (err.response) {
      // Tampilkan pesan error dari server (cth: "Email atau password salah")
      setError(err.response?.data?.message || "Terjadi kesalahan pada server");
    } else {
      setError("Tidak bisa terhubung ke server.");
    }

  } finally {
    setLoading(false);
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
