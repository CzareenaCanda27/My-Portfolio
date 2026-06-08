import React from 'react';
import { Route, Routes } from 'react-router-dom';

// CORE ROUTE PAGES (All sitting directly next to MainRouter inside /src)
import Home from './Home';
import About from './about';          
import Contact from './contact';      
import Education from './education';  
import Project from './project';      
import Services from './services';    

// THE LAYOUT COMPONENT
// Moves up one folder to escape 'src', then goes straight into 'components'
import Layout from '../components/Layout';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="education" element={<Education />} />
        <Route path="project" element={<Project />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;