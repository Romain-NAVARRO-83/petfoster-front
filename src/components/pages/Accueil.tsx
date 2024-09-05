import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import {
  Heading,
  Container,
  Columns,
  Section,
} from 'react-bulma-components';
import AnimalItemList from '../partials/AnimalItemList';
import { Link } from 'react-router-dom';

import { useGeolocation } from "../../hooks/GeolocationContext";


const defaultPosition: LatLngExpression = [43.3365, 1.3396];

// Icône personnalisée pour l'utilisateur
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
      <Container className="info-block">
        <Heading renderAs="h2">
          {allAnimals?.length} animaux et {allUsers?.length} associations dans votre secteur
        </Heading>
      </Container>
      <Columns>
        <Columns.Column
          mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 8 }}
          id="home-map-container"
        >
          <MapContainer
            center={defaultPosition}
            zoom={7}
            scrollWheelZoom={false}
            style={{ height: '80vh', zIndex: 1 }}
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            />
  {/* marqueur de la position de l'user */}
  <Marker position={mapCenter} icon={userIcon}> {/* Marqueur sur la position de l'utilisateur (ou défaut) */}
              <Popup>
                Votre position
              </Popup>
            </Marker>


            {/* Marquers des utilisateurs */}
{allUsers && allUsers.map((user: any) => (
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
        </Columns.Column>
        <Columns.Column
          mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 4 }}
          className="animal-list"
        >
           {allAnimals && allAnimals.map((item: any) => (
          <AnimalItemList animal={item}/>
        ))}
        </Columns.Column>
      </Columns>
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
