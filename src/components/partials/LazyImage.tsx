interface LazyImageComponentProps {
  src: string;
  alt: string;
  size: number;
}

const LazyImageComponent = ({ src, alt, size }: LazyImageComponentProps) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      width={size} 
      height={size} 
      loading="lazy" // Chargement différé pour les images
    />
  );
};

const LazyImage = () => {
  return (
    <LazyImageComponent src="#" alt="profile picture" size={300} />
  );
};

export default LazyImage;
