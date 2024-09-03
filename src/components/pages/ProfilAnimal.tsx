const AnimalProfile = () => {

  return (

    <section className="section">

      <div className="container">

        {/* Image principale */}
        <div className="box has-text-centered">

          <figure className="image is-4by3">
            <img src="https://via.placeholder.com/800x600" alt="Photo principale de l'animal" />
          </figure>

        </div>

        {/* Carrousel d'images */}
        <div className="columns is-centered">

          <div className="column is-narrow">

            <button className="button is-white">

                <span className="icon is-large">
                <i className="fas fa-chevron-left"></i>
                </span>

            </button>

          </div>

          <div className="column is-narrow">

            <figure className="image is-64x64">
              <img src="https://via.placeholder.com/100x100" alt="Photo 1" />
            </figure>

          </div>

          <div className="column is-narrow">

            <figure className="image is-64x64">
              <img src="https://via.placeholder.com/100x100" alt="Photo 2" />
            </figure>

          </div>

          <div className="column is-narrow">

            <figure className="image is-64x64">
              <img src="https://via.placeholder.com/100x100" alt="Photo 3" />
            </figure>

          </div>

          <div className="column is-narrow">

            <button className="button is-white">
              <span className="icon is-large">
                <i className="fas fa-chevron-right"></i>
              </span>
            </button>

          </div>

        </div>

        {/* Informations sur l'animal */}
        <div className="columns has-text-centered">

          <div className="column">
            <p><strong>Espèce</strong></p>
          </div>

          <div className="column">
            <p><strong>Race</strong></p>
          </div>

          <div className="column">
            <p><strong>Sexe</strong></p>
          </div>

          <div className="column">
            <p><strong>Date de naissance</strong></p>
          </div>

          <div className="column">
            <p><strong>Localisation</strong></p>
          </div>

        </div>

        {/* Description courte */}
        <div className="content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        {/* Description longue */}
        <div className="box">

          <h3 className="title is-5">Description longue de l'animal</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
        </div>

        {/* Section santé */}
        <div className="box">

          <h3 className="title is-5">SANTÉ</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi recusandae, velit exercitationem corrupti expedita laudantium adipisci ea, reprehenderit cupiditate nam aperiam maiores tempore qui ducimus rerum molestiae id laboriosam eum.</p>
        
        </div>

        {/* Carte de localisation */}
        <div className="box has-text-centered">

          <figure className="image is-4by3">
            <img src="https://via.placeholder.com/600x400" alt="Carte de localisation" />
          </figure>

          <p>Adresse du lieu où se trouve le chat - Distance par rapport à l'utilisateur connecté</p>
        
        </div>

        {/* Boutons d'action */}
        <div className="buttons is-centered">

          <button className="button is-success is-rounded">Contacter association</button>
          <button className="button is-link is-rounded">Faire une demande d'adoption</button>
        
        </div>

      </div>

    </section>

  );
  
};

export default AnimalProfile;
