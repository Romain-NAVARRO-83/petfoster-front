import { useModal } from '../../hooks/ModalContext';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MapComponent from '../partials/MapComponent';
import GalleryComponent from '../partials/GalleryComponent';
import computeAge from '../../utils/computeAge';
import { useAuth } from '../../hooks/AuthContext'; 
import { Animal } from 'src/@interfaces/animal';
import { User } from 'src/@interfaces/user';
import GeolocNotification from '../partials/GeolocNotification';

const AnimalProfile = () => {
  const { openModal, closeModal } = useModal();
  const { user: connectedUser } = useAuth(); 
  
  console.log('connectedUser:', connectedUser ,); // Pour vérifier le contenu de l'utilisateur connecté

  // Typage pour animal
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null); // Utilisez le typage correct pour l'animal
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null); // Typage de l'erreur
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        // Récupérer les informations de l'animal
        const animalResponse = await axios.get(
          `http://localhost:3000/api/animals/${id}`
        );
        setAnimal(animalResponse.data);

        if (connectedUser) {
          const userResponse = await axios.get(
            `http://localhost:3000/api/users/${connectedUser.userId}`
          );
          setUserData(userResponse.data);
        }

        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchAnimalData();
    }
  }, [id, connectedUser, closeModal]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <h1 className="title">{animal?.name}</h1>
      </div>
<GeolocNotification />
      {/* Responsive Gallery and Info Sections */}
      <section className="container columns is-multiline">
        {/* Galerie d'images */}
        <div className="column is-full-mobile is-half-tablet is-half-desktop">
          {animal?.pictures && animal.pictures.length > 0 ? (
            <GalleryComponent pictures={animal.pictures} />
          ) : (
            <p>Aucune image disponible pour cet animal.</p>
          )}
        </div>

        {/* Info animal */}
        <div className="column columns is-multiline is-full-mobile is-full-tablet is-half-desktop">
          <div className="column is-full-mobile is-half-tablet is-half-desktop">
            Espèce : <strong>{animal?.species.name}</strong>
          </div>
          <div className="column is-full-mobile is-half-tablet is-half-desktop">
            Race : <strong>{animal?.race}</strong>
          </div>
          <div className="column is-full-mobile is-half-tablet is-half-desktop">
            Sexe : <strong>{animal?.sexe === 'F' ? 'Femelle' : 'Mâle'}</strong>
          </div>
          <div className="column is-full-mobile is-half-tablet is-half-desktop">
            Age :{' '}
            <strong>
              {animal?.date_of_birth
                ? computeAge(animal.date_of_birth)
                : 'Inconnue'}
            </strong>
          </div>
          <div className="column is-full">
            <Link to="#localisation">Localisation</Link>
          </div>
          <div className="column is-full">
            <h2 className="subtitle">En quelques mots</h2>
            <p>{animal?.short_story}</p>
          </div>
        </div>

        {/* Edit option for creator */}
        {connectedUser && connectedUser.userId === animal?.creator.id && (
          <div className="notification is-info is-light is-fullwidth column">
            <p>
              En tant que créateur du profil de cet animal, vous pouvez en
              éditer le contenu.
            </p>
            <button
              className="button is-pulled-right is-primary"
              onClick={() => openModal('editAnimalProfile', undefined, undefined, animal?.id)}
            >
              Éditer
            </button>
          </div>
        )}
      </section>

      {/* A propos de l'animal */}
      <section className="container box">
        <h2 className="title">A propos de {animal?.name}</h2>
        <div>{animal?.long_story}</div>
        <h3 className="subtitle">Santé</h3>
        <div>{animal?.health}</div>
      </section>

      {/* Localisation */}
      <section id="localisation" className="yellow-line">
        <h2 className="title">Où se trouve {animal?.name} ?</h2>
        <div className="container columns is-vcentered is-fluid">
          <div className="column is-full-mobile is-half-tablet is-half-desktop">
          <MapComponent
            animal={animal}
            users={animal?.creator ? [animal.creator] : []}
            filters={{ species: '', age: '', sexe: '', search_area: 30 }} // Valeurs par défaut pour filters
          />
          </div>
          <div className="column is-full-mobile is-half-tablet is-half-desktop box">
            <p>
              {animal?.creator.name}
              <br />
              {animal?.creator.address}
              <br />
              {animal?.creator.city}
              <br />
              {animal?.creator.country}
              <br />
              {animal?.creator.website ? (
                <Link to={animal.creator.website}>
                  {animal.creator.website}
                </Link>
              ) : (
                <span>Pas de site web disponible</span>
              )}
            </p>

            {/* Action Buttons */}
            <div className="columns is-variable is-4">
              <div className="column is-full-mobile is-half-tablet">
                {connectedUser && (
                  <button
                    className="button is-primary is-fullwidth"
                    onClick={() =>
                      openModal(
                        'contactUser',
                        connectedUser.userId,
                        id ? parseInt(id) : undefined
                      )
                    }
                  >
                    Contacter association
                  </button>
                )}
                {!connectedUser && (
                  <div className="notification is-info is-light">
                    <p>
                      Connectez-vous à votre compte pour contacter l'association
                    </p>
                  </div>
                )}
              </div>

              <div className="column is-full-mobile is-half-tablet">
              {userData && (userData.type_user === 'adoptant' || userData.type_user === 'famille d\'accueil') && animal?.id && (
    <button
      className="button is-secondary is-fullwidth"
      onClick={() => openModal('addFosterlingRequest', connectedUser?.userId, undefined, animal?.id)}
      >
        Faire une demande d'adoption (ou d'accueil)
    </button>
  
  )}
                {!connectedUser && (
                  <div className="notification is-info is-light">
                    <p>
                      Connectez-vous à votre compte pour faire une demande
                      d'adoption
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AnimalProfile;
