import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import Placement from './pages/Placement';
import Developers from './pages/Developers';
import OfficeBearers from './pages/OfficeBearers';
import Notices from './pages/Notices';
import UpcomingEvents from './pages/UpcomingEvents';
import About from './pages/About';
import Syllabus from './pages/Syllabus';
import SplashScreen from './components/SplashScreen';
import Faculty from './pages/Faculty';
import PastEvents from './pages/PastEvents';
import Messages from './pages/Messages';
import Committees from './pages/Committees';
import { ThemeProvider } from '@mui/material/styles';
import CourseDetails from './pages/CourseDetails';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if splash has been shown before in this session
    const splashShown = sessionStorage.getItem('splashShown');
    
    if (!splashShown) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', 'true');
      }, 1850);

      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/office-bearers" element={<OfficeBearers />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses/syllabus" element={<Syllabus />} />
        <Route path="/alumni" element={<Placement />} />
        <Route path="/committees" element={<Committees />} />
        <Route path="/Economic-Society" element={<Placement />} />
        <Route path="/Past-Events" element={<PastEvents />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/msgs" element={<Messages />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/courses/course-details" element={<CourseDetails />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      
      {showSplash && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
          <SplashScreen onFinish={() => setShowSplash(false)} />
        </div>
      )}
    </>
  );
};

export default App;
