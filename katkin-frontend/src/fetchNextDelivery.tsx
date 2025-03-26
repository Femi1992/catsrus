import React, { useState, useEffect } from 'react';
import axios from 'axios';
import catImage from './assets/images/katkin.jpeg';

interface NextDeliveryResponse {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}

const FetchNextDelivery: React.FC<{ userId: string }> = ({ userId }) => {
  const [deliveryInfo, setDeliveryInfo] = useState<NextDeliveryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNextDelivery = async () => {
      try {
        const response = await axios.get<NextDeliveryResponse>(
          `http://localhost:8000/comms/your-next-delivery/${userId}`
        );
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
        <div className="cat-image">
          <img
            src={catImage} // Replace with your desired cat image URL
            alt=""
          />
        </div>
        <div className="delivery-content">
            {deliveryInfo.freeGift && (
              <div className="free-gift-banner">FREE GIFT</div>
            )}
          </div>
          <div className="delivery-details">
            <h1 className='delivery-details-tile'>{deliveryInfo.title}</h1>
            <p>{deliveryInfo.message}</p>
            <p><strong>Total price: £{deliveryInfo.totalPrice.toFixed(2)}</strong></p>
            <div className="buttons">
              <button className="see-details">SEE DETAILS</button>
              <button className="edit-delivery">EDIT DELIVERY</button>
            </div>
          </div>
      </div>
  );
};

export default FetchNextDelivery;