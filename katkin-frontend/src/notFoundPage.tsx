import React from 'react';
import './notFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-header">404</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFoundPage;