import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Consultation from './pages/Consultation/Consultation';
import Appointment from './pages/Appointment/Appointment';
import Contact from './pages/Contact/Contact';

// Admin
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Admin/Login/Login';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Appointments from './pages/Admin/Appointments/Appointments';
import Schedule from './pages/Admin/Schedule/Schedule';
import Settings from './pages/Admin/Settings/Settings';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './styles/global.css';
import './styles/variables.css';
import './styles/responsive.css';

function MainLayout() {
  return (
    <div className="main-layout-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/consultation' element={<Consultation />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        
        {/* Admin Public Route */}
        <Route path='/admin/login' element={<Login />} />

        {/* Admin Protected Routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='appointments' element={<Appointments />} />
          <Route path='schedule' element={<Schedule />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
