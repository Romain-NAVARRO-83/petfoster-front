import { NavLink, Link } from 'react-router-dom';
import { Navbar } from 'react-bulma-components';
import { User } from 'react-flaticons';
import { useState, useEffect } from 'react';

function Header() {
  // State for burger menu
  const [isActive, setIsActive] = useState(false);

  // Toggle burger menu
  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };

  // State for scrolling behavior
  const [scrolled, setScrolled] = useState(false);

  // Handle scrolling for header background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup scroll event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            <NavLink to="/mes-demandes" className="navbar-item">
              Mes demandes
            </NavLink>
            <NavLink to="/mes-animaux" className="navbar-item">
              Mes animaux
            </NavLink>
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
