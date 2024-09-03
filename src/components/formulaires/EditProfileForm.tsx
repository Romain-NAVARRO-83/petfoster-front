import { useState } from 'react';
import { Form, Button, Columns, Notification, Heading } from 'react-bulma-components';

const { Field, Control, Input, Label } = Form;

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    tel: '',
    pays: '',
    codePostal: '',
    ville: '',
    adresse: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log(formData);
  };

  return (

      <form onSubmit={handleSubmit}>
        <Heading renderAs='h3'>éditer votre profil</Heading>
        <Field>
          <Label>Nom</Label>
          <Control>
            <Input 
              name="nom" 
              value={formData.nom} 
              onChange={handleChange} 
              placeholder="Votre nom" 
            />
          </Control>
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
            />
          </Control>
        </Field>

        <Field>
          <Label>Pays</Label>
          <Control>
            <Input 
              name="pays" 
              value={formData.pays} 
              onChange={handleChange} 
              placeholder="Votre pays" 
            />
          </Control>
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
              type='number'
            />
          </Control>
        </Field>
        </Columns.Column>
            <Columns.Column><Field>
          <Label>Ville</Label>
          <Control>
            <Input 
              name="ville" 
              value={formData.ville} 
              onChange={handleChange} 
              placeholder="Votre ville" 
            />
          </Control>
        </Field></Columns.Column>
        
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
              placeholder="Votre adresse" 
            />
          </Control>
        </Field>
        <Notification color={'info'} light={true} >
        <p>Celle-ci n'est pas obligatoire, vous pouvez décider de la laisser vide</p>
        </Notification>
       

        <Button color="primary" type="submit">
          Enregistrer
        </Button>
      </form>

  );
};

export default EditProfileForm;
