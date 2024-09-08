// http://localhost:5173/Profil-Animal

import { useModal } from '../../hooks/ModalContext';

import { useState, useEffect } from 'react';
import { Button, Heading, Section, Columns } from 'react-bulma-components';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
// import Slider from 'react-slick';
import MapComponent from '../partials/MapComponent';

// Interfaces
import { Animal } from 'src/@interfaces/animal';

// Utilitaires
import computeAge from '../../utils/computeAge'
import GalleryComponent from '../partials/GalleryComponent';
import { useAuth } from '../../hooks/AuthContext'; // Importer le contexte d'authentification


const AnimalProfile = () => {
  const { openModal } = useModal();


  // Obtenir l'utilisateur connecté à partir du contexte d'authentification
  const { user: connectedUser } = useAuth(); 
// Chargement de l'animal
const { id } = useParams(); // On récupère l'id de l'animal
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <GalleryComponent pictures={animal?.pictures}/>
      </Columns.Column>
      {/* Info animal*/}
      <Columns className="has-text-weight-bold">
      <Columns.Column mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}>
        {animal?.species.name}
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
        {computeAge(animal?.date_of_birth)}
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
       {/* info "Éditer" - Affiché uniquement si l'utilisateur connecté est le propriétaire du profil */}
{connectedUser && connectedUser.userId === animal?.creator.id && (
  <div className='notification is-info is-light is-fullwidth column '>
    <p>En tant que créateur du profil de cet animal, vous pouvez en éditer le contenu.</p>
    <button className="button is-pulled-right is-primary" onClick={() => openModal('editAnimalProfile')}>
    Éditer
  </button>
    </div>
)}
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
      <Link to={animal?.creator.website}>{animal?.creator.website}</Link><br />
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
