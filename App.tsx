import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Progress from './pages/Progress';
import Lotes from './pages/Parcels';
import Contact from './pages/Contact';
import WhyGaia from './pages/WhyGaia';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { LotProvider } from './context/LotContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <LotProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="why-gaia" element={<WhyGaia />} />
            <Route path="progress" element={<Progress />} />
            <Route path="lotes" element={<Lotes />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          {/* Admin routes outside main Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </HashRouter>
    </LotProvider>
  );
};

export default App;