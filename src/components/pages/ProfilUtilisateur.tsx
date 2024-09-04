import React, { useState } from 'react';

import { Section, Heading, Image, Button, Table, Container, Columns } from 'react-bulma-components';
import { Envelope, Pencil, PlusSmall } from 'react-flaticons';
import Slider from 'react-slick';

import { useModal } from '../../hooks/ModalContext';
import FosterlingProfile from '../partials/FosterlingProfile';
// import  LazyImage  from '../partials/LazyImage';
  // Configuration de la galerie d'images

  
function ProfilUtilisateur() {
  const { openModal } = useModal();
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

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
        desktop={{ size: 6 }}>

          {/* Main Slider */}
      <Slider {...mainSliderSettings} ref={(slider: Slider | null) => setNav1(slider)}>
        <div>
          <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 1" loading="lazy"/>
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400?text=Slide+2" alt="Slide 2" loading="lazy"/>
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400?text=Slide+3" alt="Slide 3" loading="lazy"/>
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400?text=Slide+4" alt="Slide 4" loading="lazy"/>
        </div>
      </Slider>

      {/* Navigation Slider (Thumbnails) */}
      <Slider {...navSliderSettings} ref={(slider: Slider | null) => setNav2(slider)}>
        <div>
          <img src="https://via.placeholder.com/150x100?text=Thumb+1" alt="Thumb 1" loading="lazy"/>
        </div>
        <div>
          <img src="https://via.placeholder.com/150x100?text=Thumb+2" alt="Thumb 2" loading="lazy"/>
        </div>
        <div>
          <img src="https://via.placeholder.com/150x100?text=Thumb+3" alt="Thumb 3" loading="lazy"/>
        </div>
        <div>
          <img src="https://via.placeholder.com/150x100?text=Thumb+4" alt="Thumb 4" loading="lazy"/>
        </div>
      </Slider>


        </Columns.Column >
        <Columns.Column 
        mobile={{ size: 12 }} 
        tablet={{ size: 12 }} 
        desktop={{ size: 6 }}>
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
        < Container >
        <Heading size={2} renderAs='h2'>Description</Heading>
        <Section>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi recusandae, velit exercitationem corrupti
            expedita laudantium adipisci ea, reprehenderit cupiditate nam aperiam maiores tempore qui ducimus rerum
            molestiae id laboriosam eum.
          </p>
        </Section>
        <Button 
  color="primary" 
  className="is-pulled-right" 
  onClick={() => openModal('contactUser')} 
>
          < Envelope /> contacter
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
        <Heading size={2} renderAs='h2'>Profils d'accueil</Heading>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus praesentium sint eos sequi nobis, suscipit aut quisquam enim maxime vitae voluptate culpa debitis ea officiis molestias est quia a? Sunt.</p>
        <Button 
  color="primary" 
  className="is-pulled-right" 
  onClick={() => openModal('addForsterlingProfile')} 
>
          < PlusSmall /> Ajouter
        </Button>
        <Table className='is-fullwidth has-text-centered card'>
          <thead >
            <tr>
              <th className='has-text-centered'>Espèce</th>
              <th className='has-text-centered'>Age</th>
              <th className='has-text-centered'>Sexe</th>
              <th className='has-text-centered'>Perimètre</th>
              <th className='has-text-right'>Contrôle</th>
            </tr>
          </thead>
          <tbody>
            < FosterlingProfile />
            < FosterlingProfile />
            < FosterlingProfile />
            < FosterlingProfile />
          </tbody>
        </Table>
        </Container>
      </Section>
      
        </main>
    )
  }
  
  export default ProfilUtilisateur;