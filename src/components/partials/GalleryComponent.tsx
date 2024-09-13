import { useState } from 'react';
import Slider from 'react-slick';
import '../../assets/css/gallery.css';

interface IGalleryComponentProps {
  pictures: {
    id: number;
    URL_picture: string;
    animals_id: number;
    created_at: string;
    updated_at: string | null; 
  }[] | null;
  userPictures: {
    id: number;
    URL_picture: string;
    users_id: number;
    created_at: string;
    updated_at: string | null;
  }[] | null;
}

const GalleryComponent = ({ pictures, userPictures }: IGalleryComponentProps) => {

  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);


  const mainSliderSettings: Record<string, any> = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: nav2, 
  };


  const navSliderSettings: Record<string, any> = {
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    navigation: true,
    arrows: true,
    infinite:false

  };

  // Utiliser "pictures" si disponible, sinon utiliser "userPictures"
  const images = pictures ?? userPictures;

  // Si une seule image, afficher l'image sans slider
  if (images && images.length === 1) {
    const image = images[0];
    const imageSrc = userPictures
      ? `/img/utilisateurs/${image.URL_picture}` // Chemin pour les images des utilisateurs
      : `/img/animaux/${image.URL_picture}`; // Chemin pour les images des animaux

    return (
      <div className="single-image">
        <img src={imageSrc} alt={`Image ${image.id}`} loading="lazy" />
      </div>
    );
  }

  return (
    <>
      {/* Slider principal */}
      <Slider
        className="mainslider card"
        {...mainSliderSettings}
        ref={(slider: Slider | null) => setNav1(slider)} // Référence du slider principal
      >
        {images?.map((image) => {
          const imageSrc = userPictures
            ? `/img/utilisateurs/${image.URL_picture}` // Chemin pour les utilisateurs
            : `/img/animaux/${image.URL_picture}`; // Chemin pour les animaux

          return (
            <div key={image.id}>
              <img
                src={imageSrc}
                alt={`Image ${image.id}`}
                loading="lazy"
              />
            </div>
          );
        })}
      </Slider>

      {/* Slider de navigation (miniatures) */}
      <Slider
        className="navslider"
        {...navSliderSettings}
        ref={(slider: Slider | null) => setNav2(slider)} // Référence du slider de navigation
      >
        {images?.map((image) => {
          const imageSrc = userPictures
            ? `/img/utilisateurs/${image.URL_picture}` // Chemin pour les utilisateurs
            : `/img/animaux/${image.URL_picture}`; // Chemin pour les animaux

          return (
            <div key={image.id} className="card">
              <img
                src={imageSrc}
                alt={`Thumbnail ${image.id}`}
                loading="lazy"
              />
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default GalleryComponent;
