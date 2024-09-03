function Footer() {


    return (
        <footer className="footer">

        <div className="content columns">

            <div className="column is-one-third-desktop">

                <figure className="image is-128x128 is-inline-block">
                    <img src="/img/vector/petfoster-logo-grad.svg" alt="Logo" width="75" />
                </figure>

                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, nulla.</p>

            </div>

            <ul className="column">
                <li><a href="/information">A propos</a></li>
                <li><a href="#">Accessibilité</a></li>
                <li><a href="/contact">Nous contacter</a></li>
                <li><a href="/politique-de-confidentialite">Politique de confidentialité</a></li>
            </ul>


        </div>

    </footer>
    )
  }
  
  export default Footer