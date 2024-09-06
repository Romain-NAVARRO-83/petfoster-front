// http://localhost:5173/Profil-Animal

import { useModal } from '../../hooks/ModalContext';

import { useState, useEffect } from 'react';
import { Button, Heading, Section, Columns } from 'react-bulma-components';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import MapComponent from '../partials/MapComponent';

// Interfaces
import { Animal } from 'src/@interfaces/animal';

// Utilitaires
import computeAge from '../../utils/computeAge'

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

// Chargement de l'animal
const { id } = useParams(); // Get animal ID from the URL
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/animals/${id}`)
      .then(response => {
        setAnimal(response.data); 
        
        setLoading(false);
      })
      .catch(error => {
        setError(error); 
        setLoading(false); 
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
    <div>
      <Heading>{animal?.name}</Heading>
    </div>
    {console.log(animal)}
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
                    src="https://placehold.co/600x400?text=Slide+1"
                    alt="Slide 1"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://placehold.co/600x400?text=Slide+2"
                    alt="Slide 2"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://placehold.co/600x400?text=Slide+3"
                    alt="Slide 3"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://placehold.co/600x400?text=Slide+4"
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
                    src="https://placehold.co/600x400?text=Slide+1"
                    alt="Thumb 1"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://placehold.co/600x400?text=Slide+2"
                    alt="Thumb 2"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://placehold.co/600x400?text=Slide+3"
                    alt="Thumb 3"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="https://placehold.co/600x400?text=Slide+4"
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
        {animal?.race}
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
        {animal?.sexe}
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
        {computeAge(animal?.date_of_birth ?? '')}
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 12 }}>
        <Link to="#localisation">Localisation</Link>
      </Columns.Column>
       <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 12 }}>
       {animal?.short_story}
       </Columns.Column>
      </Columns>
      
    </Section>
    <Section className="container box">
      <Heading renderAs="h2">A propos de {animal?.name}</Heading>
      <div>
      {animal?.long_story}
      </div>
      <Heading renderAs="h3">Santé</Heading>
      {animal?.health}
    </Section>
    <Heading renderAs="h2">Où se trouve {animal?.name} ?</Heading>
    <Section id="localisation" className="container">
      
      <Columns>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
                <MapComponent />
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
               <p>
               {animal?.creator.name}<br />
      {animal?.creator.address}<br />
      {animal?.creator.city}<br />
      {animal?.creator.country}<br />
      <Link to={animal?.creator.website ?? '#'}>{animal?.creator.website ?? 'Site web non disponible'}</Link>
               </p>
      
                {/* Boutons d'action */}

        <Columns className="is-variable is-4">

          <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
                
            <Button color="primary"  className="is-full" onClick={() => openModal('contactUser')}>
              Contacter association
            </Button>

          </Columns.Column>

          <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
            <Button color="secondary" className="is-full" onClick={() => openModal('addFosterlingRequest')}>
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
