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
  userPictures?: {
    id: number;
    URL_picture: string;
    users_id: number;
    created_at: string;
    updated_at: string | null;
  }[] | null;
}

const apiUrl = import.meta.env.VITE_API_URL;
const placeholderImage = "https://placehold.co/600x400?text=Pas+d'image"; 

const GalleryComponent = ({ pictures, userPictures }: IGalleryComponentProps) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  // Paramètres du slider principal (affiche une seule image à la fois)
  const mainSliderSettings: Record<string, any> = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, 
    fade: true, 
    asNavFor: nav2, 
  };

  // Paramètres du slider de navigation (miniatures des images)
  const navSliderSettings: Record<string, any> = {
    slidesToShow: 2, 
    slidesToScroll: 1,
    asNavFor: nav1, 
    dots: true, 
    centerMode: true, 
    focusOnSelect: true, 
    arrows: true, 
    infinite: true, 
  };

  // Utilise "pictures" si disponible, sinon utilise "userPictures"
  const images = pictures ?? userPictures;

  // Si une seule image est disponible, l'affiche directement sans utiliser de slider
  if (images && images.length === 1) {
    const image = images[0];
    const imageSrc = userPictures
      ? `${apiUrl}/img/utilisateurs/${image.URL_picture}` 
      : `${apiUrl}/img/animaux/img750/${image.URL_picture}`; 

    return (
      <div className="single-image">
        <img
          src={imageSrc}
          alt={`Image ${image.id}`}
          loading="lazy" 
          onError={(e) => (e.currentTarget.src = placeholderImage)} 
        />
      </div>
    );
  }

  return (
    <>
      {/* Slider principal */}
      <Slider
        className="mainslider card"
        {...mainSliderSettings}
        ref={(slider: Slider | null) => setNav1(slider)}
      >
        {images?.map((image) => {
          const imageSrc = userPictures
            ? `${apiUrl}/img/utilisateurs/${image.URL_picture}` 
            : `${apiUrl}/img/animaux/img750/${image.URL_picture}`; 

          return (
            <div key={image.id}>
              <img
                src={imageSrc}
                alt={`Image ${image.id}`}
                loading="lazy" 
                onError={(e) => (e.currentTarget.src = placeholderImage)} 
              />
            </div>
          );
        })}
      </Slider>

      {/* Slider de navigation (miniatures) */}
      <Slider
        className="navslider"
        {...navSliderSettings}
        ref={(slider: Slider | null) => setNav2(slider)} // 
      >
        {images?.map((image) => {
          const imageSrc = userPictures
            ? `${apiUrl}/img/utilisateurs/${image.URL_picture}` 
            : `${apiUrl}/img/animaux/img750/${image.URL_picture}`; 

          return (
            <div key={image.id} className="card">
              <img
                src={imageSrc}
                alt={`Thumbnail ${image.id}`}
                loading="lazy" 
                onError={(e) => (e.currentTarget.src = placeholderImage)} // Remplace par l'image de placeholder si l'image n'est pas trouvée
              />
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default GalleryComponent;
