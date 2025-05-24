import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AddressFormProps {
  onSubmit: (data: AddressData) => void;
}


interface AddressData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const cityStatePincodeMap: Record<string, Record<string, string>> = {
  Gujarat: {
    Ahmedabad: '380001',
    Surat: '395003',
    Vadodara: '390001',
    Rajkot: '360001',
  },
  Maharashtra: {
    Mumbai: '400001',
    Pune: '411001',
    Nagpur: '440001',
    Nashik: '422001',
  },
  Delhi: {
    'New Delhi': '110001',
    'South Delhi': '110017',
    'North Delhi': '110054',
  },
  Karnataka: {
    Bengaluru: '560001',
    Mysuru: '570001',
    Mangaluru: '575001',
  },
  TamilNadu: {
    Chennai: '600001',
    Coimbatore: '641001',
    Madurai: '625001',
  },
};

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState<AddressData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'city' || name === 'state') {
        const selectedCity = name === 'city' ? value : prev.city;
        const selectedState = name === 'state' ? value : prev.state;
        updated.pincode = cityStatePincodeMap[selectedState]?.[selectedCity] || '';
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(formData).some(value => !value.trim())) {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit(formData);
    navigate('/payment'); // Navigate to payment page after submission

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-6 font-[Inter]"
    >
      <h2 className="text-3xl font-bold text-gray-900 border-b pb-3">Shipping Address</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full Address"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Select State</option>
            {Object.keys(cityStatePincodeMap).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.state}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Select City</option>
            {formData.state &&
              Object.keys(cityStatePincodeMap[formData.state] || {}).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
          </select>
        </div>

        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          readOnly
          placeholder="Pincode"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
        />

        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-xl hover:bg-yellow-600 transition-all duration-300"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default AddressForm;
