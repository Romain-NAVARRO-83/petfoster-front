import React from 'react';

const AboutUs = () => {
  return (
    <>
    <div><h1 className="title">
            Qui sommes-nous
          </h1></div>
      {/* Section d'introduction */}
      <section className="section">
        <div className="container">
          
          <div className="content has-text-centered">
            <p>
              Bienvenue sur notre page à propos. Nous sommes une équipe dédiée à fournir des solutions innovantes pour l'adoption et la gestion des animaux.
            </p>
          </div>
        </div>
      </section>
      
      {/* Notre identité */}
      <section className="yellow-line">
        <div className="container">
          {/* <div className="box has-background-warning p-5"> */}
            <h2 className="title">Notre identité</h2>
            
                  <p>
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                    Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla
                    ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                  </p>


          {/* </div> */}
        </div>
      </section>

      {/* Nos engagements */}
      <section className="section">
        <div className="container">
         
            <h2 className="title ">Nos engagements</h2>
            <div>
              
                  <p>
                    Nous nous engageons à offrir un service de qualité, centré sur le bien-être des animaux et la satisfaction des familles d'accueil.
                    Notre équipe travaille main dans la main avec des associations pour garantir une adoption responsable et respectueuse des animaux.
                  </p>
                </div>
              </div>


      </section>

      {/* Foire aux questions */}
      <section className="yellow-line">
        <div className="container">
          
            <h2 className="title">Foire aux questions (FAQ)</h2>
            
                  <p>
                    Vous avez des questions ? Consultez notre FAQ pour en savoir plus sur nos services, nos procédures et les réponses à vos interrogations courantes.
                  </p>
                  <ul>
                    <li>Comment fonctionne le processus d'adoption ? Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Quels types d'animaux sont disponibles ? Nullam convallis elit nec interdum ultrices.</li>
                    <li>Comment puis-je devenir une famille d'accueil ? Maecenas consequat urna ut tortor pharetra vehicula.</li>
                  </ul>
                </div>
      </section>
    </>
  );
};

export default AboutUs;
