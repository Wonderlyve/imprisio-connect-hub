
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { AuthProvider } from "@/contexts/AuthContext";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterPrinter from "./pages/auth/RegisterPrinter";
import NotFound from "./pages/NotFound";
import Imprimeurs from "./pages/Imprimeurs";
import ImprimeurDetail from "./pages/ImprimeurDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderForm from "./pages/OrderForm";
import Dashboard from "./pages/dashboard/Dashboard";
import PrinterDashboard from "./pages/dashboard/PrinterDashboard";
import TermsOfService from "./pages/TermsOfService";
import RequestQuote from "./pages/RequestQuote";

// Account pages
import AccountLayout from "./pages/account/AccountLayout";
import Profile from "./pages/account/Profile";
import Orders from "./pages/account/Orders";
import Addresses from "./pages/account/Addresses";
import Language from "./pages/account/Language";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="register-printer" element={<RegisterPrinter />} />
                <Route path="imprimeurs" element={<Imprimeurs />} />
                <Route path="imprimeurs/:id" element={<ImprimeurDetail />} />
                <Route path="imprimeurs/:id/order" element={<OrderForm />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:category" element={<Services />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="printer-dashboard" element={<PrinterDashboard />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="request-quote" element={<RequestQuote />} />
                
                {/* Account routes */}
                <Route path="account" element={<AccountLayout />}>
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="addresses" element={<Addresses />} />
                  <Route path="language" element={<Language />} />
                  <Route index element={<Profile />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
