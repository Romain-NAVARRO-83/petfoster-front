import React, { useState, useEffect } from 'react';
import { Button, Heading, Section, Columns, Container, Table } from 'react-bulma-components';
import { Envelope, Pencil, PlusSmall } from 'react-flaticons';
import Slider from 'react-slick';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useModal } from '../../hooks/ModalContext';
import FosterlingProfile from '../partials/FosterlingProfile'; // Profils d'accueil dynamique
import { useAuth } from '../../hooks/AuthContext'; // Importer le contexte d'authentification
import { Animal } from 'src/@interfaces/animal';


interface Image {
  url: string;
  thumbnail: string;
}

// Définir le type User
interface User {
  id: number;
  type_user: "adoptant" | "foster" | "autre"; 
  name: string;
  email: string;
  password: string; 
  country: string;
  zip: number;
  city: string;
  longitude: number; 
  latitude: number;  
  phone: string;
  address: string;
  website: string | null; // Le site peut être optionnel (nullable)
  description: string;
  created_at: string; // Peut-être utiliser `Date` si vous préférez
  updated_at: string | null;
  userAnimals: Animal[]; 
  images?: Image[]; // Ajoute la propriété `images` dans l'interface `User`
}

// Définir le type pour les profils d'accueil
interface FosterlingProfileType {
  id: number;
  species: string;
  age: string;
  gender: string;
  perimeter: string;
  profile: FosterlingProfileType; // Le type des données du profil
}

function ProfilUtilisateur() {
  const { openModal } = useModal();
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID de l'utilisateur à partir de l'URL
  const [user, setUser] = useState<User | null>(null); // Stocker les données de l'utilisateur
  const [fosterlingProfiles, setFosterlingProfiles] = useState<FosterlingProfileType[]>([]); // Stocker les profils d'accueil
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState<Error | null>(null); // Accepter Error ou null

  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  // Obtenir l'utilisateur connecté à partir du contexte d'authentification
  const { user: connectedUser } = useAuth(); 

  // Configuration des sliders
  const mainSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: nav2 || undefined,
  };

  const navSliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1 || undefined,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
  };

  // Récupérer les données de l'utilisateur et des profils d'accueil depuis l'API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/api/users/${id}`);
        setUser(userResponse.data);
        console.log(userResponse.data)
        
        // const fosterlingResponse = await axios.get(`http://localhost:3000/api/users/${id}/profils`);
        // setFosterlingProfiles(fosterlingResponse.data);
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
          setError(error as Error); 
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <div>
        <h1 className='title'>{user?.name}</h1>
      </div>

      <Section>

        <Container>
{/* Info -  uniquement si l'utilisateur connecté est le propriétaire du profil */}
{connectedUser && user && id && connectedUser.userId === parseInt(id) && (
  <p className='notification is-primary has-text-centered'>
    Ceci est votre profil, vous pouvez l'éditer grâce au bouton présent plus bas.
  </p>
)}
          <Columns>

            <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 6 }}>

              {/* Main Slider */}
              <Slider {...mainSliderSettings} ref={(slider) => setNav1(slider)}>

                {user && user.images && user.images.map((image, index) => (
                  <div key={index}>
                    <img src={image.url} alt={`Slide ${index + 1}`} loading="lazy" />
                  </div>
                ))}

              </Slider>

              {/* Navigation Slider (Thumbnails) */}
              <Slider {...navSliderSettings} ref={(slider) => setNav2(slider)}>

                {user && user.images && user.images.map((image, index) => (
                  <div key={index}>
                    <img src={image.thumbnail} alt={`Thumb ${index + 1}`} loading="lazy" />
                  </div>
                ))}

              </Slider>

            </Columns.Column>

            <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 6 }}>

            {user && (
              <>
              <h2 className='title'>{user.type_user}</h2>
                <ul>
                  <li><strong>Nom:</strong> {user.name}</li>
                  <li><strong>Email:</strong> {user.email}</li>
                  <li><strong>Tél:</strong> {user.phone}</li>
                  <li><strong>Pays:</strong> {user.country}</li>
                  <li><strong>Code postal:</strong> {user.zip}</li>
                  <li><strong>Ville:</strong> {user.city}</li>
                  <li><strong>Adresse:</strong> {user.address}</li>
                </ul>
                </>
              )}

            </Columns.Column>

          </Columns>

        </Container>

      </Section>

      <Section>

        <Container>

          <Heading size={2} renderAs="h2">
            Description
          </Heading>

          <Section>
            {user && <p>{user.description}</p>}
          </Section>
{/* Bloc d'info : Connectez-vous pour contacter */}
{!connectedUser && (
  <div className='notification is-info is-light has-text-right is-pulled-right'>
    <p>Connectez-vous à votre compte pour pouvoir contacter {user?.name}</p>
    <Link to="/connexion" className='button is-primary'>Se connecter</Link>
  </div>
)}

{/* Bouton "Contacter" - Affiché uniquement si l'utilisateur connecté n'est pas le propriétaire du profil et s'il est connecté */}
{user && connectedUser && (
  <Button
    color="primary"
    className="is-pulled-right"
    onClick={() => openModal('contactUser', connectedUser.userId, user.id)}
  >
    Contacter
  </Button>
)}


{/* Bouton "Éditer" - Affiché uniquement si l'utilisateur connecté est le propriétaire du profil */}
{connectedUser && user && id !== undefined && connectedUser.userId === parseInt(id) && (
  <Button color="primary" className="is-pulled-right" onClick={() => openModal('editUserProfile')}>
    <Pencil /> Éditer
  </Button>
)}
      </Container>

      </Section>

      <Section>

        <Container>
          
          <h2 className='title'>
            Profils d'accueil
          </h2>

{/* Bouton "Ajouter" - Affiché uniquement si l'utilisateur connecté est le propriétaire du profil */}
{connectedUser && user && id !== undefined && connectedUser.userId === parseInt(id) && (
  <Button color="primary" className="is-pulled-right" onClick={() => openModal('addFosterlingProfile', connectedUser.userId )}>
    <PlusSmall /> Ajouter
  </Button>
)}
          {/* {JSON.stringify(user)} */}

          <table className=" table is-fullwidth has-text-centered card">

            <thead>

              <tr>
                <th className="has-text-centered">Espèce</th>
                <th className="has-text-centered">Âge</th>
                <th className="has-text-centered">Sexe</th>
                <th className="has-text-centered">Quantité</th>
                <th className="has-text-centered">Périmètre</th>
                <th className="has-text-right">Contrôle</th>
              </tr>

            </thead>

            <tbody>

              {user?.fosterlingProfiles.map((profile) => (
                <FosterlingProfile key={profile.id} profile={profile} />
              ))}

            </tbody>

          </table>
          <h2 className='title'>Animaux</h2>

        </Container>

      </Section>

    </main>
  );
}

export default ProfilUtilisateur;
