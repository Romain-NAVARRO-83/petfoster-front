import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bulma-components';
import axios from 'axios'; // Utiliser Axios comme dans ContactUserForm

const { Field, Label, Textarea } = Form;

interface FosterlingRequestFormProps {
  closeAdoptionModal: () => void; // Fonction pour fermer la modal
}

const FosterlingRequestForm: React.FC<FosterlingRequestFormProps> = ({ closeAdoptionModal }) => {
  const [formData, setFormData] = useState({
    justification: '',
  });

  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs de validation
  const [isSubmitting, setIsSubmitting] = useState(false); // Pour indiquer si la soumission est en cours
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Pour afficher un message de succès
  const [csrfToken, setCsrfToken] = useState<string | null>(null); // CSRF Token

  // Récupérer le token CSRF pour la requête sécurisée
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

  // Gestion du changement dans le textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation de la justification
  const validateForm = () => {
    if (formData.justification.length < 0) { 
      setError('La justification doit contenir au moins 0 caractères.');
      return false;
    }
    return true;
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur au début

    if (!validateForm()) {
      return; // Si la validation échoue, arrêter ici
    }

    setIsSubmitting(true); // Indiquer que la soumission est en cours

    try {
      // Envoi des données à l'API
      const response = await axios.post('http://localhost:3000/api/requests', formData, {
        headers: {
          'x-xsrf-token': csrfToken || '', // Inclure le token CSRF dans les headers
          'Content-Type': 'application/json',
        },
      });

      if (!response.status.toString().startsWith("2")) {
        throw new Error('Une erreur est survenue lors de l\'envoi de la demande.');
      }

      // Si la soumission est un succès
      setSuccessMessage('Votre demande a été envoyée avec succès.');
      setTimeout(() => {
        closeAdoptionModal(); // Fermer la modal après un petit délai
      }, 2000); // Fermer après 2 secondes pour laisser le temps de lire le message
    } catch (error: any) {
      setError(error.message || "Une erreur s'est produite lors de l'envoi de la demande.");
      console.error('Erreur lors de la soumission du formulaire', error);
    } finally {
      setIsSubmitting(false); // Réinitialiser l'état de soumission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="justification">Justification</Label>
        <div className="control">
          <Textarea
            className="textarea"
            id="justification"
            name="justification"
            aria-label="Justification pour adopter un animal"
            placeholder="Pourquoi souhaitez-vous adopter cet animal ?"
            required
            value={formData.justification}
            onChange={handleChange}
            disabled={isSubmitting} // Désactiver le champ si en cours de soumission
          />
        </div>
      </Field>

      {error && <p className="help is-danger">{error}</p>} {/* Message d'erreur si validation échoue */}
      {successMessage && <p className="help is-success">{successMessage}</p>} {/* Message de succès */}

      <Field>
        <div className="control">
          <Button color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Valider la demande'} {/* Changement de texte pendant l'envoi */}
          </Button>
        </div>
      </Field>
    </form>
  );
};

export default FosterlingRequestForm;

