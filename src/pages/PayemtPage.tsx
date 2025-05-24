import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    if (selectedMethod) {
      setPaymentSuccess(true);
    } else {
      alert("Please select a payment method.");
    }
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const paymentOptions = [
    { name: 'Visa', sub: 'Mastercard • 9390', price: '$150', icon: '💳' },
    { name: 'Google Pay', icon: '🌐' },
    { name: 'PayPal', icon: '🅿️' },
    { name: 'Mastercard', icon: '💳' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-6 relative">
        <h2 className="text-xl font-bold text-gray-900">Confirm and pay</h2>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Saved Cards</p>
            <p className="text-sm text-gray-500">List of all credit cards you saved</p>
          </div>
          <button className="text-sm font-medium border border-blue-500 text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-100">
            Add card
          </button>
        </div>

        <div className="space-y-4">
          {paymentOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => setSelectedMethod(option.name)}
              className={`flex justify-between items-center border rounded-2xl p-3 cursor-pointer ${
                selectedMethod === option.name ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <p className="font-semibold">{option.name}</p>
                  {option.sub && <p className="text-sm text-gray-500">{option.sub}</p>}
                </div>
              </div>
              {option.price && <span className="font-semibold">{option.price}</span>}
              {!option.price && (
                <input
                  type="radio"
                  checked={selectedMethod === option.name}
                  onChange={() => setSelectedMethod(option.name)}
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Pay Now
        </button>

        {/* Payment Success Modal */}
        {paymentSuccess && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center rounded-3xl z-10">
            <CheckCircle className="text-blue-600 w-16 h-16 mb-4" />
            <p className="text-lg font-semibold">Your Payment Is Successful</p>
            <button
              onClick={handleBackHome}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
            >
              Back to home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
