import React from 'react';

// Kita akan membuat komponen-komponen ini di langkah berikutnya
import TentangHeader from '../components/Tentang/TentangHeader';
import TentangHimpunan from '../components/Tentang/TentangHimpunan';
import TentangKabinet from '../components/Tentang/TentangKabinet';
import VisiMisi from '../components/Tentang/VisiMisi';
import StrukturOrganisasi from '../components/Tentang/StrukturOrganisasi';
import DaftarAnggota from '../components/Tentang/DaftarAnggota';

const TentangPage = () => {
  return (
    <>
      <TentangHeader />
      <TentangHimpunan />
      <TentangKabinet />
       <VisiMisi />
       <StrukturOrganisasi/>
       <DaftarAnggota/>
    </>
  );
};

export default TentangPage;