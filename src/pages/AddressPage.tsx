import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AddressForm from '../context/AddressForm'; // Adjust path if needed

const AddressPage: React.FC = () => {
  const handleAddressSubmit = (data: any) => {
    console.log('Address submitted:', data);
    // Here you can navigate to a payment page or show confirmation
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
        <AddressForm onSubmit={handleAddressSubmit} />
      </main>
      <Footer />
    </div>
  );
};

export default AddressPage;
