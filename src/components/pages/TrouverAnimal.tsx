import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Heading, Dropdown, Icon, Button, Section, Columns, Form } from "react-bulma-components";
const { Field, Label, Input } = Form;
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon as LeafletIcon } from 'leaflet';
import AnimalItemList from "../partials/AnimalItemList";
import { Link } from 'react-router-dom';
import { useGeolocation } from "../../hooks/GeolocationContext";

// Position par défaut
const defaultPosition: LatLngExpression = [43.3365, 1.3396];

// Icône personnalisée pour l'utilisateur
const userIcon = new LeafletIcon({
  iconUrl: '/img/vector/your-position-marker.svg', // URL de l'image personnalisée pour l'utilisateur
  iconSize: [25, 41],  // Taille du marqueur
  iconAnchor: [12, 41], // Position de l'ancre (la pointe du marqueur)
  popupAnchor: [1, -34], // Position du popup par rapport au marqueur
});

function TrouverAnimal() {
  const { location, error } = useGeolocation();

  // Utiliser la position de l'utilisateur (ou celle par défaut)
  const mapCenter: LatLngExpression = location ? [location.lat, location.lng] : defaultPosition;

  // State to handle form data
  const [formData, setFormData] = useState({
    species: '',
    age: '',
    sexe: '',
    search_area: '10', // Default search area value
  });

  // State to handle filter toggle
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Function to toggle the filter open/close state
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch animals
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

  // Fetch users
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
      <div>
        <Heading>Trouver un animal</Heading>
      </div>

      <Section className="columns">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
          {allAnimals && allAnimals.map((item: any) => (
            <AnimalItemList animal={item} key={item.id} />
          ))}
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
      </Section>

      <Section id="animal-filter" className={isFilterOpen ? 'open' : ''}> 
        <Button className="is-secondary is-fullwidth" id="filter-toggler" onClick={toggleFilter}>
          Affinez votre recherche
        </Button>
        <form>
          <Columns className="container">
            <Columns.Column>
              <Field> 
                <Label htmlFor="species-dropdown">Espèce</Label>
                <Dropdown
                  id="species-dropdown"
                  closeOnSelect={false}
                  icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
                  label="Espèce"
                >
                  <Dropdown.Item value="Toutes">Toutes</Dropdown.Item>
                  <Dropdown.Item value="chien">Chien</Dropdown.Item>
                  <Dropdown.Item value="Chat">Chat</Dropdown.Item>
                </Dropdown>
              </Field>
            </Columns.Column>
            <Columns.Column>
              <Field> 
                <Label htmlFor="age-dropdown">Age</Label>
                <Dropdown
                  id="age-dropdown"
                  closeOnSelect={false}
                  icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
                  label="Age"
                >
                  <Dropdown.Item value="#">- de 1 an</Dropdown.Item>
                  <Dropdown.Item value="#">entre 1 et 3 ans</Dropdown.Item>
                  <Dropdown.Item value="#">entre 3 et 5 ans</Dropdown.Item>
                  <Dropdown.Item value="#">+ de 5 ans</Dropdown.Item>
                </Dropdown>
              </Field>
            </Columns.Column>
            <Columns.Column>
              <Field> 
                <Label htmlFor="sexe-dropdown">Sexe</Label>
                <Dropdown
                  id="sexe-dropdown"
                  closeOnSelect={false}
                  icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
                  label="Sexe"
                >
                  <Dropdown.Item value="#">Indifférent</Dropdown.Item>
                  <Dropdown.Item value="#">Mâle</Dropdown.Item>
                  <Dropdown.Item value="#">Femelle</Dropdown.Item>
                  <Dropdown.Item value="#">Fabulous</Dropdown.Item>
                </Dropdown>
              </Field>
            </Columns.Column>
            <Columns.Column>
              <Field>
                <Label>Périmètre</Label>
                <Input
                  type="range"
                  name="search_area"
                  value={formData.search_area}
                  onChange={handleChange}
                  min="10"
                  max="200"
                />
                <p>Périmètre : {formData.search_area} Km</p>
              </Field>
            </Columns.Column>
          </Columns>
        </form>
      </Section>
    </main>
  );
}

export default TrouverAnimal;
