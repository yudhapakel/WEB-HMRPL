import React from 'react';
import RekrutmenList from '../components/Rekrutmen/RekrutmenList';
import './RekrutmenPage.css';

const RekrutmenPage = () => {
  return (
    <div className="rekrutmen-page-container">
      <div className="rekrutmen-header text-center">
        <h1 className="rekrutmen-title">SE-Rekrutmen</h1>
        <p className="rekrutmen-subtitle">
          Informasi Rekrutasi Kepanitiaan
        </p>
      </div>
      <RekrutmenList />
    </div>
  );
};

export default RekrutmenPage;