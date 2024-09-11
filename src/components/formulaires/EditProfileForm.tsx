import { useState } from 'react';
import { Form, Button, Columns, Notification, Heading } from 'react-bulma-components';

const { Field, Control, Input, Label } = Form;

// Définition de l'interface pour typer l'objet formData
interface FormData {
  nom: string;
  tel: string;
  pays: string;
  codePostal: string;
  ville: string;
  adresse: string;
}

const EditProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    tel: '',
    pays: '',
    codePostal: '',
    ville: '',
    adresse: ''
  });

  // État pour gérer les erreurs de validation
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // État pour savoir si le formulaire est en cours de soumission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État pour afficher un message de succès après soumission
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fonction de validation pour les champs du formulaire
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    // Validation du champ nom
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est obligatoire';
    }

    // Validation du champ téléphone
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!formData.tel.trim()) {
      newErrors.tel = 'Le téléphone est obligatoire';
    } else if (!phoneRegex.test(formData.tel)) {
      newErrors.tel = 'Le numéro de téléphone n\'est pas valide';
    }

    // Validation du champ pays
    if (!formData.pays.trim()) {
      newErrors.pays = 'Le pays est obligatoire';
    }

    // Validation du champ code postal
    if (!formData.codePostal.trim()) {
      newErrors.codePostal = 'Le code postal est obligatoire';
    } else if (isNaN(Number(formData.codePostal))) {
      newErrors.codePostal = 'Le code postal doit être un nombre';
    }

    // Validation du champ ville
    if (!formData.ville.trim()) {
      newErrors.ville = 'La ville est obligatoire';
    }

    return newErrors;
  };

  // Fonction appelée à chaque changement de champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Si tout est valide, on peut soumettre le formulaire
    setIsSubmitting(true);

    try {
      // Simulation de l'envoi des données à une API
      console.log('Données soumises : ', formData);

      // Après la soumission, afficher un message de succès
      setSuccessMessage('Profil mis à jour avec succès.');

      // Réinitialiser le formulaire après la soumission
      setFormData({
        nom: '',
        tel: '',
        pays: '',
        codePostal: '',
        ville: '',
        adresse: ''
      });
    } 
    catch (error) {
      console.error('Erreur lors de la soumission', error);
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading renderAs='h3'>Éditer votre profil</Heading>

      {/* Message de succès après la soumission */}
      {successMessage && (
        <Notification color="success">
          {successMessage}
        </Notification>
      )}

      <Field>
        <Label>Nom</Label>
        <Control>
          <Input
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Votre nom"
            aria-label="Nom"
          />
        </Control>
        {errors.nom && <p className="help is-danger">{errors.nom}</p>}
      </Field>

      <Field>
        <Label>Tél</Label>
        <Control>
          <Input
            name="tel"
            type="tel"
            value={formData.tel}
            onChange={handleChange}
            placeholder="Votre numéro de téléphone"
            aria-label="Téléphone"
          />
        </Control>
        {errors.tel && <p className="help is-danger">{errors.tel}</p>}
      </Field>

      <Field>
        <Label>Pays</Label>
        <Control>
          <Input
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            placeholder="Votre pays"
            aria-label="Pays"
          />
        </Control>
        {errors.pays && <p className="help is-danger">{errors.pays}</p>}
      </Field>

      <Columns>
        <Columns.Column>
          <Field>
            <Label>Code postal</Label>
            <Control>
              <Input
                name="codePostal"
                value={formData.codePostal}
                onChange={handleChange}
                placeholder="Votre code postal"
                type="text"
                aria-label="Code postal"
              />
            </Control>
            {errors.codePostal && <p className="help is-danger">{errors.codePostal}</p>}
          </Field>
        </Columns.Column>

        <Columns.Column>
          <Field>
            <Label>Ville</Label>
            <Control>
              <Input
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                placeholder="Votre ville"
                aria-label="Ville"
              />
            </Control>
            {errors.ville && <p className="help is-danger">{errors.ville}</p>}
          </Field>
        </Columns.Column>
      </Columns>

      <Notification color={'info'} light={true}>
        <p>Cette information est nécessaire pour vous placer sur la carte et permettre aux utilisateurs de vous trouver.</p>
      </Notification>

      <Field>
        <Label>Adresse</Label>
        <Control>
          <Input
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Votre adresse (optionnel)"
            aria-label="Adresse"
          />
        </Control>
      </Field>

      <Notification color={'info'} light={true}>
        <p>Celle-ci n'est pas obligatoire, vous pouvez décider de la laisser vide</p>
      </Notification>

      {/* Bouton de soumission */}
      <Button color="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours...' : 'Enregistrer'}
      </Button>
    </form>
  );
};

export default EditProfileForm;
