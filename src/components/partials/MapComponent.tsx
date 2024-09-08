import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon as LeafletIcon } from 'leaflet';
import { useGeolocation } from "../../hooks/GeolocationContext";
import { Link } from 'react-router-dom';

// Position par défaut
const defaultPosition: LatLngExpression = [43.3365, 1.3396];

// Icône personnalisée pour l'utilisateur
const userIcon = new LeafletIcon({
  iconUrl: '/img/vector/your-position-marker.svg', // URL de l'image personnalisée pour l'utilisateur
  iconSize: [25, 41],  // Taille du marqueur
  iconAnchor: [12, 41], // Position de l'ancre (la pointe du marqueur)
  popupAnchor: [1, -34], // Position du popup par rapport au marqueur
});
function MapComponent({users}){
  const { location, error } = useGeolocation();

  // Utiliser la position de l'utilisateur (ou celle par défaut)
  const mapCenter: LatLngExpression = location ? [location.lat, location.lng] : defaultPosition;
  return(
    <MapContainer
            center={mapCenter}  // Centre de la carte sur l'utilisateur (ou position défaut)
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '80vh', zIndex: 1 }}
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            />

            <Marker position={mapCenter} icon={userIcon}> {/* Marqueur sur la position de l'utilisateur (ou défaut) */}
              <Popup>
                Utilisateur
                <br />
                <Link to="/profil">Profil user</Link>
              </Popup>
            </Marker>


            {users && users.map((user: any) => (
  <Marker 
    key={user.id} 
    position={[parseFloat(user.latitude), parseFloat(user.longitude)]} 
  > 
    <Popup>
      {user.name}
      <br />
      <Link to={`/profil/${user.id}`}>Voir le profil</Link>
    </Popup>
  </Marker>
))}
          </MapContainer>
  )
}
export default MapComponent;