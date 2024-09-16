import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserImagesProps {
  userId: number;
}

function UserImages({ userId }: UserImagesProps) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchUserImages();
  }, [userId]);

  const fetchUserImages = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}/pictures`);
      setImages(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des images', error);
    }
  };

  const handleProfilePictureChange = async (image: string) => {
    try {
      await axios.post(
        `http://localhost:3000/api/users/${userId}/set-profile-picture`,
        { image }, // Envoyer l'URL de l'image sélectionnée
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSelectedImage(image);
      alert('Image de profil mise à jour avec succès');
    } catch (error) {
      console.error('Erreur lors du changement d\'image de profil', error);
      alert('Erreur lors du changement d\'image de profil');
    }
  };

  return (
    <div>
      <h3>Choisissez une image comme image de profil</h3>
      <div className="image-gallery">
        {images.map((image) => (
          <div key={image} className="image-item">
            <img src={`/img/utilisateurs/${image}`} alt="User uploaded" />
            <button
              className="button is-primary"
              onClick={() => handleProfilePictureChange(image)}
            >
              Choisir cette image
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserImages;
