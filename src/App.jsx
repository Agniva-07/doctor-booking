import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Consultation from './pages/Consultation/Consultation';
import Appointment from './pages/Appointment/Appointment';
import Contact from './pages/Contact/Contact';
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '80px' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/consultation' element={<Consultation />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        
        {/* Admin Routes without main frontend layout */}
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/admin/appointments' element={<Appointments />} />
        <Route path='/admin/schedule' element={<Schedule />} />
        <Route path='/admin/settings' element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
