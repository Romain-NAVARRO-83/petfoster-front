import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { LatLngExpression, Icon as LeafletIcon, LatLngBounds } from 'leaflet';
import { useGeolocation } from "../../hooks/GeolocationContext";
import { getDistance } from "geolib";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { User } from 'src/@interfaces/user';
import { Animal } from 'src/@interfaces/animal';

// Position par défaut si la géolocalisation n'est pas disponible
const defaultPosition: LatLngExpression = [43.3365, 1.3396];

// Icône personnalisée pour la position de l'utilisateur
const userIcon = new LeafletIcon({
  iconUrl: '/img/vector/your-position-marker.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41], // Point d'ancrage pour l'icône
  popupAnchor: [1, -34], // Position du popup par rapport au marqueur
});

interface IFitMapToBoundsProps {
  users: User[] | null;
  animal: Animal | null;
  location: { lat: number; lng: number } | null;
}

// Composant pour ajuster la carte afin qu'elle affiche tous les marqueurs
function FitMapToBounds({ users, animal, location }: IFitMapToBoundsProps) {
  const map = useMap(); // Accéder à l'instance de la carte

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
          bounds.extend([parseFloat(user.latitude), parseFloat(user.longitude)]);
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
  animal: Animal | null;
  filters: IFilters | null; 
  showSearchArea?: boolean; // Prop optionnelle qui sert à afficher le rond uniquement sur certaines pages
}

function MapComponent({ users, animal, filters, showSearchArea = false }: MapComponentProps) {
  const { location } = useGeolocation();
  const mapCenter: LatLngExpression = location ? [location.lat, location.lng] : defaultPosition;
  const animalPosition: LatLngExpression = animal ? [animal.creator.latitude, animal.creator.longitude] : defaultPosition;


  const sexeFilter = filters?.sexe ?? "";


  const filteredUsers = sexeFilter !== ""
    ? users?.filter(user =>
        user.userAnimals?.some(animal => animal.animal.sexe === sexeFilter)
      )
    : users; 

  return (
    <>
      {animal && location && (
        <h3 className='subtitle'>
          à &nbsp;<strong>
            {(getDistance(
              { latitude: location.lat, longitude: location.lng },
              { latitude: animal.creator.latitude, longitude: animal.creator.longitude }
            ) / 1000).toFixed(2)}
            &nbsp;Km </strong> de votre position
        </h3>
      )}

      <MapContainer
        center={mapCenter}  // Centrer la carte sur la position de l'utilisateur (ou position par défaut)
        zoom={13} // Zoom par défaut
        scrollWheelZoom={false} // Désactiver le zoom avec la molette
        style={{ height: '500px', zIndex: 1 }}
        className='card'
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
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
            center={mapCenter} // Le centre est la position de l'utilisateur
            radius={filters?.search_area ? filters.search_area * 1000 : 30000} // Périmètre en mètres
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }} // Style du cercle (bleu, transparent)
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
        {filteredUsers && filteredUsers.map((user) => (
          <Marker
            key={user.id}
            position={[parseFloat(user.latitude), parseFloat(user.longitude)]}
          >
            <Popup>
              {user.name}
              <br />
              <Link to={`/profil/${user.id}`}>Voir le profil</Link>
              {/* Liste des animaux du user */}
              {user.userAnimals && user.userAnimals.map((index) => (
                <span key={index.animal.id}>{index.animal.name}</span>
              ))}
            </Popup>
          </Marker>
        ))}

        {/* Composant pour ajuster la vue de la carte afin d'inclure tous les marqueurs */}
        <FitMapToBounds users={filteredUsers} animal={animal} location={location} />
      </MapContainer>
    </>
  );
}

export default MapComponent;
