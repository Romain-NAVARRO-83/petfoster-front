// http://localhost:5173/Profil-Animal
// faire les modals avec hook et form
import { useModal } from '../../hooks/ModalContext';

import React, { useState } from 'react';
import { Button, Box, Heading, Section, Columns } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const AnimalProfile = () => {
  const { openModal } = useModal();

  // Configuration du slider
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const mainSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: nav2,
  };

  const navSliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    navigation:true,
    arrows:true
  };
  // // État pour contrôler l'affichage des modals
  // const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  // const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);

  // // Fonction pour ouvrir la modal de contact
  // const openContactModal = () => {
  //   setIsContactModalOpen(true);
  // };

  // // Fonction pour fermer la modal de contact
  // const closeContactModal = () => {
  //   setIsContactModalOpen(false);
  // };

  // // Fonction pour ouvrir la modal de demande d'adoption
  // const openAdoptionModal = () => {
  //   setIsAdoptionModalOpen(true);
  // };

  // // Fonction pour fermer la modal de demande d'adoption
  // const closeAdoptionModal = () => {
  //   setIsAdoptionModalOpen(false);
  // };

  return (
    <>
    <div>
      <Heading>Nom animal</Heading>
    </div>
    <Section className="container columns is-4">
    {/* Galerie d'images */}
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
       {/* Main Slider */}
       <Slider
                {...mainSliderSettings}
                ref={(slider: Slider | null) => setNav1(slider)}
              >
                <div>
                  <img
                    src="https://via.placeholder.com/800x400?text=Slide+1"
                    alt="Slide 1"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/800x400?text=Slide+2"
                    alt="Slide 2"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/800x400?text=Slide+3"
                    alt="Slide 3"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/800x400?text=Slide+4"
                    alt="Slide 4"
                    loading="lazy"
                  />
                </div>
              </Slider>

              {/* Navigation Slider (Thumbnails) */}
              <Slider
                {...navSliderSettings}
                ref={(slider: Slider | null) => setNav2(slider)}
              >
                <div>
                  <img
                    src="https://via.placeholder.com/150x100?text=Thumb+1"
                    alt="Thumb 1"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/150x100?text=Thumb+2"
                    alt="Thumb 2"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/150x100?text=Thumb+3"
                    alt="Thumb 3"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/150x100?text=Thumb+4"
                    alt="Thumb 4"
                    loading="lazy"
                  />
                </div>
              </Slider>
      </Columns.Column>
      {/* Info animal*/}
      <Columns className="has-text-weight-bold">
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
        Espèce
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
        Race
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
        Sexe
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
        Age
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 12 }}>
        <Link to="#localisation">Localisation</Link>
      </Columns.Column>
       <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 12 }}>
       <p>Description courte ... Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, eos.</p>
       </Columns.Column>
      </Columns>
      
    </Section>
    <Section className="container box">
      <Heading renderAs="h2">A propos de (nom animal)</Heading>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. A repellat sequi error officiis, facere eligendi temporibus consequatur numquam placeat consequuntur quis adipisci ea tenetur nesciunt similique ex! Fuga, laboriosam quidem!
      </div>
      <Heading renderAs="h3">Santé</Heading>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis?</p>
    </Section>
    <Heading renderAs="h2">Où se trouve (nom animal) ?</Heading>
    <Section id="localisation" className="container">
      
      <Columns>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
      Map
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
      <p>
        Description asso + adresse
        </p>
                {/* Boutons d'action */}
                <Columns className="is-variable is-4">
          <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
            <Button color="primary"  className="is-full">
              Contacter association
            </Button>
          </Columns.Column>
          <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
            <Button color="secondary" className="is-full">
            Faire une demande d'adoption <br/>(ou d'accueil selon user)
            </Button>
          </Columns.Column>
        </Columns>
      </Columns.Column>

      
      </Columns>
    </Section>
      <div >

        

        

        {/* Informations sur l'animal */}
        {/* <div className="columns has-text-centered">
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
        </div> */}

        {/* Description courte */}
        {/* <div className="content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div> */}

        {/* Description longue */}
        {/* <div className="box">
          <h3 className="title is-5">Description longue de l'animal</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div> */}

        {/* Section santé */}
        {/* <div className="box">
          <h3 className="title is-5">SANTÉ</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi recusandae, velit exercitationem corrupti expedita laudantium adipisci ea, reprehenderit cupiditate nam aperiam maiores tempore qui ducimus rerum molestiae id laboriosam eum.</p>
        </div> */}

        {/* Carte de localisation */}
        {/* <div className="box has-text-centered">
          <figure className="image is-4by3">
            <img src="https://via.placeholder.com/600x400" alt="Carte de localisation" />
          </figure>
          <p>Adresse du lieu où se trouve le chat - Distance par rapport à l'utilisateur connecté</p>
        </div> */}

        {/* Boutons d'action */}
        {/* <div className="buttons is-centered">
          <button className="button is-success is-rounded" >
            Contacter association
          </button>

          <button className="button is-link is-rounded" >
            Faire une demande d'adoption
          </button>
        </div> */}

        {/* Modal de contact */}
        {/* {isContactModalOpen && (
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
        )} */}

        {/* Modal de demande d'adoption */}
        {/* {isAdoptionModalOpen && (
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


          <div className="buttons is-centered">
          <button className="button is-success is-rounded" >
            Contacter association
          </button>

          <button className="button is-link is-rounded" >
            Faire une demande d'adoption
          </button>
        </div>
        )} */}
      </div>
   
    </>
  );
};

export default AnimalProfile;
