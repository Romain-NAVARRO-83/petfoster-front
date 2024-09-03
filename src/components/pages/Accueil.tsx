import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import {
  Heading,
  Button,
  Tabs,
  Container,
  Notification,
} from 'react-bulma-components';
import AnimalItemList from '../partials/AnimalItemList';
const position: LatLngExpression = [43.3365, 1.3396];
function Accueil() {
  return (
    <main>
      <div>
        <Heading size={1} renderAs="h1">
          Bienvenue sur Pet Foster
        </Heading>
        <Tabs align="center">
          <Button color="primary" className="js-modal-trigger">
            Créer mon compte
          </Button>
        </Tabs>
        <Heading>
          XX animaux dans votre secteur dans XX familles d'accueil et XX
          associations
        </Heading>
      </div>
      <div>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '300px' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png" />
          <Marker position={position}>
            <Popup>C'est mon bled !</Popup>
          </Marker>
        </MapContainer>
        <AnimalItemList />
      </div>
    </main>
  );
}

export default Accueil;
