import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Heading, Button, Section, Columns, Form } from "react-bulma-components";
const { Field, Label } = Form;
import AnimalItemList from "../partials/AnimalItemList";
import MapComponent from '../partials/MapComponent';
import { useGeolocation } from '../../hooks/GeolocationContext';
import { User } from 'src/@interfaces/user';
import { Animal } from 'src/@interfaces/animal';




function TrouverAnimal() {
const{location} = useGeolocation();
// console.log(location);
  // State to handle form data
  const [formData, setFormData] = useState({
    species: '',
    age: '',
    sexe: '',
    search_area: '10', // Default search area value
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAnimalFIlterSubmit =(e)=>{
    e.preventDefault();
    console.log(formData);
    // formData.species != "" && setAllAnimals
  }

  // Fetch animals
  const [allAnimals, setAllAnimals] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [allSpecies, setAllSpecies] = useState<string[] | []>([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/animals') 
      .then((response) => {
        setAllAnimals(response.data);  
        setLoading(false);   
        console.log(allAnimals);
        // Extract the unique species using a Set
        setAllSpecies( Array.from(new Set(allAnimals.map(newanimal => animal.species.name)))   )
      })
      .catch(() => {
        setFetchError('Error fetching data');  
        setLoading(false);
      });
  }, []);

  // Fetch users
  const [allUsers, setAllUsers] = useState<User[] | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [fetchUsersError, setFetchUsersError] = useState<string | null>(null);
  const [foundUsersAnimals, setFoundUsersAnimals] = useState<Animal[] | null>(null)
  useEffect(() => {
    setFoundUsersAnimals(allUsers?.flatMap(user => user.userAnimals.map(userAnimal => userAnimal.animal)));
    
  }, [allUsers]);
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users?perimeter=500000&latitude=${location?.lat}&longitude=${location?.lng}`) 
      .then((response) => {
        setAllUsers(response.data);  
        setLoadingUsers(false);   
        console.log("found user "+ allUsers);    
      })
      .catch(() => {
        setFetchUsersError('Error fetching data');  
        setLoadingUsers(false);
      });
  }, []);



  // Déploiement des filtres
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  // Handler du toggle des filtres
  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);  // Toggle the clicked state
  };

  return (
    
    <main>
      <div>
        <Heading>Trouver un animal</Heading>
      </div>
{JSON.stringify(foundUsersAnimals)}
      <Section className="columns">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 6 }} className="animal-list">
        {foundUsersAnimals && foundUsersAnimals
  .filter((item: any) => 
    (formData.species === "" || item.species.name === formData.species) &&  // Filter par espece si espece !=""
    (formData.sexe === "" || item.sexe === formData.sexe)  // Filter par sexe si sexe !=""
  )
  .map((item: any) => (
    <AnimalItemList animal={item} key={item.id} />
  ))}
        </Columns.Column>

        <Columns.Column
          id="map"
          mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 6 }}
          
        >
          <MapComponent users={allUsers} />
        </Columns.Column>
      </Section>

      <Section id="animal-filter" className={filterOpen ? "open" : ""}>
        <Button onClick={handleFilterOpen} className='is-ghost is-fullwidth'>
        <Heading renderAs="h2">
          {filterOpen ? "Cacher les filtres" : "Afficher les filtres"}
        </Heading>
        </Button>
        
        <form>
          <Columns className="container">
            <Columns.Column>
              <Field>
                <Label htmlFor="species-dropdown">Espèce</Label>
                <select name="species" value={formData.species} onChange={handleChange}>
                  <option value="">Toutes</option>
                  {/* {allSpecies.map((species) => (
                    <option value={species}>{species}</option>
                  ))} */}
                  <option value="Chat">Chat</option>
                  <option value="Chien">Chien</option>
                  <option value="Cheval">Cheval</option>
                  <option value="Lapin">Lapin</option>
                  <option value="Cochon d'Inde">Cochon d'Inde</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Furet">Furet</option>
                  <option value="Oiseau">Oiseau</option>
                  <option value="Serpent">Serpent</option>
                  <option value="Lézard">Lézard</option>
                  <option value="Tortue">Tortue</option>
                  <option value="Rat">Rat</option>
                </select>
              </Field>
            </Columns.Column>

            <Columns.Column>
              <Field>
                <Label htmlFor="age-dropdown">Age</Label>
                <select name="age" value={formData.age} onChange={handleChange}>
                  <option value="">- de 1 an</option>
                  <option value="1-3 ans">entre 1 et 3 ans</option>
                  <option value="3-5 ans">entre 3 et 5 ans</option>
                  <option value="+ de 5 ans">+ de 5 ans</option>
                </select>
              </Field>
            </Columns.Column>

            <Columns.Column>
              <Field>
                <Label htmlFor="sexe-dropdown">Sexe</Label>
                <select name="sexe" value={formData.sexe} onChange={handleChange}>
                  <option value="">Indifférent</option>
                  <option value="M">Mâle</option>
                  <option value="F">Femelle</option>
                </select>
              </Field>
            </Columns.Column>

            <Columns.Column>
              <Field>
                <Label>Périmètre</Label>
                <input
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
            <Columns.Column narrow>
            <Button type="submit" color="primary" onClick={handleAnimalFIlterSubmit}>Ok</Button>
            </Columns.Column>
          </Columns>
          
        </form>
      </Section>
    </main>
  );
}

export default TrouverAnimal;
