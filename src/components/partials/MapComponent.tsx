import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from 'react-leaflet';
import { LatLngExpression, Icon as LeafletIcon, LatLngBounds } from 'leaflet';
import { useGeolocation } from "../../hooks/GeolocationContext";
import { getDistance } from "geolib";
import { Link } from 'react-router-dom';
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

interface MapComponentProps {
  users: User[] | null;
  animal: Animal | null;
  searchRadius: number | null;
}

function MapComponent({ users, animal, searchRadius }: MapComponentProps) {
  const { location } = useGeolocation(); // Récupérer la position de l'utilisateur via le contexte de géolocalisation

  // Utiliser la position de l'utilisateur si elle est disponible, sinon la position par défaut
  const mapCenter: LatLngExpression = location ? [location.lat, location.lng] : defaultPosition;
  const animalPosition: LatLngExpression = animal ? [animal.creator.latitude, animal.creator.longitude] : defaultPosition;

  // État pour stocker le zoom initial et la position
  const [zoomLevel, setZoomLevel] = useState<number>(7);  // Niveau de zoom initial modéré
  const [center, setCenter] = useState<LatLngExpression>(mapCenter);  // Position initiale

  useEffect(() => {
    // Ajuster le centre si la position de l'utilisateur est disponible
    if (location) {
      setCenter([location.lat, location.lng]);
    }
  }, [location]);

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
        center={center}  // Utilisation de l'état "center" pour la position
        zoom={zoomLevel} // Utilisation de l'état "zoomLevel" pour le zoom initial
        scrollWheelZoom={true} // Autoriser le zoom avec la molette
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

        {/* Périmètre autour de la position de l'utilisateur */}
        {location && searchRadius && !isNaN(searchRadius) && (
          <Circle
            center={mapCenter}
            radius={searchRadius} // Utilisation de searchRadius pour définir le rayon
            color="blue"
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

        {/* Marqueurs pour tous les utilisateurs */}
        {users && users.map((user) => (
          <Marker
            key={user.id}
            position={[parseFloat(user.latitude), parseFloat(user.longitude)]}
          >
            <Popup>
              {user.name}
              <br />
              <Link to={`/profil/${user.id}`}>Voir le profil</Link>
              {user.userAnimals && user.userAnimals.map((index) => (
                <span key={index.animal.id}>{index.animal.name}</span>
              ))}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default MapComponent;
