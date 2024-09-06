import React, { useState, useEffect } from 'react';
import { Button, Box, Heading, Section, Columns, Container, Table } from 'react-bulma-components';
import { Envelope, Pencil, PlusSmall } from 'react-flaticons';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useModal } from '../../hooks/ModalContext';
import FosterlingProfile from '../partials/FosterlingProfile'; // Profils d'accueil dynamique

function ProfilUtilisateur() {
  const { openModal } = useModal();
  const { id } = useParams(); // Récupérer l'ID de l'utilisateur à partir de l'URL
  const [user, setUser] = useState(null); // Stocker les données de l'utilisateur
  const [fosterlingProfiles, setFosterlingProfiles] = useState([]); // Stocker les profils d'accueil
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur

  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  // Configuration des sliders
  const mainSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: nav2,
  };

  const navSliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
  };

  // Récupérer les données de l'utilisateur et des profils d'accueil depuis l'API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/api/users/${id}`);
        setUser(userResponse.data);
        
        const fosterlingResponse = await axios.get(`http://localhost:3000/api/users/${id}/fosterlings`);
        setFosterlingProfiles(fosterlingResponse.data); // Charger les profils d'accueil
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <div>
        <Heading size={1}>Profil utilisateur</Heading>
      </div>

      <Section>
        <Container>
          <Columns>
            <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
              {/* Main Slider */}
              <Slider {...mainSliderSettings} ref={(slider) => setNav1(slider)}>
                {user && user.images && user.images.map((image, index) => (
                  <div key={index}>
                    <img src={image.url} alt={`Slide ${index + 1}`} loading="lazy" />
                  </div>
                ))}
              </Slider>

              {/* Navigation Slider (Thumbnails) */}
              <Slider {...navSliderSettings} ref={(slider) => setNav2(slider)}>
                {user && user.images && user.images.map((image, index) => (
                  <div key={index}>
                    <img src={image.thumbnail} alt={`Thumb ${index + 1}`} loading="lazy" />
                  </div>
                ))}
              </Slider>
            </Columns.Column>

            <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
              <ul>
                <li><strong>Nom:</strong> {user.name}</li>
                <li><strong>Prénom:</strong> {user.first_name}</li>
                <li><strong>Email:</strong> {user.email}</li>
                <li><strong>Tél:</strong> {user.phone}</li>
                <li><strong>Pays:</strong> {user.country}</li>
                <li><strong>Code postal:</strong> {user.zipcode}</li>
                <li><strong>Ville:</strong> {user.city}</li>
                <li><strong>Adresse:</strong> {user.address}</li>
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
            <p>{user.description}</p>
          </Section>

          <Button color="primary" className="is-pulled-right" onClick={() => openModal('contactUser')}>
            <Envelope /> Contacter
          </Button>

          <Button color="primary" className="is-pulled-right" onClick={() => openModal('editUserProfile')}>
            <Pencil /> Éditer
          </Button>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading size={2} renderAs="h2">
            Profils d'accueil
          </Heading>
          <p>{user.fosterlingDescription}</p>

          <Button color="primary" className="is-pulled-right" onClick={() => openModal('addFosterlingProfile')}>
            <PlusSmall /> Ajouter
          </Button>

          <Table className="is-fullwidth has-text-centered card">
            <thead>
              <tr>
                <th className="has-text-centered">Espèce</th>
                <th className="has-text-centered">Âge</th>
                <th className="has-text-centered">Sexe</th>
                <th className="has-text-centered">Périmètre</th>
                <th className="has-text-right">Contrôle</th>
              </tr>
            </thead>
            <tbody>
              {fosterlingProfiles.map((profile) => (
                <FosterlingProfile key={profile.id} profile={profile} />
              ))}
            </tbody>
          </Table>
        </Container>
      </Section>
    </main>
  );
}

export default ProfilUtilisateur;

