import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NextDeliveryPage from './nextDelivery';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/comms/your-next-delivery/:id" element={<NextDeliveryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
// http://localhost:3000/users/c1307701-fe57-4be6-bdc5-184700d69f4d/next-delivery