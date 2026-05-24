import React from 'react';
import './Kalender.css';

const Kalender = () => {
  const googleCalendarUrl = "https://calendar.google.com/calendar/embed?src=akreshmrpl%40gmail.com&ctz=Asia%2FJakarta";

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