import { useState } from 'react';
import { Form, Button, Heading, Columns, Notification, } from 'react-bulma-components';

const { Field, Label, Select, Input } = Form;

const UpdateFosterlingProfileForm = () => {
  const [formData, setFormData] = useState({
    option1: '',
    option2: '',
    option3: '',
    quantity: '', 
    id: '123', 
    search_area: '10'
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading renderAs="h3">Ajouter un profil d'accueil</Heading>
      <Notification color={'info'} light={true}>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nemo quod? Sit tempore rerum, possimus libero neque facere earum ullam sequi, iure, saepe dolore. Eos odio eaque laboriosam reprehenderit est.</p>
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
        <Label>Sexe</Label>
        <Select
          name="option2"
          value={formData.option2}
          onChange={handleChange}
        >
          <option value="" disabled>Sélectionnez</option>
          <option value="option2a">Mâle</option>
          <option value="option2b">Femelle</option>
          <option value="option2c">Indifférent</option>
        </Select>
      </Field>
        </Columns.Column>
        <Columns.Column>
        {/* Select age*/}
      <Field>
        <Label>Age</Label>
        <Select
          name="option3"
          value={formData.option3}
          onChange={handleChange}
        >
          <option value="" disabled>Sélectionnez</option>
          <option value="option3a">- d'1 an</option>
          <option value="option3b">Entre 1 et 3 ans</option>
          <option value="option3c">Entre 3 et 5 ans</option>
          <option value="option3c">Plus de 5 ans</option>
        </Select>
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
          placeholder="Enter quantity"
        />
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
        />
        <p>Périmètre : {formData.search_area} Km</p>
      </Field>
      </Columns.Column>
      </Columns>
      {/* Champ caché user_id*/}
      <Input
        type="hidden"
        name="user_id"
        value={formData.id}
      />

      <Button color="primary" type="submit" className="is-fullwidth">
        Valider
      </Button>
    </form>
  );
};

export default UpdateFosterlingProfileForm;
