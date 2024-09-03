// a faire modif mon profil animal

const AnimalProfile = () => {
    return (
      <section className="section">
        <div className="container">
  
          {/* Button */}
          <div className="has-text-centered">
            <button className="button is-warning is-rounded is-large">créer le profil de mon animal</button>
          </div>
  
          {/* Profile Box */}
          <div className="box mt-5">
            <div className="columns is-vcentered">
  
              {/* Image Placeholder */}
              <div className="column is-one-quarter">
                <div className="box has-text-centered" style={{ height: '200px' }}>
                  PHOTOS DE L'ANIMAL
                </div>
              </div>
  
              {/* Animal Information */}
              <div className="column">
                <div className="columns">
                  <div className="column has-text-centered">
                    <p><strong>Espèce</strong></p>
                  </div>
                  <div className="column has-text-centered">
                    <p><strong>Sexe</strong></p>
                  </div>
                  <div className="column has-text-centered">
                    <p><strong>Date de naissance</strong></p>
                  </div>
                  <div className="column has-text-centered">
                    <p><strong>Localisation</strong></p>
                  </div>
                </div>
              </div>
  
            </div>
  
            {/* Descriptions */}
            <div className="content mt-5">
              <h2 className="subtitle is-5 has-text-centered">Description courte de l'animal</h2>
              <div className="box">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi recusandae, velit exercitationem corrupti expedita laudantium adipisci ea, reprehenderit cupiditate nam aperiam maiores tempore qui ducimus rerum molestiae id laboriosam eum.</p>
              </div>
            </div>
  
            <div className="content mt-5">
              <h2 className="subtitle is-5 has-text-centered">Description longue de l'animal</h2>
              <div className="box">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi recusandae, velit exercitationem corrupti expedita laudantium adipisci ea, reprehenderit cupiditate nam aperiam maiores tempore qui ducimus rerum molestiae id laboriosam eum.</p>
              </div>
            </div>
  
            <div className="content mt-5">
              <h2 className="subtitle is-5 has-text-centered">SANTÉ</h2>
              <div className="box">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi recusandae, velit exercitationem corrupti expedita laudantium adipisci ea, reprehenderit cupiditate nam aperiam maiores tempore qui ducimus rerum molestiae id laboriosam eum.</p>
              </div>
            </div>
  
            {/* Localisation Button and Map */}
            <div className="has-text-centered mt-5">
              <button className="button is-light">Localisation</button>
              <div className="box mt-3" style={{ height: '150px' }}>
                <figure className="image is-4by3">
                  <img src="https://via.placeholder.com/400x300" alt="Carte de localisation" />
                </figure>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
  };
  
  export default AnimalProfile;