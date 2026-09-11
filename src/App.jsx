import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Consultation from './pages/Consultation/Consultation';
import Appointment from './pages/Appointment/Appointment';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Appointments from './pages/Admin/Appointments/Appointments';
import Schedule from './pages/Admin/Schedule/Schedule';
import Settings from './pages/Admin/Settings/Settings';
import './styles/global.css';
import './styles/variables.css';
import './styles/responsive.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/consultation' element={<Consultation />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/admin/appointments' element={<Appointments />} />
        <Route path='/admin/schedule' element={<Schedule />} />
        <Route path='/admin/settings' element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
