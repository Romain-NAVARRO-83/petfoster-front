import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UploadImageFormProps {
  userId: number | null; // L'ID de l'utilisateur connecté
  fetchUserImages: () => void; // Fonction pour recharger les images après upload
}

function UploadImageForm({ userId, fetchUserImages }: UploadImageFormProps) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  // Récupérer le token CSRF
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/csrf-token');
        setCsrfToken(response.data.csrfToken || response.data); 
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image || !userId || !csrfToken) {
      alert('Tous les champs doivent être remplis.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post(
        `http://localhost:3000/api/profiles/${userId}/upload-profile-picture`,
        formData,
        {
          headers: {
            'x-csrf-token': csrfToken,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      alert('Image téléchargée avec succès');
      fetchUserImages(); // Recharger les images après l'upload
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image', error);
      alert('Erreur lors du téléchargement de l\'image');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit" className="button is-primary is-fullwidth">Télécharger</button>
    </form>
  );
}

export default UploadImageForm;

