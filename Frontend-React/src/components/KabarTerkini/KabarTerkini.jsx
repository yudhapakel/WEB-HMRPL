import React from 'react';
import './KabarTerkini.css';

// Impor Swiper dan modulnya
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Impor ikon (Perubahan)
import { FaChevronRight } from 'react-icons/fa'; 

// Impor gambar (asumsi nama file)
import slideImg from '../../assets/Kabar1.png';


const dummyNews = [
  {
    id: 1,
    title: 'Peluncuran Website Himpunan Rekayasa Perangkat Lunak',
    date: '30 September 2025',
    location: 'Bandung',
    text: 'Peluncuran perdana website himpunan mahasiswa rekayasa perangkat lunak telah dilaksanakan pada tanggal 30 September 2025. website himpunan ini diluncurkan langsung oleh ketua himpunan mahasiswa rekayasa perangkat lunak.',
  },
  {
    id: 2,
    title: 'Open Recruitment Pengurus HIMARPL',
    date: '5 Oktober 2025',
    location: 'Online',
    text: 'Pendaftaran terbuka bagi mahasiswa RPL untuk bergabung menjadi bagian dari pengurus himpunan periode 2025/2026.',
  },
  
];

const KabarTerkini = () => (
  <section className="kabar-section">
    <div className="container"> {/* Membungkus agar konsisten */}
      <h2 className="kabar-title">Kabar Terkini</h2>
      <p className="kabar-subtitle">
        Informasi terkini mengenai himpunan mahasiswa rekayasa perangkat lunak
      </p>

      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true} // Swiper akan otomatis membuat class .swiper-button-next/prev
        className="kabar-swiper"
      >
        {dummyNews.map((item) => (
          <SwiperSlide key={item.id} className="kabar-slide">
            <div className="kabar-card">
              <div className="kabar-text">
                <h5>{item.title}</h5>
                <p className="kabar-date">{item.date}</p>
                <p className="kabar-description">
                  <strong>{item.location} –</strong> {item.text}
                </p>
                <button className="btn-selengkapnya">
                  Selengkapnya <FaChevronRight size={12} /> {/* Menggunakan Ikon (Perubahan) */}
                </button>
              </div>
              <img src={slideImg} alt="Preview Berita" className="kabar-image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default KabarTerkini;