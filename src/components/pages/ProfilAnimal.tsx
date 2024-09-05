// http://localhost:5173/Profil-Animal

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

const mainSliderSettings: Record<string, any> = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: nav2,
};

const navSliderSettings: Record<string, any> = {
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: nav1,
  dots: true,
  centerMode: true,
  focusOnSelect: true,
  navigation: true,
  arrows: true
};

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
                
            <Button color="primary"  className="is-full" onClick={() => openModal('contactAssociation')}>
              Contacter association
            </Button>

          </Columns.Column>

          <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
            <Button color="secondary" className="is-full" onClick={() => openModal('demandeAdoption')}>
            Faire une demande d'adoption <br/>(ou d'accueil selon user)
            </Button>
          </Columns.Column>

        </Columns>

      </Columns.Column>

      
      </Columns>
    </Section>
   
    </>
  );
};

export default AnimalProfile;
