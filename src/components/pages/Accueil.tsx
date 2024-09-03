import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Heading, Button, Container, Columns } from 'react-bulma-components';
import AnimalItemList from '../partials/AnimalItemList';
const position: LatLngExpression = [43.3365, 1.3396];
function Accueil() {
  return (
    <main>
      <Columns id='splash-screen' vCentered>
        <Columns.Column
          mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 6 }}
        >
          <Heading>Bienvenue sur Pet Foster !</Heading>
          <Heading renderAs='h2'>Cette phrase vous va comme un slogan</Heading>
        </Columns.Column>
        <Columns.Column
          mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 6 }}
        >
          <Button color="primary" size="large">Créer mon compte</Button>
        </Columns.Column>
      </Columns>
      <Container>
        <Heading renderAs="h2">
          XX animaux dans votre secteur dans XX familles d'accueil et XX
          associations
        </Heading>
      </Container>
      <Columns>
      <Columns.Column  mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 8 }} id='home-map-container'>
      <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '80vh' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png" />
          <Marker position={position}>
            <Popup>C'est mon bled !</Popup>
          </Marker>
        </MapContainer>
      </Columns.Column>
        <Columns.Column  mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 4 }} className='animal-list'>
        <AnimalItemList />
        <AnimalItemList />
        <AnimalItemList />
        <AnimalItemList />
        <AnimalItemList />
        </Columns.Column>
        
      </Columns>
      <Container>
        <Heading renderAs="h2">Vous souhaitez affiner votre recherche?</Heading>
        <Button color="primary">Voir les animaux</Button>
      </Container>
    </main>
  );
}

export default Accueil;
