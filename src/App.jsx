import { useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/sections/About.jsx';
import Projects from './components/sections/Projects.jsx';
import Skills from './components/sections/Skills.jsx';
import Experience from './components/sections/Experience.jsx';
import Certifications from './components/sections/Certifications.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/sections/Footer.jsx';
import AuroraBackground from './components/ui/AuroraBackground.jsx';
import CursorGlow from './components/ui/CursorGlow.jsx';
import ScrollProgress from './components/ui/ScrollProgress.jsx';
import ZipIntro from './components/intro/ZipIntro.jsx';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  return (
    <div className="page">
      {!introDone && <ZipIntro onDone={() => setIntroDone(true)} />}
      <ScrollProgress />
      <AuroraBackground />
      <CursorGlow />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header>
        <Nav />
      </header>
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
