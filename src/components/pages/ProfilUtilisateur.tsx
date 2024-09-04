import {
  Section,
  Heading,
  Image,
  Button,
  Table,
  Container,
  Columns,
} from 'react-bulma-components';
import { Envelope, Pencil, PlusSmall } from 'react-flaticons';

import { useModal } from '../../hooks/ModalContext';
import FosterlingProfile from '../partials/FosterlingProfile';
// import  LazyImage  from '../partials/LazyImage';
function ProfilUtilisateur() {
  const { openModal } = useModal();

  return (
    <main>
      <div>
        <Heading size={1}>Profil utilisateur</Heading>
      </div>
      <Section>
        <Container>
          <Columns>
            <Columns.Column
              mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}
            >
              {/* < LazyImage src="#" alt="profile picture" size={300} /> */}
              <Image
                src="https://placehold.co/600x400"
                alt="profile picture"
                size={300}
                loading="lazy"
              />
            </Columns.Column>
            <Columns.Column
              mobile={{ size: 12 }}
              tablet={{ size: 12 }}
              desktop={{ size: 6 }}
            >
              <ul>
                <li>Nom</li>
                <li>Prénom</li>
                <li>Email</li>
                <li>Tél</li>
                <li>Pays</li>
                <li>Code postal</li>
                <li>Ville</li>
                <li>Adresse</li>
              </ul>
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading size={2} renderAs="h2">
            Description
          </Heading>
          <Section>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
              recusandae, velit exercitationem corrupti expedita laudantium
              adipisci ea, reprehenderit cupiditate nam aperiam maiores tempore
              qui ducimus rerum molestiae id laboriosam eum.
            </p>
          </Section>
          <Button
            color="primary"
            className="is-pulled-right"
            onClick={() => openModal('contactUser')}
          >
            <Envelope /> contacter
          </Button>
          <Button
            color="primary"
            className="is-pulled-right"
            onClick={() => openModal('editUserProfile')}
          >
            <Pencil /> éditer
          </Button>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading size={2} renderAs="h2">
            Profils d'accueil
          </Heading>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            praesentium sint eos sequi nobis, suscipit aut quisquam enim maxime
            vitae voluptate culpa debitis ea officiis molestias est quia a?
            Sunt.
          </p>
          <Button
            color="primary"
            className="is-pulled-right"
            onClick={() => openModal('addForsterlingProfile')}
          >
            <PlusSmall /> Ajouter
          </Button>
          <Table className="is-fullwidth has-text-centered card">
            <thead>
              <tr>
                <th className="has-text-centered">Espèce</th>
                <th className="has-text-centered">Age</th>
                <th className="has-text-centered">Sexe</th>
                <th className="has-text-centered">Perimètre</th>
                <th className="has-text-right">Contrôle</th>
              </tr>
            </thead>
            <tbody>
              <FosterlingProfile />
              <FosterlingProfile />
              <FosterlingProfile />
              <FosterlingProfile />
            </tbody>
          </Table>
        </Container>
      </Section>
    </main>
  );
}

export default ProfilUtilisateur;
