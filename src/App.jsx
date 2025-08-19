import React, { useState, useMemo, useCallback, useEffect } from 'react';
import './App.css';
// foto de perfil
import foto_perfil from './assets/mama.jpg'

// Pinturas
import determination_tembo from './assets/determination_tembo.jpg';
import la_dame_doree from './assets/La_Dame_Doree.jpg';
import je_suis_la from './assets/je_suis_la.jpg';
import indomitus_equus from './assets/indomitus_equus.jpg';
import lynx from './assets/lynx.jpg';
import lumiere_de_lune from './assets/lumiere_de_lune.jpg';
import loup from './assets/loup.jpg';
import bronca from './assets/bronca.jpg';
import mapuche from './assets/mapuche.jpg';
import guerre_prix from './assets/guerre_prix.jpg';
import you from './assets/you.jpg';

// Optimized Painting Card Component
const PaintingCard = React.memo(({ painting, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(painting);
  }, [painting, onClick]);

  return (
    <div className="painting-card" onClick={handleClick}>
      <img 
        src={painting.image} 
        alt={painting.title}
        loading="lazy"
        decoding="async"
        style={{ objectFit: 'cover' }}
      />
      <div className="painting-info">
        <h3>{painting.title}</h3>
        <p>{painting.year}</p>
      </div>
    </div>
  );
});

// Optimized Full Gallery Card Component
const FullGalleryCard = React.memo(({ painting, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(painting);
  }, [painting, onClick]);

  return (
    <div className="full-gallery-card" onClick={handleClick}>
      <img 
        src={painting.image} 
        alt={painting.title}
        loading="lazy"
        decoding="async"
        style={{ objectFit: 'cover' }}
      />
      <div className="full-gallery-info">
        <h3>{painting.title}</h3>
        <p className="year">{painting.year}</p>
        <p className="technique">{painting.technique}</p>
      </div>
    </div>
  );
});

// Header Component
const Header = React.memo(({ currentView, setCurrentView }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback((sectionId) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  }, [currentView, setCurrentView]);

  const goToGallery = useCallback(() => {
    setCurrentView('fullGallery');
    setActiveSection('gallery');
    setMobileMenuOpen(false);
    // Scroll to top when going to gallery
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [setCurrentView]);

  const goHome = useCallback(() => {
    setCurrentView('home');
    setActiveSection('home');
    setMobileMenuOpen(false);
    // Scroll to top when going home
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [setCurrentView]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo" onClick={goHome} style={{ cursor: 'pointer' }}>
          <h2>Johana Dupin</h2>
        </div>
        
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <button 
              onClick={goToGallery}
              className={activeSection === 'gallery' ? 'active' : ''}
            >
              Galerie
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('exhibitions')}
              className={activeSection === 'exhibitions' ? 'active' : ''}
            >
              Exposition
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('contact')}
              className={activeSection === 'contact' ? 'active' : ''}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
});

// Hero Section Component
const HeroSection = React.memo(() => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Johana Dupin</h1>
          <p className="subtitle">Artiste Peintre à l'Huile</p>
          <p className="description">
            Passionnée par la beauté des formes et des couleurs, je crée des œuvres qui capturent 
            l'essence de la vie à travers la technique traditionnelle de la peinture à l'huile. 
            Chaque toile raconte une histoire, chaque coup de pinceau exprime une émotion.
          </p>
        </div>
        <div className="hero-image">
          <img 
            src={foto_perfil}
            alt="Johana Dupin"
            className="profile-image"
            loading="eager"
            decoding="sync"
          />
        </div>
      </div>
    </section>
  );
});

