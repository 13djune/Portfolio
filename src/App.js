import React from 'react';
import Header from './components/layout/Header';
import ThemeToggle from './components/layout/ThemeToggle';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import CustomCursor from './components/ui/CustomCursor';

export default function App() {
  return (
    <div className="min-h-screen transition-colors duration-500">
        <CustomCursor /> 
      <Header />
      <ThemeToggle />
      <main className="pt-20">
        <Home />
        <About id="about" />
        <Projects id="projects" />
        <Contact id="contact" />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}