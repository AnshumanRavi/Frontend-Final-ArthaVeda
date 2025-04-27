import React, { useState } from 'react';
import CollegeNavbar from '../components/CollegeNavbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Copyright from '../components/Copyright';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({ loading }) => {
  const [navbarHeight, setNavbarHeight] = useState(76); // Default height

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CollegeNavbar onHeightChange={setNavbarHeight} />
      <main style={{ paddingTop: `${navbarHeight}px`, flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <Copyright />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;