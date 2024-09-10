import React, { useState } from 'react';
import { Form, Button, Heading, Columns, Notification } from 'react-bulma-components';

const { Field, Label, Select, Input } = Form;

const AddFosterlingProfileForm = () => {
  const [formData, setFormData] = useState({
    option1: '', // Stocke l'espèce choisie
    option2: '', // Stocke le sexe choisi
    option3: '', // Stocke l'âge choisi
    quantity: '', // Stocke la quantité d'animaux que l'utilisateur souhaite accueillir
    search_area: '10', // Stocke le périmètre de recherche (par défaut à 10 Km)
  });

  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs de validation ou API
  const [success, setSuccess] = useState<boolean>(false); // Pour afficher un message de succès
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Pour éviter les soumissions multiples

  // Gestion des changements dans les champs du formulaire (Select et Input)
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Met à jour les champs dynamiquement en fonction de leur "name"
    });
  };

  // Validation du formulaire avant soumission
  const validateForm = () => {
    // Vérifie que tous les champs obligatoires sont remplis
    if (formData.option1 === '' || formData.option2 === '' || formData.option3 === '' || formData.quantity === '') {
      setError('Veuillez remplir tous les champs requis.');
      return false; // Retourne faux si un champ est vide
    }

    // Vérifie que la quantité est un nombre supérieur à 0
    if (parseInt(formData.quantity) <= 0) {
      setError('La quantité doit être supérieure à 0.');
      return false; // Retourne faux si la quantité est inférieure ou égale à 0
    }

    return true; // Retourne vrai si la validation est réussie
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    setError(null); // Réinitialise les erreurs à chaque soumission
    setSuccess(false); // Réinitialise le message de succès

    if (!validateForm()) {
      return; // Arrête la soumission si la validation échoue
    }

    setIsSubmitting(true); // Désactive le bouton de soumission pendant que la demande est traitée

    try {
      // Simule la soumission des données (envoi vers une API par exemple)
      console.log(formData);

      // Si tout se passe bien, affiche un message de succès
      setSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la soumission", error);
      setError("Une erreur s'est produite lors de la soumission. Veuillez réessayer."); // Affiche un message d'erreur
    } finally {
      setIsSubmitting(false); // Réactive le bouton de soumission après la tentative
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading renderAs="h3">Ajouter un profil d'accueil</Heading>

      {/* Affiche un message d'erreur si une erreur existe */}
      {error && (
        <Notification color="danger">
          {error}
        </Notification>
      )}

      {/* Affiche un message de succès si l'ajout a réussi */}
      {success && (
        <Notification color="success">
          Le profil a été ajouté avec succès.
        </Notification>
      )}

      <Columns>
        <Columns.Column>
          {/* Sélection de l'espèce */}
          <Field>
            <Label htmlFor="option1">Espèce</Label>
            <Select
              name="option1" // Le champ "name" doit correspondre à la clé dans formData
              value={formData.option1} // L'option choisie est stockée ici
              onChange={handleChange} // Appelle handleChange à chaque modification
              aria-label="Sélectionnez une espèce"
              id="option1"
            >
              {/* Options d'espèce */}
              <option value="" disabled>Sélectionnez</option>
              <option value="option1a">Chat</option>
              <option value="option1b">Chien</option>
              <option value="option1c">Cheval</option>
            </Select>
          </Field>
        </Columns.Column>

        <Columns.Column>
          {/* Sélection du sexe */}
          <Field>
            <Label htmlFor="option2">Sexe</Label>
            <Select
              name="option2"
              value={formData.option2}
              onChange={handleChange}
              aria-label="Sélectionnez un sexe"
              id="option2"
            >
              {/* Options de sexe */}
              <option value="" disabled>Sélectionnez</option>
              <option value="option2a">Mâle</option>
              <option value="option2b">Femelle</option>
              <option value="option2c">Indifférent</option>
            </Select>
          </Field>
        </Columns.Column>

        <Columns.Column>
          {/* Sélection de l'âge */}
          <Field>
            <Label htmlFor="option3">Âge</Label>
            <Select
              name="option3"
              value={formData.option3}
              onChange={handleChange}
              aria-label="Sélectionnez un âge"
              id="option3"
            >
              {/* Options d'âge */}
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
              name="quantity" // L'attribut "name" correspond à la clé dans formData
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Entrez la quantité"
              aria-label="Entrez la quantité"
              id="quantity"
            />
          </Field>
        </Columns.Column>

        <Columns.Column>
          {/* Champ périmètre de recherche */}
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
            {/* Affiche la valeur actuelle du périmètre */}
            <p>Périmètre : <strong>{formData.search_area}</strong> Km</p>
          </Field>
        </Columns.Column>
      </Columns>

      {/* Bouton de soumission */}
      <Button color="primary" type="submit" className="is-fullwidth" disabled={isSubmitting}>
        {/* Change le texte du bouton pendant la soumission */}
        {isSubmitting ? 'Envoi en cours...' : 'Valider'}
      </Button>
    </form>
  );
};

export default AddFosterlingProfileForm;
