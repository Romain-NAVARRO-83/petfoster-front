import { useState, useEffect } from 'react';
import axios from 'axios';
import { LatLngExpression, Icon } from 'leaflet';
import AnimalItemList from '../partials/AnimalItemList';
import MapComponent from '../partials/MapComponent';
import Messagerie from '../partials/Messagerie';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import GeolocNotification from '../partials/GeolocNotification';
// import { useGeolocation } from '../../hooks/GeolocationContext';

// const defaultPosition: LatLngExpression = [43.3365, 1.3396];

// Custom icon for the user's location
// const userIcon = new Icon({
//   iconUrl: '/img/vector/your-position-marker.svg',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

function Accueil() {
  const { user: connectedUser } = useAuth();
  // const { location, error } = useGeolocation();

  // Use the user's location or the default one
  // const mapCenter: LatLngExpression = location ? [location.lat, location.lng] : defaultPosition;

  // Fetching animals data
  const [allAnimals, setAllAnimals] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetching users data
  const [allUsers, setAllUsers] = useState<any>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [fetchUsersError, setFetchUsersError] = useState<string | null>(null);

  // Fetch animals data
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

  // Fetch users data
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

  return (
    <main>
      <div id="splash-screen" className="columns is-vcentered has-text-centered">
        <div className="column is-full-mobile is-half-desktop">
          <h1 className="title">Bienvenue sur Pet Foster !</h1>
          <h2 className="subtitle">Cette phrase vous va comme un slogan</h2>
        </div>
        <div className="column is-full-mobile is-half-desktop">
          <Link className="button is-primary is-large" to="/connexion">
            Créer mon compte
          </Link>
        </div>
      </div>

      <section className="section">
        <div className="columns is-variable is-8">
          <div className="column">
            <h3 className="title is-4">Familles d'accueil</h3>
            <p>Les familles d'accueil offrent un refuge temporaire aux animaux en attente d'adoption.</p>
          </div>

          <div className="column">
            <h3 className="title is-4">Associations</h3>
            <p>Les associations jouent un rôle crucial dans la protection animale.</p>
          </div>

          <div className="column">
            <h3 className="title is-4">Adoptants</h3>
            <p>Les adoptants ouvrent leur foyer à des animaux pour la vie.</p>
          </div>
        </div>
        < GeolocNotification />
      </section>

      {connectedUser && <Messagerie />}

      <section className="section yellow-line">
        <div className="container info-block">
          <h2 className="title is-3">
            {allAnimals?.length} animaux et {allUsers?.length} associations dans votre secteur
          </h2>
        </div>

        <div className="columns is-align-items-start">
          <div className="column is-full-mobile is-half-desktop" id="home-map-container">
            <MapComponent users={allUsers} />
          </div>

          <div className="column is-full-mobile is-half-desktop">
            <div className="animal-list">
              {allAnimals &&
                allAnimals.map((item: any) => (
                  <AnimalItemList animal={item} key={item.id} />
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section info-block">
        <div className="container">
          <h2 className="title is-3">Vous souhaitez affiner votre recherche?</h2>
          <div className="columns is-variable is-8">
            <div className="column is-full-mobile is-half-desktop">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis facere iure similique cum ab maiores
                iste quod. Temporibus facilis facere enim ad voluptatum! Nihil recusandae, iure soluta nam cum explicabo.
              </p>
            </div>
            <div className="column is-full-mobile is-half-desktop has-text-centered">
              <Link className="button is-primary" to="/trouver-animal">
                Voir les animaux
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Accueil;
