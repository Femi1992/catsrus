import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NextDeliveryResponse {
  title: string;
  message: string;
}

const FetchNextDelivery: React.FC<{ userId: string }> = ({ userId }) => {
  const [deliveryInfo, setDeliveryInfo] = useState<NextDeliveryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNextDelivery = async () => {
      try {
        console.log("inside fetch next delivery", userId)
        const response = await axios.get<NextDeliveryResponse>(
          `http://localhost:8000/comms/your-next-delivery/${userId}`
        );
        console.log("response", response)
        setDeliveryInfo(response.data);
      } catch (err) {
        console.error('Error fetching delivery information:', err);
        setError('Failed to fetch delivery information.');
      }
    };

    fetchNextDelivery();
  }, [userId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!deliveryInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="next-delivery">
      <h1>{deliveryInfo.title}</h1>
      <p>{deliveryInfo.message}</p>
    </div>
  );
};

export default FetchNextDelivery;