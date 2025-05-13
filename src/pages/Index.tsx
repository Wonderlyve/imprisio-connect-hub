
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to home page if accessed directly
  useEffect(() => {
    if (window.location.pathname === '/index') {
      navigate('/');
    }
  }, [navigate]);

  return <Home />;
};

export default Index;
