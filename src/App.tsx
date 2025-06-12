import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AddressPage from "./pages/AddressPage";
import PaymentPage from "./pages/PayemtPage";
<<<<<<< HEAD
import Signup from "./components/auth/signup.tsx";
import Login from "./components/auth/login.tsx";
import { AdminDashboard } from "./components/admin/AdminDashboard.tsx";
=======
import AdminPage from "./pages/AdminPage";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f

// Initialize query client outside component to avoid recreation on re-renders
const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <AuthProvider>
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/" element={<AddressPage />} />
              <Route path="/checkout" element={<AddressPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              {/* Add more routes as needed */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </TooltipProvider>
      </AuthProvider>
=======
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<AddressPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </TooltipProvider>
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
