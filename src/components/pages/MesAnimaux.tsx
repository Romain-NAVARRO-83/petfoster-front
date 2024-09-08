
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AnimalItemList from '../partials/AnimalItemList';
import { Heading, Section, Columns, Container } from 'react-bulma-components';

const MesAnimaux = () => {
  // État pour stocker les animaux
  const [myAnimals, setMyAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Récupérer les animaux de l'utilisateur
  useEffect(() => {

    axios
      .get('http://localhost:3000/api/my-animals')  // Remplacez l'URL par l'API correcte pour récupérer les animaux de l'utilisateur
      .then((response) => {
        setMyAnimals(response.data);  // Stocke les animaux dans le state
        setLoading(false);            // Désactiver le chargement une fois les données reçues
      })

      .catch(() => {

        setFetchError('Erreur lors de la récupération des données.');
        setLoading(false); // Désactiver le chargement même en cas d'erreur
      });

  }, []);

  return (

    <>

      {/* Section principale */}
      <main>

        <div>
          <Heading className="has-text-centered">Mes animaux</Heading>
        </div>

        {/* Section de création de profil */}
        <section className="section">

          <div className="has-text-centered">

            <button className="button is-primary is-pulled-right is-rounded is-large">
              Créer le profil de mon animal
            </button>

          </div>

        </section>

        {/* Gérer les états de chargement et d'erreur */}
        {loading ? (
          <p>Chargement...</p>
        ) : fetchError ? (

          <p>{fetchError}</p>

        ) : (
          <Container>

            <Columns className="is-multiline">

              {myAnimals.length > 0 ? (

                myAnimals.map((animal: any) => (

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
