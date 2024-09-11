import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LatLngExpression, Icon } from 'leaflet';
import {
  Heading,
  Container,
  Columns,
  Section,
} from 'react-bulma-components';
import AnimalItemList from '../partials/AnimalItemList';
import MapComponent from '../partials/MapComponent';
import { Link } from 'react-router-dom';
import { useGeolocation } from "../../hooks/GeolocationContext";

const defaultPosition: LatLngExpression = [43.3365, 1.3396];

// Icône personnalisée pour la position de l'utilisateur
const userIcon = new Icon({
  iconUrl: '/img/vector/your-position-marker.svg', 
  iconSize: [25, 41],  
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
});

function Accueil() {
  const { location, error } = useGeolocation();
  
  // Utiliser la position de l'utilisateur (ou celle par défaut)
  const mapCenter: LatLngExpression = location ? [location.lat, location.lng] : defaultPosition;

  // GESTION DU FETCH des animaux
  const [allAnimals, setAllAnimals] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // GESTION DU FETCH des utilisateurs
  const [allUsers, setAllUsers] = useState<any>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [fetchUsersError, setFetchUsersError] = useState<string | null>(null);

  // Fetch des animaux
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/animals') 
      .then((response) => {
        setAllAnimals(response.data);
        setLoading(false);       
      })
      .catch(() => {
        setFetchError('Erreur lors de la récupération des données');
        setLoading(false);
      });
  }, []);

  // Fetch des utilisateurs
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users') 
      .then((response) => {
        setAllUsers(response.data);  
        setLoadingUsers(false);       
      })
      .catch(() => {
        setFetchUsersError('Erreur lors de la récupération des données');
        setLoadingUsers(false);
      });
  }, []);

  // Suppression du filtrage par distance dans Accueil.tsx (donc on affiche tout)
  
  return (
    <main>
      <Columns id="splash-screen" vCentered className="has-text-centered">
        <Columns.Column
          mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 6 }}
          narrow
        >
          <Heading>Bienvenue sur Pet Foster !</Heading>
          <Heading renderAs="h2">Cette phrase vous va comme un slogan</Heading>
        </Columns.Column>
        <Columns.Column
          mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 6 }}
        >
          <Link className="is-primary is-large button" to="/connexion">
            Créer mon compte
          </Link>
        </Columns.Column>
      </Columns>

      <Section>
        <Columns className='container'>
          <Columns.Column>
            <Heading renderAs='h3'>Familles d'accueil</Heading>
            <p>
              Les familles d'accueil offrent un refuge temporaire aux animaux en attente d'adoption.
            </p>
          </Columns.Column>

          <Columns.Column>
            <Heading renderAs='h3'>Associations</Heading>
            <p>
              Les associations jouent un rôle crucial dans la protection animale.
            </p>
          </Columns.Column>

          <Columns.Column>
            <Heading renderAs='h3'>Adoptants</Heading>
            <p>
              Les adoptants ouvrent leur foyer à des animaux pour la vie.
            </p>
          </Columns.Column>
        </Columns>
      </Section>

      <Section className='yellow-line'>
        <Container className="info-block">
          <Heading renderAs="h2">
            {allAnimals?.length} animaux et {allUsers?.length} associations dans votre secteur
          </Heading>
        </Container>
        <Columns className='container'>
          <Columns.Column
            mobile={{ size: 12 }}
            tablet={{ size: 12 }}
            desktop={{ size: 6 }}
            id="home-map-container"
          >
            <MapComponent users={allUsers} animal={null} searchRadius={null} /> {/* Pas de cercle dans cette page */}
          </Columns.Column>
          <Columns.Column
            mobile={{ size: 12 }}
            tablet={{ size: 12 }}
            desktop={{ size: 6 }}
            className="animal-list"
          >
            {allAnimals && allAnimals.map((item: any) => (
              <AnimalItemList animal={item} key={item.id} />
            ))}
          </Columns.Column>
        </Columns>
      </Section>

      <Section className="info-block">
        <Heading renderAs="h2">Vous souhaitez affiner votre recherche?</Heading>
        <Columns className="container">
          <Columns.Column
            mobile={{ size: 12 }}
            tablet={{ size: 12 }}
            desktop={{ size: 6 }}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
              facere iure similique cum ab maiores iste quod. Temporibus facilis
              facere enim ad voluptatum! Nihil recusandae, iure soluta nam cum
              explicabo.
            </p>
          </Columns.Column>
          <Columns.Column
            mobile={{ size: 12 }}
            tablet={{ size: 12 }}
            desktop={{ size: 6 }}
            className="has-text-centered"
          >
            <Link
              className="is-primary button"
              to="/trouver-animal"
            >
              Voir les animaux
            </Link>
          </Columns.Column>
        </Columns>
      </Section>
    </main>
  );
}

export default Accueil;

