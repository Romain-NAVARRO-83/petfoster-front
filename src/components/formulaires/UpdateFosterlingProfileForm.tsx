import { useState } from 'react';
import { Form, Button, Heading, Columns, Notification } from 'react-bulma-components';

const { Field, Label, Select, Input } = Form;

interface FormData {
  option1: string;
  option2: string;
  option3: string;
  quantity: string;
  id: string;
  search_area: string;
}

const UpdateFosterlingProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    option1: '',
    option2: '',
    option3: '',
    quantity: '',
    id: '123', // Champ caché user_id (ID par défaut)
    search_area: '10',
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

    if (!formData.option1) {
      newErrors.option1 = 'Veuillez sélectionner une espèce.';
    }

    if (!formData.option2) {
      newErrors.option2 = 'Veuillez sélectionner un sexe.';
    }

    if (!formData.option3) {
      newErrors.option3 = 'Veuillez sélectionner un âge.';
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Veuillez entrer une quantité valide.';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        option1: '',
        option2: '',
        option3: '',
        quantity: '',
        id: '123',
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nemo quod? Sit tempore rerum, possimus libero neque facere earum ullam sequi.
        </p>
      </Notification>
      
      <Columns>

        <Columns.Column>

          {/* Select espèce */}
          <Field>

            <Label>Espèce</Label>

            <Select

              name="option1"
              value={formData.option1}
              onChange={handleChange}
              aria-label="Espèce"

            >

              <option value="" disabled>Sélectionnez</option>
              <option value="option1a">Chat</option>
              <option value="option1b">Chien</option>
              <option value="option1c">Cheval</option>

            </Select>

            {errors.option1 && <p className="help is-danger">{errors.option1}</p>}

          </Field>

        </Columns.Column>

        <Columns.Column>
          {/* Select sexe */}
          <Field>

            <Label>Sexe</Label>

            <Select

              name="option2"
              value={formData.option2}
              onChange={handleChange}
              aria-label="Sexe"

            >

              <option value="" disabled>Sélectionnez</option>
              <option value="option2a">Mâle</option>
              <option value="option2b">Femelle</option>
              <option value="option2c">Indifférent</option>

            </Select>

            {errors.option2 && <p className="help is-danger">{errors.option2}</p>}

          </Field>

        </Columns.Column>

        <Columns.Column>
          {/* Select âge */}
          <Field>

            <Label>Âge</Label>

            <Select

              name="option3"
              value={formData.option3}
              onChange={handleChange}
              aria-label="Âge"

            >

              <option value="" disabled>Sélectionnez</option>
              <option value="option3a">- d'1 an</option>
              <option value="option3b">Entre 1 et 3 ans</option>
              <option value="option3c">Entre 3 et 5 ans</option>
              <option value="option3d">Plus de 5 ans</option>

            </Select>

            {errors.option3 && <p className="help is-danger">{errors.option3}</p>}

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

            {errors.quantity && <p className="help is-danger">{errors.quantity}</p>}

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
      <Input
        type="hidden"
        name="user_id"
        value={formData.id}
      />

      <Button color="primary" type="submit" className="is-fullwidth" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours...' : 'Valider'}
      </Button>

    </form>

  );
  
};

export default UpdateFosterlingProfileForm;
