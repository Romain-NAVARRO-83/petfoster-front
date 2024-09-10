import React, { useState } from 'react';
import { Button, Form, Heading, Columns, Notification } from 'react-bulma-components';

const { Field, Label, Select, Input } = Form;

interface FormData {
  species: string;
  sexe: string;
  age: string;
  quantity: string;
  user_id: string;
  search_area: string;
}

const UpdateFosterlingProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    species: '',
    sexe: '',
    age: '',
    quantity: '',
    user_id: '123', // ID par défaut de l'utilisateur (peut être remplacé dynamiquement)
    search_area: '10', // Valeur par défaut du périmètre
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.species) {
      newErrors.species = 'Veuillez sélectionner une espèce.';
    }

    if (!formData.sexe) {
      newErrors.sexe = 'Veuillez sélectionner un sexe.';
    }

    if (!formData.age) {
      newErrors.age = 'Veuillez sélectionner un âge.';
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Veuillez entrer une quantité valide.';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Réinitialiser les erreurs
    setErrors({});

    // Validation des données du formulaire
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Si tout est valide, on peut soumettre le formulaire
    setIsSubmitting(true);

    try {
      // Soumission des données (ex : envoyer à une API)
      console.log('Données soumises : ', formData);

      // Réinitialisation du formulaire (facultatif)
      setFormData({
        species: '',
        sexe: '',
        age: '',
        quantity: '',
        user_id: '123',
        search_area: '10',
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
      <Heading renderAs="h3">Modifiez le profil d'accueil</Heading>

      <Notification color={'info'} light={true}>
        <p>
          Remplissez le formulaire ci-dessous pour mettre à jour le profil d'accueil.
        </p>
      </Notification>

      <Columns>
        <Columns.Column>
          {/* Select espèce */}
          <Field>
            <Label>Espèce</Label>
            <Select name="species" value={formData.species} onChange={handleChange} aria-label="Espèce">
              <option value="" disabled>Sélectionnez</option>
              <option value="Chat">Chat</option>
              <option value="Chien">Chien</option>
              <option value="Cheval">Cheval</option>
            </Select>
            {errors.species && <p className="help is-danger" aria-live="polite">{errors.species}</p>}
          </Field>
        </Columns.Column>

        <Columns.Column>
          {/* Select sexe */}
          <Field>
            <Label>Sexe</Label>
            <Select name="sexe" value={formData.sexe} onChange={handleChange} aria-label="Sexe">
              <option value="" disabled>Sélectionnez</option>
              <option value="Mâle">Mâle</option>
              <option value="Femelle">Femelle</option>
              <option value="Indifférent">Indifférent</option>
            </Select>
            {errors.sexe && <p className="help is-danger" aria-live="polite">{errors.sexe}</p>}
          </Field>
        </Columns.Column>

        <Columns.Column>
          {/* Select âge */}
          <Field>
            <Label>Âge</Label>
            <Select name="age" value={formData.age} onChange={handleChange} aria-label="Âge">
              <option value="" disabled>Sélectionnez</option>
              <option value="- d'1 an">- d'1 an</option>
              <option value="Entre 1 et 3 ans">Entre 1 et 3 ans</option>
              <option value="Entre 3 et 5 ans">Entre 3 et 5 ans</option>
              <option value="Plus de 5 ans">Plus de 5 ans</option>
            </Select>
            {errors.age && <p className="help is-danger" aria-live="polite">{errors.age}</p>}
          </Field>
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column>
          {/* Champ quantité */}
          <Field>
            <Label>Quantité</Label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Entrez la quantité"
              aria-label="Quantité"
            />
            {errors.quantity && <p className="help is-danger" aria-live="polite">{errors.quantity}</p>}
          </Field>
        </Columns.Column>

        <Columns.Column>
          {/* Champ Périmètre */}
          <Field>
            <Label>Périmètre</Label>
            <Input
              type="range"
              name="search_area"
              value={formData.search_area}
              onChange={handleChange}
              min="10"
              max="200"
              aria-label="Périmètre"
            />
            <p>Périmètre : {formData.search_area} Km</p>
          </Field>
        </Columns.Column>
      </Columns>

      {/* Champ caché user_id */}
      <Input type="hidden" name="user_id" value={formData.user_id} />

      <Button color="primary" type="submit" className="is-fullwidth" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours...' : 'Valider'}
      </Button>
    </form>
  );
};

export default UpdateFosterlingProfileForm;
