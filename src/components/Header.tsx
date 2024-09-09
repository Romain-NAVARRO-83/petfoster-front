import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext'; // Import du contexte
import { User } from 'react-flaticons'; 

function Header() {
  // State pour le menu burger
  const [isActive, setIsActive] = useState(false);

  // Toggle du menu burger
  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };

  // State pour la détection du scroll
  const [scrolled, setScrolled] = useState(false);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Contrôle de l'authentification via le contexte
  const { user, logout } = useAuth();

  return (

      <>
        {/* Lien "Jump to content" */}
        <a href="#main-content" className="button is-primary is-sr-only focusable">Aller au contenu</a>
    
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/img/vector/petfoster-logo-grad.svg" alt="Logo" width={75} />
            <img src="/img/vector/petfoster-title-grad.svg" alt="Pet Foster" width={200} />
          </Link>
          <button
            className={`navbar-burger ${isActive ? 'is-active' : ''}`}
            onClick={handleBurgerClick}
            aria-label="menu"
            aria-expanded={isActive ? 'true' : 'false'}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`} id="navbarMenu">
          <div className="navbar-end">
            <NavLink to="/trouver-animal" className="navbar-item">
              Voir les animaux
            </NavLink>

            {/* Si l'utilisateur est connecté, afficher des options supplémentaires */}
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

            {/* Affiche l'icône de l'utilisateur et le lien vers le profil, ou le lien vers la page de connexion */}
            <div className="navbar-item">
              {user ? (
                <>
                  <Link to={`/profil/${user.userId}`} className='has-text-centered'>
                    <User size={24} /><br/>
                    {user.userName}
                  </Link>
                  <button onClick={logout} className="navbar-item">Déconnexion</button>
                </>
              ) : (
                <Link to="/connexion">
                  <User size={24} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}

export default Header;
