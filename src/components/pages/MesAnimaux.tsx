import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AnimalItemList from '../partials/AnimalItemList';
import { Heading, Section, Columns, Container } from 'react-bulma-components';
import { useModal } from '../../hooks/ModalContext';
import { useAuth } from '../../hooks/AuthContext';
import { PlusSmall } from 'react-flaticons';

const MesAnimaux = () => {
  // State pour stocker les animaux (du user)
  const [myUser, setMyUser] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { openModal } = useModal();
  const { user: connectedUser } = useAuth(); 

  // Récupérer les animaux de l'utilisateur
  useEffect(() => {

    console.log('Connected user:', connectedUser);
    
    if (connectedUser) {
      axios
        .get(`http://localhost:3000/api/users/${connectedUser.userId}`) 
        .then((response) => {
          console.log('Animals data:', response.data); 
          setMyUser(response.data);  
          setLoading(false);            
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setFetchError('Erreur lors de la récupération des données.');
          setLoading(false); 
        });
    } else {
      setLoading(false); 
    }
  }, [connectedUser]);  

  return (
    <>
   
      <main>
        <div>
          <h1 className="title">Mes animaux</h1>
        </div>


        <section className="section">
          <div className="has-text-centered">
            {connectedUser && (
              <button
                className="button is-primary is-pulled-right"
                onClick={() => openModal('createAnimal')}
              >
                <PlusSmall /> Enregistrer un animal
              </button>
            )}
          </div>
        </section>


        {loading ? (
          <p>Chargement...</p>
        ) : fetchError ? (
          <p>{fetchError}</p>
        ) : (
          <Container>
            <Columns className="is-multiline">
            <p>
            Problème : il faut récupérer les animaux créés par l'user ainsi que ceux hébérgés par l'user.
            </p>
            {/* {JSON.stringify(myUser)} */}
              {myUser.userAnimals.length > 0 ? (
                myUser.userAnimals.map((animal: any) => (
                  <Columns.Column size={12} className="is-fullwidth" key={animal.id}>
                    <AnimalItemList animal={animal} />
                  </Columns.Column>
                ))
              ) : (
                <p>Vous n'avez pas encore ajouté d'animaux.</p>
              )}
            </Columns>
          </Container>
        )}

        {/* Bloc d'information */}
        <Section className="info-block">
          <Heading renderAs="h2">Vous souhaitez affiner votre recherche?</Heading>
          <Columns className="container">
            <Columns.Column
              mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
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
              <Link className="is-primary button" to="/trouver-animal">
                Voir les animaux
              </Link>
            </Columns.Column>
          </Columns>
        </Section>
      </main>
    </>
  );
};

export default MesAnimaux;
