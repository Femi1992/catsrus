import React from 'react';
import { useParams } from 'react-router-dom';
import FetchNextDelivery from './fetchNextDelivery';

const NextDeliveryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the ID from the URL

  if (!id) {
    return <div>Error: No user ID provided in the URL.</div>;
  }

  console.log("inside display next component", id)
  return (
    <div className="next-delivery-page">
      <FetchNextDelivery userId={id} />{' '}
    </div>
  );
};

export default NextDeliveryPage;