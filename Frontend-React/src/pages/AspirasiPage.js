import React from 'react';
import AspirasiForm from '../components/Aspirasi/AspirasiForm';
import './AspirasiPage.css';

const AspirasiPage = () => {
  return (
    <div className="aspirasi-page-container">
      <div className="aspirasi-header text-center">
        <h1 className="aspirasi-title">SE-Aspirasi</h1>
        <p className="aspirasi-subtitle">
          Ayo sampaikan aspirasi kamu !!! Aspirasi kamu membantu kami berkembang lebih baik!
        </p>
      </div>
      <AspirasiForm />
    </div>
  );
};

export default AspirasiPage;