// Exhibitions Section Component
const ExhibitionsSection = React.memo(() => {
  const exhibitions = useMemo(() => [
    {
      title: "Racines et Horizons",
      date: "20 Aout au 13 Septembre 2025",
      location: "12049 boulevard Laurentien, Montréal",
      description: "Point de rencontre de la peinture, poésie, sculpture, vidéo et musique."
    },
  
  ], []);

  return (
    <section id="exhibitions" className="exhibitions">
      <div className="container">
        <h2>Expositions à Venir</h2>
        <div className="exhibitions-grid">
          {exhibitions.map((exhibition, index) => (
            <div key={index} className="exhibition-card">
              <h3>{exhibition.title}</h3>
              <p className="exhibition-date">{exhibition.date}</p>
              <p className="exhibition-location">{exhibition.location}</p>
              <p className="exhibition-description">{exhibition.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// Gallery Component
const Gallery = React.memo(({ paintings, setSelectedPainting, setCurrentView }) => {
  const goToFullGallery = useCallback(() => {
    setCurrentView('fullGallery');
    // Scroll to top when going to full gallery
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [setCurrentView]);

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 
          onClick={goToFullGallery}
          style={{ cursor: 'pointer' }}
          className="gallery-title-clickable"
        >
          Galerie
        </h2>
        <div className="gallery-carousel">
          {paintings.map((painting) => (
            <PaintingCard
              key={painting.id}
              painting={painting}
              onClick={setSelectedPainting}
            />
          ))}
        </div>
        <div className="view-all-btn-container">
          <button 
            className="view-all-btn"
            onClick={goToFullGallery}
          >
            Voir toutes les œuvres →
          </button>
        </div>
      </div>
    </section>
  );
});

// Full Gallery Page Component
const FullGalleryPage = React.memo(({ paintings, setSelectedPainting, setCurrentView }) => {
  const goBack = useCallback(() => {
    setCurrentView('home');
    // Scroll to top when going back
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [setCurrentView]);

  return (
    <div className="full-gallery-page">
      <div className="full-gallery-header">
        <button 
          className="back-btn"
          onClick={goBack}
        >
           Retour
        </button>
        <h1>Galerie Complète</h1>
        <p>Collection des œuvres de Johana Dupin</p>
      </div>
      
      <div className="container">
        <div className="full-gallery-grid">
          {paintings.map((painting) => (
            <FullGalleryCard
              key={painting.id}
              painting={painting}
              onClick={setSelectedPainting}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

// Painting Modal Component
const PaintingModal = React.memo(({ painting, setSelectedPainting }) => {
  const closeModal = useCallback(() => {
    setSelectedPainting(null);
  }, [setSelectedPainting]);

  const handleBackdropClick = useCallback(() => {
    setSelectedPainting(null);
  }, [setSelectedPainting]);

  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div className="painting-modal" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="close-btn" onClick={closeModal}>×</button>
        <img 
          src={painting.image} 
          alt={painting.title}
          loading="eager"
          decoding="sync"
        />
        <div className="painting-details">
          <h2>{painting.title}</h2>
          <p><strong>Année:</strong> {painting.year}</p>
          <p><strong>Technique:</strong> {painting.technique}</p>
          <p><strong>Dimensions:</strong> {painting.dimensions}</p>
        </div>
      </div>
    </div>
  );
});

// Contact Section Component
const ContactSection = React.memo(() => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Contact</h2>
        <div className="contact-info">
          <div className="contact-line">
            <a href="https://www.facebook.com/johana.dupin.71" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
          <div className="contact-line">
            <a href="https://www.instagram.com/johanadupin" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
          <div className="contact-line">
            <a href="mailto:johana.dupin@gmail.com">johana.dupin@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
});

// Footer Component
const Footer = React.memo(() => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2025 Johana Dupin. Tous droits réservés.</p>
      </div>
    </footer>
  );
});

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPainting, setSelectedPainting] = useState(null);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Memoized paintings data
  const allPaintings = useMemo(() => [
    {
      id: 1,
      title: "La détermination de Tembo",
      image: determination_tembo,
      year: "2024",
      technique: "Huile sur toile",
      dimensions: "60\" x 80\""
    },
    {
      id: 2,
      title: "La Dame Dorée",
      image: la_dame_doree,
      year: "2025",
      technique: "Huile sur toile",
      dimensions: "24\" x 48\""
    },
    {
      id: 3,
      title: "Je suis là",
      image: je_suis_la,
      year: "2023",
      technique: "Huile sur toile",
      dimensions: "24\" x 36\""
    },
    {
      id: 4,
      title: "Indomitus Equus",
      image: indomitus_equus,
      year: "2025",
      technique: "Huile sur toile",
      dimensions: "36\" x 36\""
    },
    {
      id: 5,
      title: "Lynx",
      image: lynx,
      year: "2025",
      technique: "Huile sur toile",
      dimensions: "40 x 50 cm"
    },
    {
      id: 6,
      title: "Sous la lumière de la lune éternelle",
      image: lumiere_de_lune,
      year: "2025",
      technique: "Huile sur toile",
      dimensions: "40 x 50 cm"
    },
    {
      id: 7,
      title: "Le Loup",
      image: loup,
      year: "2025",
      technique: "Huile sur toile",
      dimensions: "40 x 50 cm"
    },
    {
      id: 8,
      title: "La Bronca",
      image: bronca,
      year: "2020",
      technique: "Huile sur toile",
      dimensions: "45.7 x 63.5 cm"
    },
    {
      id: 9,
      title: "Orgullo Mapuche",
      image: mapuche,
      year: "2019",
      technique: "Huile sur toile",
      dimensions: "25\" x 37\""
    },
    {
      id: 10,
      title: " La guerre à tout prix ",
      image: guerre_prix,
      year: "2022",
      technique: "Huile sur toile et feuille en cuivre",
      dimensions: "75 x 60 cm"
    },
    {
      id: 11,
      title: "You",
      image: you,
      year: "2023",
      technique: "Huile sur toile et feuille d'or",
      dimensions: "48\" x 36\""
    }
  ], []);

  // Memoized sorted paintings
  const sortedPaintings = useMemo(() => {
    return [...allPaintings].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }, [allPaintings]);

  // Memoized gallery paintings (first 5)
  const galleryPaintings = useMemo(() => {
    return sortedPaintings.slice(0, 5);
  }, [sortedPaintings]);

  // Memoized callbacks
  const handleSetSelectedPainting = useCallback((painting) => {
    setSelectedPainting(painting);
  }, []);

  const handleSetCurrentView = useCallback((view) => {
    setCurrentView(view);
  }, []);

  if (currentView === 'fullGallery') {
    return (
      <div className="App">
        <Header currentView={currentView} setCurrentView={handleSetCurrentView} />
        <FullGalleryPage 
          paintings={sortedPaintings} 
          setSelectedPainting={handleSetSelectedPainting}
          setCurrentView={handleSetCurrentView}
        />
        {selectedPainting && (
          <PaintingModal 
            painting={selectedPainting} 
            setSelectedPainting={setSelectedPainting} 
          />
        )}
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Header currentView={currentView} setCurrentView={handleSetCurrentView} />
      <HeroSection />
      <ExhibitionsSection />
      <Gallery 
        paintings={galleryPaintings} 
        setSelectedPainting={handleSetSelectedPainting}
        setCurrentView={handleSetCurrentView}
      />
      <ContactSection />
      {selectedPainting && (
        <PaintingModal 
          painting={selectedPainting} 
          setSelectedPainting={setSelectedPainting} 
        />
      )}
      <Footer />
    </div>
  );
};

export default App;