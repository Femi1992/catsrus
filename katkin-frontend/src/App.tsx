import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NextDeliveryPage from './displayNextDelivery';
import NotFoundPage from './notFoundPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/comms/your-next-delivery/:id" element={<NextDeliveryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;