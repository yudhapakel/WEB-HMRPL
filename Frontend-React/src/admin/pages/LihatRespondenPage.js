import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';

const LihatRespondenPage = () => {
  const [responden, setResponden] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponden = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/aspirasi');
        setResponden(response.data); 
      } catch (error) {
        console.error("Gagal mengambil data responden:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponden();
  }, []);

  const handleExport = () => {
    const dataToExport = responden.map(item => ({
      Nama: item.isAnonim ? 'Anonim' : item.nama,
      NIM: item.isAnonim ? 'Anonim' : item.nim,
      Kategori: item.kategori,
      Pesan: item.pesan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responden");
    XLSX.writeFile(workbook, `Responden_Aspirasi_${new Date().toLocaleDateString()}.xlsx`);
  };

  if (loading) return <p>Memuat data responden...</p>;

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h1 className="h3 mb-1">Lihat Responden</h1>
      <p className="text-muted mb-4">Melihat hasil responden dari form aspirasi</p>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">NIM</th>
              <th scope="col">Kategori</th>
              <th scope="col" style={{ width: '40%' }}>Pesan</th>
            </tr>
          </thead>
          <tbody>
            {responden.length > 0 ? (
              responden.map(item => (
                <tr key={item.id}>
                  <td>{item.isAnonim ? 'Anonim' : item.nama}</td>
                  <td>{item.isAnonim ? '—' : item.nim}</td>
                  <td>{item.kategori}</td>
                  <td>{item.pesan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">Belum ada data responden.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button onClick={handleExport} className="btn btn-success mt-3" disabled={responden.length === 0}>
        <FaFileExcel className="me-2" />
        Export Excel
      </button>
    </div>
  );
};

export default LihatRespondenPage;