import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UploadImageFormProps {
  userId: number | null; // Passer l'ID de l'utilisateur comme prop
}

function UploadImageForm({ userId }: UploadImageFormProps) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  // Récupérer le token CSRF
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/csrf-token');
        console.log('Token CSRF:', response.data);
        setCsrfToken(response.data.csrfToken);
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

    if (!image) {
      alert('Veuillez sélectionner une image.');
      return;
    }

    if (!userId) {
      alert('Utilisateur non défini.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post(`http://localhost:3000/api/profiles/${userId}/upload-profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-csrf-token': csrfToken || '',
        },
        withCredentials: true,
      });

      alert('Image téléchargée avec succès');
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image', error);
      alert('Erreur lors du téléchargement de l\'image');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <h3 className="title">Télécharger une image</h3>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit" className="button is-primary is-fullwidth">Télécharger</button>
    </form>
  );
}

export default UploadImageForm;
