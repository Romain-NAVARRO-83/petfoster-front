import { Button } from 'react-bulma-components';

function Footer() {
  return (
    <footer className="footer">
      <div className="content columns is-vcentered is-mobile">
        
        <div className="column is-half-desktop has-text-centered">
          <figure className="image is-64x64 is-inline-block">
            <img src="/img/vector/petfoster-logo-grad.svg" alt="Logo" width="75" />
          </figure>
          <p className="mt-3">
            Cette phrase vous va comme un slogan
          </p>
          
        </div>

        <div className="column is-half-desktop has-text-centered">
          <ul>
            <li><a href="/information">À propos</a></li>
            <li><a href="/contact">Nous contacter</a></li>
            <li><a href="/politique-de-confidentialite">Politique de confidentialité</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default Footer;