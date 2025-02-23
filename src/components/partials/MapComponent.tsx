import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from 'react-leaflet';
import { LatLngExpression, Icon as LeafletIcon, LatLngBounds } from 'leaflet';
import { useGeolocation } from '../../hooks/GeolocationContext';
import { getDistance } from 'geolib';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { User } from 'src/@interfaces/user';
import { Animal } from 'src/@interfaces/animal';
import GenderIcon from './GenderIcon';
import IdToSPecies from './IdToSpecies';

const defaultPosition: LatLngExpression = [43.3365, 1.3396];
const userIcon = new LeafletIcon({
  iconUrl: '/img/vector/marker-round3.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const assoIcon = new LeafletIcon({
  iconUrl: '/img/vector/marker-losange.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [1, -34],
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [30, 30],
  shadowAnchor: [13, 30],
});
const fosterIcon = new LeafletIcon({
  iconUrl: '/img/vector/marker-triangle2.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [1, -34],
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [30, 30],
  shadowAnchor: [13, 30],
});
const adoptIcon = new LeafletIcon({
  iconUrl: '/img/vector/marker-round2.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [1, -34],
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [30, 30],
  shadowAnchor: [15, 30],
});

interface IFitMapToBoundsProps {
  users: User[] | null;
  animal: Animal | null;
  location: { lat: number; lng: number } | null;
}

function FitMapToBounds({ users, animal, location }: IFitMapToBoundsProps) {
  const map = useMap();

  useEffect(() => {
    const bounds = new LatLngBounds([]);

    if (location) {
      bounds.extend([location.lat, location.lng]);
    }

    if (animal) {
      bounds.extend([animal.creator.latitude, animal.creator.longitude]);
    }

    if (users && users.length > 0) {
      users.forEach((user) => {
        if (user.latitude && user.longitude) {
          bounds.extend([user.latitude, user.longitude]);
        }
      });
    }
    if (bounds.isValid()) {
      map.fitBounds(bounds);
    }
  }, [map, users, animal, location]);

  return null;
}
interface IFilters {
  species: string;
  age: string;
  sexe: string;
  search_area: number;
}
interface MapComponentProps {
  users: User[] | null;
  animal?: Animal | null;
  filters?: IFilters | null;
  showSearchArea?: boolean;
}
function MapComponent({
  users,
  animal,
  filters,
  showSearchArea = false,
}: MapComponentProps) {
  const { location } = useGeolocation();
  const mapCenter: LatLngExpression = location
    ? [location.lat, location.lng]
    : defaultPosition;
  const animalPosition: LatLngExpression = animal
    ? [animal.creator.latitude, animal.creator.longitude]
    : defaultPosition;

  const sexeFilter = filters?.sexe ?? '';

  const filteredUsers =
    sexeFilter !== ''
      ? users?.filter((user) =>
          user.userAnimals?.some((animal) => animal.animal.sexe === sexeFilter)
        )
      : users;

  return (
    <>
      {animal && location && (
        <h3 className="subtitle">
          à &nbsp;
          <strong>
            {(
              getDistance(
                { latitude: location.lat, longitude: location.lng },
                {
                  latitude: animal.creator.latitude,
                  longitude: animal.creator.longitude,
                }
              ) / 1000
            ).toFixed(2)}
            &nbsp;Km{' '}
          </strong>{' '}
          de votre position
        </h3>
      )}
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '500px', zIndex: 1 }}
        className="card"
      >
        <TileLayer
          url={`https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png?api_key=${import.meta.env.REACT_APP_STADIA_API_KEY}`}
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        />

        {/* Marqueur sur la position de l'utilisateur (ou position par défaut) */}
        <Marker position={mapCenter} icon={userIcon}>
          <Popup>
            Votre position
            <br />
            <Link to="/profil">Profil user</Link>
          </Popup>
        </Marker>

        {/* Cercle de périmètre de recherche uniquement si showSearchArea est vrai */}
        {location && showSearchArea && (
          <Circle
            center={mapCenter}
            radius={filters?.search_area ? filters.search_area * 1000 : 30000}
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
          />
        )}

        {/* Marqueur pour l'animal sélectionné */}
        {animal && (
          <Marker position={animalPosition} icon={userIcon}>
            <Popup>
              {animal.name}
              <br />
              <Link to="/profil">Profil user</Link>
            </Popup>
          </Marker>
        )}

        {/* Marqueurs pour les utilisateurs filtrés */}
        {filteredUsers &&
          filteredUsers.map((user) => (
            <Marker
              key={user.id}
              position={[user.latitude, user.longitude]}
              {...(user.type_user === 'association' && { icon: assoIcon })}
              {...(user.type_user === "famille d'accueil" && {
                icon: fosterIcon,
              })}
              {...(user.type_user === 'adoptant' && { icon: adoptIcon })}
            >
              <Popup>
                <p className="mapopup-header">
                  <Link to={`/profil/${user.id}`}> {user.name}</Link>
                </p>
                <p className="mapopup-usertype">{user.type_user}</p>
                <div className="columns">
                  {/* Liste des animaux du user (hebergement)*/}
                  {user.userAnimals && user.userAnimals.length > 0 && (
                    <div className="column">
                      <p className="mapopup-subheader">Héberges</p>
                      <ul>
                        {user.userAnimals.map((index) => (
                          <li key={index.animal.id}>
                            <Link to={`/animal/${index.animal.id}`}>
                              {index.animal.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Liste des animaux du user (créés)*/}
                  {user.createdAnimals && user.createdAnimals.length > 0 && (
                    <div className="column">
                      <p className="mapopup-subheader">à créé</p>
                      <ul>
                        {user.createdAnimals.map((animal) => (
                          <li key={animal.id}>
                            <Link to={`/animal/${animal.id}`}>
                              {animal.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Liste des recherches du user (profils d'accueil)*/}
                  {user.type_user !== 'association' &&
                    user.fosterlingProfiles &&
                    user.fosterlingProfiles.length > 0 && (
                      <div className="column">
                        <p className="mapopup-subheader">
                          {user.type_user === 'adoptant'
                            ? 'Recherche'
                            : 'Peut accueillir'}
                        </p>
                        <ul>
                          {user.fosterlingProfiles.map((profile) => (
                            <li key={profile.id}>
                              {profile.quantity}x{' '}
                              <IdToSPecies speciesId={profile.species_id} />{' '}
                              <GenderIcon gender={profile.sexe} size={12} />{' '}
                              {profile.age}{' '}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </Popup>
            </Marker>
          ))}
        {/* Composant pour ajuster la vue de la carte afin d'inclure tous les marqueurs */}
        <FitMapToBounds
          users={filteredUsers || null}
          animal={animal ?? null} 
          location={location}
        />
      </MapContainer>
    </>
  );
}

export default MapComponent;
