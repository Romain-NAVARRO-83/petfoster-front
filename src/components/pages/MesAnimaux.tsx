import React from 'react';
import { Link } from 'react-router-dom';
import AnimalItemList from '../partials/AnimalItemList';
import { Heading, Section, Columns, Container } from 'react-bulma-components';

const MesAnimaux = () => {
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

        {/* Liste des animaux */}
        <Container>
          <Columns className="is-multiline">
            <Columns.Column size={12} className="is-fullwidth">
              <AnimalItemList />
              <AnimalItemList />
              <AnimalItemList />
              <AnimalItemList />
              <AnimalItemList />
            </Columns.Column>
          </Columns>
        </Container>

        {/* Bloc d'information */}
        <Section className="info-block">
          <Heading renderAs="h2">
            Vous souhaitez affiner votre recherche?
          </Heading>
          <Columns className="container">
            <Columns.Column
              mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}
            >
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Debitis facere iure similique cum ab maiores iste quod.
                Temporibus facilis facere enim ad voluptatum! Nihil recusandae,
                iure soluta nam cum explicabo.
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
