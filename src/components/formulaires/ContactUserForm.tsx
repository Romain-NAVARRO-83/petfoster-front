import { useState } from 'react';
import { Form, Button, Heading } from 'react-bulma-components';

// Définition du type de données du formulaire
interface FormData {
  messageContent: string;
}

const { Field, Label, Textarea } = Form;

const ContactUserForm = () => {
  // Utilisation de l'interface pour typer l'état 'formData'
  const [formData, setFormData] = useState<FormData>({
    messageContent: '', // Initialisation avec une chaîne vide
  });

  const [errors, setErrors] = useState<{ messageContent?: string }>({});

  // État pour indiquer si le formulaire est en cours de soumission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction de gestion des changements de champs
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Copie de l'état actuel
      [name]: value, // Mise à jour de la valeur du champ modifié
    });
  };

  // Fonction de validation du formulaire
  const validateForm = () => {
    let newErrors: { messageContent?: string } = {};

    // Vérification si le message est vide ou trop court
    if (!formData.messageContent.trim()) {
      newErrors.messageContent = 'Le message ne peut pas être vide.'; 
    } else if (formData.messageContent.length < 10) {
      newErrors.messageContent = 'Le message doit contenir au moins 10 caractères.';
    }

    return newErrors; 
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const formErrors = validateForm(); 

    // Si des erreurs existent, on les affiche
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Indication de soumission en cours
    setIsSubmitting(true);

    try {

      console.log(formData);

      // Réinitialise le champ après l'envoi réussi
      setFormData({ messageContent: '' });
    } catch (error) {
      console.error('Une erreur est survenue', error);
    } finally {
      // Fin de la soumission
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <Heading renderAs='h3'>Contacter (nomUtilisateur)</Heading>

      {/* Champ du formulaire */}
      <Field>
        <Label>Message</Label>
        <Textarea
          placeholder="Votre message..."
          value={formData.messageContent} 
          onChange={handleChange} // Appelle handleChange à chaque modification
          className="textarea"
          name="messageContent"
          aria-label="Message"
        />
        
        {errors.messageContent && (
          <p className="help is-danger">{errors.messageContent}</p>
        )}
      </Field>

      {/* Bouton de soumission */}
      <Button color="primary" type="submit" disabled={isSubmitting} className='is-fullwidth'>
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
      </Button>
    </form>
  );
};

export default ContactUserForm;