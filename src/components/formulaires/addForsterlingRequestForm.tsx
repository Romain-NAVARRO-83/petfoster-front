import React, { useState } from 'react';
import { Form, Button } from 'react-bulma-components';

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
    if (formData.justification.length < 0) { // Exiger au moins 0 caractères
      setError('La justification doit contenir au moins 10 caractères.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur au début

    if (!validateForm()) {
      return; // Si la validation échoue, arrêter ici
    }

    setIsSubmitting(true); // Indiquer que la soumission est en cours

    try {
      // Remplacez l'URL ci-dessous par l'URL de votre API
      const response = await fetch('http://localhost:3000/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envoi des données du formulaire
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue lors de l\'envoi de la demande.');
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
