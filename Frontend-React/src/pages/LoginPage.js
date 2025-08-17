import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";
import { useAuth } from "../Context/AuthContext";

import LogoHima from "../assets/LogoHima.png";
import LogoKabinet from "../assets/LogoKabinet.png";

import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

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
      // await axiosInstance.post('/login', { username, password });

      // Simulasi delay login
      setTimeout(() => {
         const userData = { name: username };
                const token = 'dummy-token-12345';
                console.log("Data yang dikirim ke context:", userData);
                login(userData, token);
      }, 1000);
    } catch (err) {
      setError("Username atau password salah.");
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
            <a href="https://instagram.com">
              <FaInstagram />
            </a>
            <a href="https://youtube.com">
              <FaYoutube />
            </a>
            <a href="https://linkedin.com">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
