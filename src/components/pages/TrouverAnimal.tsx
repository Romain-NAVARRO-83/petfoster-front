import { Heading, Dropdown, Icon, Button, Section, Columns } from "react-bulma-components";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import AnimalItemList from "../partials/AnimalItemList";
import { Link } from 'react-router-dom';

import { useGeolocation } from "../../hooks/GeolocationContext";

// Position par défaut
//TODO convenir de la position par défaut
const defaultPosition: LatLngExpression = [43.3365, 1.3396];

function TrouverAnimal() {
  const { location, error } = useGeolocation();
  
  // Utiliser la position de l'utilisateur (ou celle par défaut)
  const mapCenter: LatLngExpression = location ? [location.lat, location.lng] : defaultPosition;

  return (
    <main>
      <div>
        <Heading>Trouver un animal</Heading>
      </div>

      <section className="section">
        <div className="container box">
          <Heading renderAs="h2">Affinez votre recherche</Heading>
          <div className="is-flex is-justify-content-center is-align-items-center">

            {/* Filtre de recherche */}
            <div className="mx-6">
              <Dropdown
                closeOnSelect={false}
                color=""
                icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
                label="Espèce"
              >
                <Dropdown.Item  value="Toutes">Toutes</Dropdown.Item>
                <Dropdown.Item  value="chien">Chien</Dropdown.Item>
                <Dropdown.Item  value="Chat">Chat</Dropdown.Item>
              </Dropdown>
            </div>

            <div className="mx-6">
              <Dropdown
                closeOnSelect={false}
                color=""
                icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
                label="Age"
              >
                <Dropdown.Item  value="Moins d'1 an">Moins d'1 an </Dropdown.Item>
                <Dropdown.Item  value="Entre 1 an et 3 ans">Entre 1 an et 3 ans</Dropdown.Item>
                <Dropdown.Item  value="Entre 3 ans et 6 ans">Entre 3 ans et 6 ans</Dropdown.Item>
                <Dropdown.Item  value="Plus de 6 ans">Plus de 6 ans</Dropdown.Item>
              </Dropdown>
            </div>

            <div className="mx-6">
              <Dropdown
                closeOnSelect={false}
                color=""
                icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
                label="Sexe"
              >
                <Dropdown.Item  value="Tous">Tous</Dropdown.Item>
                <Dropdown.Item  value="Mâle">Mâle</Dropdown.Item>
                <Dropdown.Item  value="Femelle">Femelle</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
      </section>

      <Section className="columns">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
          <AnimalItemList />
          <AnimalItemList />
          <AnimalItemList />
        </Columns.Column>

        <Columns.Column
          id="map"
          mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 6 }}
        >
          <Heading renderAs="h3">Votre position :</Heading>
          {error && <p>Erreur: {error}</p>}
          {location ? (
            <p>
              Latitude: {location.lat}, Longitude: {location.lng}
            </p>
          ) : (
            <p>Recherche de votre position...</p>
          )}

          <MapContainer
            center={mapCenter}  // Centre de la carte sur l'utilisateur (ou position défaut)
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '80vh' }}
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            />

            <Marker position={mapCenter}> {/* Marqueur sur la position de l'utilisateur (ou défaut) */}
              <Popup>
                Utilisateur
                <br />
                <Link to="/profil">Profil user</Link>
              </Popup>
            </Marker>
          </MapContainer>
        </Columns.Column>
      </Section>
    </main>
  );
}

export default TrouverAnimal;
