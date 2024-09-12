import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
import { useModal } from '../../hooks/ModalContext';
import { useParams } from 'react-router-dom';

interface FormData {
  name: string;
  species_id: number;
  sexe: string;
  date_of_birth: string;
  race: string;
  short_story: string;
  long_story: string;
  health: string;
  creator_id: number | null;
}

const EditAnimalProfileForm = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { closeModal } = useModal();
  const { user: connectedUser } = useAuth(); // Récupère les infos du token JWT
  const { id } = useParams<{ id: string }>(); // Récupère l'id de l'animal à éditer

  // Gestion du token CSRF
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null); // Les données du formulaire
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Pour afficher un message d'erreur
  const [loading, setLoading] = useState<boolean>(true); // Gérer l'état de chargement

  
  // Récupère le token CSRF
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/csrf-token');
        setCsrfToken(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  // Charge les données de l'animal à éditer
  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/animals/${id}`);
        const animalData = response.data;
        setFormData({
          name: animalData.name,
          species_id: animalData.species_id,
          sexe: animalData.sexe,
          date_of_birth: animalData.date_of_birth,
          race: animalData.race,
          short_story: animalData.short_story,
          long_story: animalData.long_story,
          health: animalData.health,
          creator_id: connectedUser?.userId || null,
        });
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données de l\'animal:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchAnimalData();
    }
  }, [id, connectedUser]);

  // Gère les changements de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Validation des champs obligatoires
  const validateForm = () => {
    if (!formData?.name || !formData.sexe || !formData.date_of_birth) {
      setErrorMessage('Tous les champs obligatoires doivent être remplis.');
      return false;
    }
    return true;
  };

  // Soumission du formulaire de mise à jour
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      showErrorToast('Le formulaire n\'est pas valide.');
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/api/animals/${id}`,
        formData,
        {
          headers: {
            'x-xsrf-token': csrfToken || '',
          },
        }
      );
      showSuccessToast('Profil de l\'animal mis à jour avec succès !');
      closeModal();
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(`Erreur API: ${error.response.data.message}`);
      } else {
        setErrorMessage('Erreur lors de la soumission, veuillez réessayer.');
      }
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  return (
    <form className="columns is-multiline" onSubmit={handleSubmit}>
      {/* Affichage des erreurs */}
      {errorMessage && (
        <div className="notification is-danger">{errorMessage}</div>
      )}

      <div className="field column is-full">
        <label className="label" htmlFor="name">Nom</label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={formData?.name || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field column is-half-desktop">
        <label className="label" htmlFor="species_id">Espèce</label>
        <div className="control">
          <div className="select">
            <select id="species_id" name="species_id" value={formData?.species_id || 1} onChange={handleChange} required>
              <option value="" disabled>Sélectionnez une espèce</option>
              <option value={1}>Chat</option>
              <option value={2}>Chien</option>
              <option value={3}>Cheval</option>
              <option value={4}>Lapin</option>
              {/* Ajoutez espèces ici */}
            </select>
          </div>
        </div>
      </div>

      <div className="field column is-half-desktop">
        <label className="label" htmlFor="sexe">Sexe</label>
        <div className="control columns">
          <label className="radio">
            <input
              type="radio"
              name="sexe"
              value="M"
              checked={formData?.sexe === 'M'}
              onChange={handleChange}
            />
            Mâle
          </label>
          <label className="radio">
            <input
              type="radio"
              name="sexe"
              value="F"
              checked={formData?.sexe === 'F'}
              onChange={handleChange}
            />
            Femelle
          </label>
        </div>
      </div>

      {/* Date de naissance */}
      <div className="field column is-half-desktop">
        <label className="label" htmlFor="date_of_birth">Date de naissance</label>
        <div className="control">
          <input
            className="input"
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData?.date_of_birth || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field column is-full">
        <div className="control">
          <button className="button is-primary is-fullwidth" type="submit">
            Mettre à jour l'animal
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditAnimalProfileForm;

