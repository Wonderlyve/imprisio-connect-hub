import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterPrinter from './pages/auth/RegisterPrinter';
import ServicesPage from './pages/Services';
import CategoryServices from './pages/CategoryServices';
import Contact from './pages/Contact';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Dashboard from './pages/dashboard/Dashboard';
import PrinterDashboard from './pages/dashboard/PrinterDashboard';
import Account from './pages/account/Account';
import Addresses from './pages/account/Addresses';
import Orders from './pages/account/Orders';
import { AuthProvider } from "@/contexts/AuthContext";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-printer" element={<RegisterPrinter />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/category/:categoryId" element={<CategoryServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/printer-dashboard" element={<PrinterDashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/addresses" element={<Addresses />} />
          <Route path="/account/orders" element={<Orders />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
