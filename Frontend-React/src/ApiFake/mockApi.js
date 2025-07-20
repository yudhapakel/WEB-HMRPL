// Di sini kita kumpulkan semua data dummy
import galeri1 from '../assets/Galeri1.JPG';
import galeri2 from '../assets/Galeri2.JPG';
import galeri3 from '../assets/Galeri3.png';

// Data untuk Galeri
const dummyGaleri = [
  { id: 1, src: galeri1, title: 'Kegiatan 1' }, { id: 2, src: galeri2, title: 'Kegiatan 2' },
  { id: 3, src: galeri3, title: 'Kegiatan 3' }, { id: 4, src: galeri1, title: 'Kegiatan 4' },
  { id: 5, src: galeri2, title: 'Kegiatan 5' }, { id: 6, src: galeri3, title: 'Kegiatan 6' },
  { id: 7, src: galeri1, title: 'Kegiatan 7' }, { id: 8, src: galeri2, title: 'Kegiatan 8' },
  { id: 9, src: galeri3, title: 'Kegiatan 9' }, { id: 10, src: galeri1, title: 'Kegiatan 10' },
  { id: 11, src: galeri2, title: 'Kegiatan 11' }, { id: 12, src: galeri3, title: 'Kegiatan 12' },
];

export const getGaleri = (page = 1, limit = 6) => {
  console.log(`Meminta data galeri: halaman ${page}, limit ${limit}`);
  
  return new Promise(resolve => {
    setTimeout(() => {
      const startIndex = (page - 1) * limit;
      const data = dummyGaleri.slice(startIndex, startIndex + limit);
      
      resolve({
        data: data,
        meta: {
          current_page: page,
          last_page: Math.ceil(dummyGaleri.length / limit),
        },
      });
    }, 500);
  });
};