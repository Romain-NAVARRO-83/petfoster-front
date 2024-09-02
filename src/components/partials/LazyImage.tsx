import { Image } from "react-bulma-components";
interface LazyImageComponentProps{
    src : string, 
    alt : string,
    size : number
}
 const LazyImageComponent = ({ src, alt, size}:LazyImageComponentProps) => {
    return (
      <Image 
        src={src} 
        alt={alt} 
        size={size} 
        renderAs="img" 
        loading="lazy"
      />
    );
  };

  const LazyImage = () => {
    return (
      <LazyImageComponent src="#" alt="profile picture" size={300} />
    );
  };
  
  export default LazyImage;