import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../../assets/css/gallery.css'
interface IGalleryComponentProps {
  pictures: {
    id: number;
    URL_picture: string;
    animals_id: number;
    created_at: string;
    updated_at: string;
  }[];
}
const GalleryComponent = ({pictures}:IGalleryComponentProps) => {
  // Configuration du slider
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
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: nav1,
  dots: true,
  centerMode: true,
  focusOnSelect: true,
  navigation: true,
  arrows: true
};
  return (
    <>
      {/* Main Slider */}
       <Slider className='mainslider card'
                {...mainSliderSettings}
                ref={(slider: Slider | null) => setNav1(slider)}
              >
                {pictures.map((picture) => (
                <div key={picture.id} >
                  <img
                        src={`/img/animaux/${picture.URL_picture}`}
                        alt="alt TODO"
                        loading="lazy"
                  />
                </div>
                ))}
              </Slider>

              {/* Navigation Slider (Thumbnails) */}
              <Slider className='navslider'
                {...navSliderSettings}
                ref={(slider: Slider | null) => setNav2(slider)}
              >
                {pictures.map((picture) => (
                <div key={picture.id} className='card'>
                  <img
                        src={`/img/animaux/${picture.URL_picture}`}
                        alt="alt TODO"
                        loading="lazy"
                  />
                </div>
                ))}
                
              </Slider>
    </>
  );
};

export default GalleryComponent;
