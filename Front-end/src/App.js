import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Rescue from './pages/Rescue';
import Adopt from './pages/Adopt';
import Transfer from './pages/Transfer';
import PrivateRoute from './components/PrivateRoute';
import Sitting from './pages/Sitting';
import Forum from './pages/Forum';
import User from './pages/User';
import Admin from './comp-admin/AdminDash';
import AdminUsers from './comp-admin/AdminUsers';
import AdminServices from './comp-admin/AdminServices';
import Feedback from './comp-admin/Feedbacks';
import AdminAdopt from './comp-admin/AdminAdopt';
import AdminRescue from './comp-admin/AdminRescue';
import AdminTransfer from './comp-admin/AdminTransfer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/services/rescue" element={<Rescue />} />
          <Route path="/services/adopt" element={<Adopt />} />
          <Route path="/services/transfer" element={<Transfer />} />
          <Route path="/services/sitting" element={<Sitting />} />
          <Route path="/services/forum" element={<Forum />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/feedback" element={<Feedback />} />
        <Route path="/admin/services/adopt" element={<AdminAdopt />} />
        <Route path="/admin/services/rescue" element={<AdminRescue/>} />
        <Route path="/admin/services/transfer" element={<AdminTransfer/>} />
      </Routes>
    </Router>
  );
};

export default App;
