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
    if (formData.justification.length < 0) {
      setError('La justification doit contenir au moins 0 caractères.');
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
      // Simuler l'envoi des données à une API (remplacez cela par une requête réelle)
      console.log(formData);

      // Si la soumission est un succès
      setSuccessMessage('Votre demande a été envoyée avec succès.');
      setTimeout(() => {
        closeAdoptionModal(); // Fermer la modal après un petit délai
      }, 2000); // Fermer après 2 secondes pour laisser le temps de lire le message
    } 
    catch (error) {
      setError("Une erreur s'est produite lors de l'envoi de la demande.");
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




// ancien
/* import React, { useState } from 'react';
import { Form, Button } from 'react-bulma-components';

const { Field, Label, Textarea } = Form;

interface FosterlingRequestFormProps {
  closeAdoptionModal: () => void; // Function to close the modal
}

const FosterlingRequestForm: React.FC<FosterlingRequestFormProps> = ({ closeAdoptionModal }) => {
  const [formData, setFormData] = useState({
    justification: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send the data to an API
    console.log(formData);

    // Close the modal after form submission
    closeAdoptionModal();
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
            placeholder="Pourquoi souhaitez-vous adopter cet animal ?"
            required
            value={formData.justification}
            onChange={handleChange}
          />
        </div>
      </Field>

      <Field>
        <div className="control">
          <Button color="primary" type="submit">
            Valider la demande
          </Button>
        </div>
      </Field>
    </form>
  );
};

export default FosterlingRequestForm;*/