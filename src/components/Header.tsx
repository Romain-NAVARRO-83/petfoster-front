import {  NavLink, Link } from 'react-router-dom';
import { Navbar} from 'react-bulma-components';
import { User } from 'react-flaticons';

import { useState, useEffect } from 'react';

function Header() {

    // State du burger menu
    const [isActive, setIsActive] = useState(false);
  
    // Fonction de bascule du burger menu
    const handleBurgerClick = () => {
      setIsActive(!isActive);
    };

    // State du scroll de la page
    const [scrolled, setScrolled] = useState(false);

    // Bascule de la classe du header (pour le fond blanc)
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 5) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
      // On écoute le scroll de la page
      window.addEventListener('scroll', handleScroll);
  
      // On retire l'eventListener si le composant est démonté
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  

    return (
        <header  className={scrolled ? 'header scrolled' : 'header'}>
        <Navbar>
        <Navbar.Brand>
          {/* <Navbar.Item href="/"> */}
            <Link to="/"><img src="/img/vector/petfoster-logo-grad.svg" alt="Logo" width={75}/>
            <img src="/img/vector/petfoster-title-grad.svg" alt="Pet Foster" width={200}/>
            </Link>
          {/* </Navbar.Item> */}
          <Navbar.Burger
            className={isActive ? 'is-active' : ''}
            onClick={handleBurgerClick}
          />
        </Navbar.Brand>
        

        <Navbar.Menu className={isActive ? 'is-active' : ''}>
          <Navbar.Container align="right">
            {/* <Navbar.Item href="/trouver-animal" renderAs='NavLink'>Voir les animaux</Navbar.Item> */}
            <NavLink to="/trouver-animal" className="navbar-item">
              Voir les animaux
            </NavLink>
            <NavLink to="/mes-demandes" className="navbar-item">
              Mes demandes
            </NavLink>
            <NavLink to="/mes-animaux" className="navbar-item">
              Mes animaux
            </NavLink>
            {/* <Navbar.Item href="/mes-demandes">Mes demandes</Navbar.Item> */}
            {/* <Navbar.Item href="/mes-animaux">Mes animaux</Navbar.Item> */}

            <Navbar.Item href="/connexion">< User size={24} /></Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>

    </Navbar>
    </header>
    )
  }
  
  export default Header
  