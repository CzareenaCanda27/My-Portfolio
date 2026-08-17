import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./about'));
const Services = lazy(() => import('./services'));
const Project = lazy(() => import('./project'));
const Education = lazy(() => import('./education'));
const Contact = lazy(() => import('./contact'));
const Signin = lazy(() => import('./Signin'));
const Signup = lazy(() => import('./Signup'));

function PageLoader() {
    return (
        <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Impact, sans-serif' }}>
            LOADING MODULE...
        </div>
    );
}

export default function MainRouter() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services" element={<Services />} />
                    <Route path="project" element={<Project />} />
                    <Route path="education" element={<Education />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
