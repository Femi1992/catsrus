import React from 'react';
import { useParams } from 'react-router-dom';
import NextDelivery from './userNextDelivery';

const NextDeliveryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the ID from the URL

  if (!id) {
    return <div>Error: No user ID provided in the URL.</div>;
  }

  return (
    <div className="next-delivery-page">
      <h1>Next Delivery Details</h1>
      <NextDelivery userId={id} /> {/* Pass the ID to the NextDelivery component */}
    </div>
  );
};

export default NextDeliveryPage;