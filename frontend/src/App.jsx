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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide splash screen after 3 seconds
    }, 1850);

    return () => clearTimeout(timer);
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
        <Route path = "/faculty" element={<Faculty />}></Route>
        <Route path="/msgs" element={<Messages />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/courses/course-details" element={<CourseDetails />} />
      </Route>
    )
  );

  return (
    <>
      {/* Render the main layout but hide it during splash screen */}
      <div style={{ visibility: loading ? 'hidden' : 'visible', opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}>
        <RouterProvider router={router} />
      </div>

      {/* Render the splash screen on top of everything */}
      {loading && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
          <SplashScreen />
        </div>
      )}
    </>
  );
};

export default App;