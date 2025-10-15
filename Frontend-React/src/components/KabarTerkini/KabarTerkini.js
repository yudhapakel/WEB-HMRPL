import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
        const response = await axiosInstance.get('/api/berita/terbaru'); 
        setLatestNews(response.data);
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
          modules={[Pagination, Autoplay]} 
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }} 
          loop={true}
          className="kabar-swiper"
        >
          {latestNews.map((item) => (
            <SwiperSlide key={item.id} className="kabar-slide">
              <div className="kabar-card">
                <div className="kabar-text">
                  <h5>{item.title}</h5>
                  <p className="kabar-date">{item.date}</p>
                  <p className="kabar-description">
                    {item.excerpt} 
                  </p>
                  
                  <Link to={`/berita/${item.slug}`} className="btn-selengkapnya">
                    Selengkapnya <FaChevronRight size={12} />
                  </Link>

                </div>
                <img src={`${process.env.REACT_APP_API_URL}/storage/${item.image_path}`} alt={item.title} className="kabar-image" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default KabarTerkini;

