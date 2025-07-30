import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { FaChevronRight } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance'; 
import './KabarTerkini.css';
import 'swiper/css';
import 'swiper/css/pagination';

const KabarTerkini = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      setLoading(true);
      try {
    
        // perlu minta endpoint dari backend yang mengembalikan beberapa berita terbaru
        

        // simulasai api call nya
        setTimeout(() => {
          const dummyData = [
            { id: 1, title: 'Peluncuran Website Himpunan', date: '30 September 2025', location: 'Bandung', text: 'Peluncuran perdana website himpunan mahasiswa rekayasa perangkat lunak...', imageUrl: 'https://via.placeholder.com/600x400' },
            { id: 2, title: 'Open Recruitment Pengurus HIMARPL', date: '5 Oktober 2025', location: 'Online', text: 'Pendaftaran terbuka bagi mahasiswa RPL untuk bergabung menjadi bagian dari pengurus...', imageUrl: 'https://via.placeholder.com/600x400' },
          ];
          setLatestNews(dummyData);
          setLoading(false);
        }, 1000);
       

      } catch (error) {
        console.error("Gagal mengambil berita terbaru:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) {
    return (
      <section className="kabar-section">
        <div className="container text-center"><p>Memuat Kabar Terkini...</p></div>
      </section>
    );
  }

  return (
    <section className="kabar-section">
      <div className="container">
        <h2 className="kabar-title">Kabar Terkini</h2>
        <p className="kabar-subtitle">
          Informasi terkini mengenai himpunan mahasiswa rekayasa perangkat lunak
        </p>

        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="kabar-swiper"
        >
          {latestNews.map((item) => (
            <SwiperSlide key={item.id} className="kabar-slide">
              <div className="kabar-card">
                <div className="kabar-text">
                  <h5>{item.title}</h5>
                  <p className="kabar-date">{item.date}</p>
                  <p className="kabar-description">
                    <strong>{item.location} –</strong> {item.text}
                  </p>
                  <button className="btn-selengkapnya">
                    Selengkapnya <FaChevronRight size={12} />
                  </button>
                </div>
                <img src={item.imageUrl} alt={item.title} className="kabar-image" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default KabarTerkini;