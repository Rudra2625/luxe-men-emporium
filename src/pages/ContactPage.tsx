
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '../hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-luxe-navy text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Contact Us</h1>
            <p className="max-w-xl mx-auto text-gray-300">
              Have questions or need assistance? We're here to help you find the perfect accessory for any occasion.
            </p>
          </div>
        </div>
        
        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="md:col-span-1">
                <h2 className="font-serif text-2xl font-bold mb-6 text-luxe-navy">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-luxe-gold mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">Visit Us</h3>
                      <p className="text-gray-600">
                        123 Luxury Avenue<br />
                        Beverly Hills, CA 90210<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-luxe-gold mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <p className="text-gray-600">
                        General Inquiries:<br />
                        <a href="mailto:info@luxemen.com" className="hover:text-luxe-gold transition-colors">info@luxemen.com</a><br /><br />
                        Customer Support:<br />
                        <a href="mailto:support@luxemen.com" className="hover:text-luxe-gold transition-colors">support@luxemen.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-luxe-gold mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <p className="text-gray-600">
                        Toll-Free: +1 (800) 123-4567<br />
                        International: +1 (555) 987-6543
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-semibold mb-3">Business Hours</h3>
                  <table className="w-full text-gray-600">
                    <tbody>
                      <tr>
                        <td className="py-2">Monday - Friday</td>
                        <td className="py-2">9:00 AM - 6:00 PM</td>
                      </tr>
                      <tr>
                        <td className="py-2">Saturday</td>
                        <td className="py-2">10:00 AM - 5:00 PM</td>
                      </tr>
                      <tr>
                        <td className="py-2">Sunday</td>
                        <td className="py-2">Closed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md">
                <h2 className="font-serif text-2xl font-bold mb-6 text-luxe-navy">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxe-gold focus:border-luxe-gold outline-none transition"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxe-gold focus:border-luxe-gold outline-none transition"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block mb-2 font-medium">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxe-gold focus:border-luxe-gold outline-none transition"
                      required
                    >
                      <option value="">Please select</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Order Status">Order Status</option>
                      <option value="Returns & Exchanges">Returns & Exchanges</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 font-medium">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxe-gold focus:border-luxe-gold outline-none transition"
                      required
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-luxe-navy text-white hover:bg-luxe-navy/90 px-8 py-6"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold mb-6 text-luxe-navy">Our Location</h2>
            <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* You would integrate a real map here, but for this example we'll use a placeholder */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <p className="text-gray-600">Interactive Map Would Be Displayed Here</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
