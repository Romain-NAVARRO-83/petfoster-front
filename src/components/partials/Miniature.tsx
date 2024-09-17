import { useState, useEffect } from "react";
import { Animal } from "src/@interfaces/animal";
import axios from "axios";

interface IMiniatureAnimlProps {
  animal: Animal | null;
}

interface Picture {
  URL_picture: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

export default function MiniatureAnimal({ animal }: IMiniatureAnimlProps) {
  const [pictures, setPictures] = useState<Picture[] | null>(null);

  // Fetch animal pictures
  useEffect(() => {
    const fetchAnimalData = async () => {
      if (!animal?.id) return; // Ensure we have a valid animal id before making the request
      try {
        const animalResponse = await axios.get(
          `http://localhost:3000/api/animals/${animal.id}`
        );
        setPictures(animalResponse.data.pictures);
      } catch (error: any) {
        console.error('Erreur lors de la récupération des données de l\'animal:', error);
      }
    };

    fetchAnimalData(); 
  }, [animal?.id]); 


  const placeholderImage = "https://placehold.co/64x64?text=Pas+d'image";

  return (
    <div className="animal-miniature is-narrow column has-text-centered">
      {pictures && pictures.length > 0 ? (
        <img
          src={`${apiUrl}/img/animaux/img-120/${pictures[0].URL_picture}`}
          alt={animal?.name}
          width="64"
          height="64"
          loading="lazy"
          onError={(e) => {
            // Replace image source with the placeholder when there's an error (e.g., 404)
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />
      ) : (
        <img src={placeholderImage} alt={`Image de ${animal?.name} manquante`} />
      )}
    </div>
  );
}
