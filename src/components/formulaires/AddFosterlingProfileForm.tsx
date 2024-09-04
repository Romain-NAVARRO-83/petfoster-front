// ajouter des commentaires ligne 71 a 240

import React, { useState } from 'react';
import { Form, Button, Heading, Columns, Notification } from 'react-bulma-components';

const { Field, Label, Select, Input } = Form;

const AddFosterlingProfileForm = () => {
  const [formData, setFormData] = useState({
    option1: '',
    option2: '',
    option3: '',
    quantity: '',
    search_area: '10',
  });

  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs de validation ou API
  const [success, setSuccess] = useState<boolean>(false); // Pour afficher un message de succès
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Pour éviter les soumissions multiples

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation du formulaire
  const validateForm = () => {
    if (formData.option1 === '' || formData.option2 === '' || formData.option3 === '' || formData.quantity === '') {
      setError('Veuillez remplir tous les champs requis.');
      return false;
    }

    if (parseInt(formData.quantity) <= 0) {
      setError('La quantité doit être supérieure à 0.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Réinitialiser les erreurs à chaque soumission
    setSuccess(false); // Réinitialiser le message de succès

    if (!validateForm()) {
      return; // Arrêter si la validation échoue
    }

    setIsSubmitting(true); // Désactiver la soumission pendant le traitement

    try {
      
      console.log(formData);

      // Si tout se passe bien, afficher un message de succès
      setSuccess(true);
    } 
    catch (error) {
      console.error("Erreur lors de la soumission", error);
      setError("Une erreur s'est produite lors de la soumission. Veuillez réessayer.");
    } 
    finally {
      setIsSubmitting(false); // Réactiver la soumission après la tentative
    }
  };

  return (

    <form onSubmit={handleSubmit}>

      <Heading renderAs="h3">Ajouter un profil d'accueil</Heading>

      {error && (
        <Notification color="danger">
          {error}
        </Notification>
      )}

      {success && (
        <Notification color="success">
          Le profil a été ajouté avec succès.
        </Notification>
      )}

      <Columns>

        <Columns.Column>

          {/* Select espèce */}
          <Field>

            <Label htmlFor="option1">Espèce</Label>

            <Select

              name="option1"
              value={formData.option1}
              onChange={handleChange}
              aria-label="Sélectionnez une espèce"
              id="option1"

            >

              <option value="" disabled>Sélectionnez</option>
              <option value="option1a">Chat</option>
              <option value="option1b">Chien</option>
              <option value="option1c">Cheval</option>

            </Select>

          </Field>

        </Columns.Column>

        <Columns.Column>

          {/* Select sexe */}
          <Field>

            <Label htmlFor="option2">Sexe</Label>

            <Select

              name="option2"
              value={formData.option2}
              onChange={handleChange}
              aria-label="Sélectionnez un sexe"
              id="option2"

            >

              <option value="" disabled>Sélectionnez</option>
              <option value="option2a">Mâle</option>
              <option value="option2b">Femelle</option>
              <option value="option2c">Indifférent</option>

            </Select>

          </Field>

        </Columns.Column>

        <Columns.Column>

          {/* Select âge */}
          <Field>

            <Label htmlFor="option3">Âge</Label>

            <Select

              name="option3"
              value={formData.option3}
              onChange={handleChange}
              aria-label="Sélectionnez un âge"
              id="option3"

            >

              <option value="" disabled>Sélectionnez</option>
              <option value="option3a">- d'1 an</option>
              <option value="option3b">Entre 1 et 3 ans</option>
              <option value="option3c">Entre 3 et 5 ans</option>
              <option value="option3d">Plus de 5 ans</option>

            </Select>

          </Field>

        </Columns.Column>

      </Columns>

      <Columns>

        <Columns.Column>

          {/* Champ quantité */}
          <Field>

            <Label htmlFor="quantity">Quantité</Label>

            <Input

              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Entrez la quantité"
              aria-label="Entrez la quantité"
              id="quantity"

            />

          </Field>

        </Columns.Column>

        <Columns.Column>

          {/* Champ périmètre */}
          <Field>

            <Label htmlFor="search_area">Périmètre</Label>

            <Input

              type="range"
              name="search_area"
              value={formData.search_area}
              onChange={handleChange}
              min="10"
              max="200"
              aria-label="Sélectionnez le périmètre de recherche"
              id="search_area"

            />

            <p>Périmètre : <strong>{formData.search_area}</strong> Km</p>

          </Field>

        </Columns.Column>

      </Columns>

      <Button color="primary" type="submit" className="is-fullwidth" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours...' : 'Valider'}
      </Button>

    </form>

  );

};

export default AddFosterlingProfileForm;
