import { useState, useEffect } from 'react';
import axios from 'axios';
import { LatLngExpression, Icon } from 'leaflet';
import { Heading, Container, Columns, Section } from 'react-bulma-components';
import AnimalItemList from '../partials/AnimalItemList';
import MapComponent from '../partials/MapComponent';
import Messagerie from '../partials/Messagerie';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

import { useGeolocation } from '../../hooks/GeolocationContext';

const defaultPosition: LatLngExpression = [43.3365, 1.3396];

// Icône personnalisée pour l'utilisateur
const userIcon = new Icon({
  iconUrl: '/img/vector/your-position-marker.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function Accueil() {
  const { user: connectedUser } = useAuth();
  const { location, error } = useGeolocation();

  // Utiliser la position de l'utilisateur (ou celle par défaut)
  const mapCenter: LatLngExpression = location
    ? [location.lat, location.lng]
    : defaultPosition;
  // GESTION DU FETCH des animaux
  const [allAnimals, setAllAnimals] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/animals')
      .then((response) => {
        setAllAnimals(response.data);
        setLoading(false);
      })
      .catch(() => {
        setFetchError('Error fetching data');
        setLoading(false);
      });
  }, []);

  //   GESTION DU FETCH des utilisateurs
  const [allUsers, setAllUsers] = useState<any>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [fetchUsersError, setFetchUsersError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users')
      .then((response) => {
        setAllUsers(response.data);
        setLoadingUsers(false);
      })
      .catch(() => {
        setFetchUsersError('Error fetching data');
        setLoadingUsers(false);
      });
  }, []);

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
        <Columns className="container">
          <Columns.Column>
            <Heading renderAs="h3">Associations</Heading>
            <p>
              Les associations de protection animale jouent un rôle essentiel
              dans le sauvetage, les soins, et la réhabilitation des animaux
              abandonnés ou maltraités. Grâce à leur dévouement, des milliers
              d'animaux retrouvent chaque année un foyer aimant.
            </p>
          </Columns.Column>
          <Columns.Column>
            <Heading renderAs="h3">Familles d'accueil</Heading>
            <p>
              Les familles d'accueil offrent un refuge temporaire aux animaux en
              attente d'adoption. Leur amour et leur patience permettent aux
              animaux de se rétablir et de s'épanouir avant de trouver leur
              foyer définitif.
            </p>
          </Columns.Column>
          <Columns.Column>
            <Heading renderAs="h3">Adoptants</Heading>
            <p>
              Les adoptants sont ceux qui ouvrent leur cœur et leur maison à un
              animal pour la vie. Leur décision d’adopter fait une différence
              immense en offrant à un animal une seconde chance et une famille
              pour toujours.
            </p>
          </Columns.Column>
        </Columns>
      </Section>
      {connectedUser && <Messagerie />}
      <Section className="yellow-line">
        <Container className="info-block">
          <Heading renderAs="h2">
            {allAnimals?.length} animaux et {allUsers?.length} associations dans
            votre secteur
          </Heading>
        </Container>
        <Columns className="container ">
          <Columns.Column
            mobile={{ size: 12 }}
            tablet={{ size: 12 }}
            desktop={{ size: 6 }}
            id="home-map-container"
          >
            <MapComponent users={allUsers} />
          </Columns.Column>
          <Columns.Column
            mobile={{ size: 12 }}
            tablet={{ size: 12 }}
            desktop={{ size: 6 }}
            className="animal-list"
          >
            {allAnimals &&
              allAnimals.map((item: any) => (
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
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
            <Link className="is-primary button" to="/trouver-animal">
              Voir les animaux
            </Link>
          </Columns.Column>
        </Columns>
      </Section>
    </main>
  );
}

export default Accueil;
