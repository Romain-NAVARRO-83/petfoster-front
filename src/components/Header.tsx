import { NavLink, Link } from 'react-router-dom';
import { Navbar } from 'react-bulma-components';
import { User } from 'react-flaticons';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';

function Header() {
  // State du menu burger
  const [isActive, setIsActive] = useState(false);

  // Toggle burger menu
  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };

  // State pour le scroll
  const [scrolled, setScrolled] = useState(false);

  // Handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Supprimer le listener à l'unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Contrôle du login
  const { user, logout } = useAuth();

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <Navbar>
        <Navbar.Brand>
          <Link to="/">
            <img src="/img/vector/petfoster-logo-grad.svg" alt="Logo" width={75} />
            <img src="/img/vector/petfoster-title-grad.svg" alt="Pet Foster" width={200} />
          </Link>
          <Navbar.Burger
            className={isActive ? 'is-active' : ''}
            onClick={handleBurgerClick}
            aria-label="menu"
            aria-expanded={isActive ? 'true' : 'false'}
            data-target="navbarMenu"
          />
        </Navbar.Brand>

        <Navbar.Menu id="navbarMenu" className={isActive ? 'is-active' : ''}>
          <Navbar.Container align="right">
            <NavLink to="/trouver-animal" className="navbar-item">
              Voir les animaux
            </NavLink>

            {/* Menu items pour les users connectés */}
            {user && (
            <>
              <NavLink to="/mes-demandes" className="navbar-item">
              Mes demandes
            </NavLink>
            <NavLink to="/mes-animaux" className="navbar-item">
              Mes animaux
            </NavLink>
            </>
            )}
            <Navbar.Item href="/connexion">
              <User size={24} />
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    </header>
  );
}

export default Header;
