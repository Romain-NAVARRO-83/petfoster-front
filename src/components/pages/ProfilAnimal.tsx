// http://localhost:5173/Profil-Animal
// faire les modals avec hook et form


import React, { useState } from 'react';
import { Button, Box, Heading } from 'react-bulma-components';

const AnimalProfile = () => {
  // État pour contrôler l'affichage des modals
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);

  // Fonction pour ouvrir la modal de contact
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  // Fonction pour fermer la modal de contact
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // Fonction pour ouvrir la modal de demande d'adoption
  const openAdoptionModal = () => {
    setIsAdoptionModalOpen(true);
  };

  // Fonction pour fermer la modal de demande d'adoption
  const closeAdoptionModal = () => {
    setIsAdoptionModalOpen(false);
  };

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
          <button className="button is-success is-rounded" onClick={openContactModal}>
            Contacter association
          </button>

          <button className="button is-link is-rounded" onClick={openAdoptionModal}>
            Faire une demande d'adoption
          </button>
        </div>

        {/* Modal de contact */}
        {isContactModalOpen && (
          <div className={`modal ${isContactModalOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={closeContactModal}></div>
            <div className="modal-content">
              <Box>
                <Heading size={4}>FORMULAIRE DE CONTACT</Heading>

                <form action="#" method="post">
                  <div className="field">
                    <label className="label" htmlFor="nom">Nom</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        id="nom"
                        name="nom"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="email">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Votre adresse email"
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="message">Message</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        id="message"
                        name="message"
                        placeholder="Votre message"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <Button color="primary" onClick={closeContactModal}>
                        Soumettre
                      </Button>
                    </div>
                  </div>
                </form>
              </Box>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={closeContactModal}
            ></button>
          </div>
        )}

        {/* Modal de demande d'adoption */}
        {isAdoptionModalOpen && (
          <div className={`modal ${isAdoptionModalOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={closeAdoptionModal}></div>
            <div className="modal-content">
              <Box>
                <Heading size={4}>Demande d'adoption</Heading>

                <form action="#" method="post">
                  <div className="field">
                    <label className="label" htmlFor="justification">Justification</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        id="justification"
                        name="justification"
                        placeholder="Pourquoi souhaitez-vous adopter cet animal ?"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <Button color="primary" onClick={closeAdoptionModal}>
                        Valider la demande
                      </Button>
                    </div>
                  </div>
                </form>
              </Box>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={closeAdoptionModal}
            ></button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnimalProfile;
