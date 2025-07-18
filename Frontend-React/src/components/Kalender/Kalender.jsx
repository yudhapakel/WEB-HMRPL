import React from 'react';
import './Kalender.css';

const Kalender = () => {
  const googleCalendarUrl = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FJakarta&showPrint=0&src=bmEwODc5ODQzQGdtYWlsLmNvbQ&src=ZGUuaW5kb25lc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4uZ2VybWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039be5&color=%230b8043&color=%230b8043";

  return (
    <section className="kalender-section">
      <div className="container">
        <h2 className="kalender-title">Kalender HMRPL</h2>
        <p className="kalender-subtitle">
          Jadwal lengkap kegiatan dan agenda resmi Himpunan Mahasiswa Rekayasa Perangkat Lunak.
        </p>

        <div className="kalender-container mt-5">
          <iframe
            src={googleCalendarUrl}
            className="google-calendar-iframe"
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            title="Kalender HMRPL"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Kalender;