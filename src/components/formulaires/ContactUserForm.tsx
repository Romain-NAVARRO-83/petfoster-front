import { useState } from 'react';
import { Form, Button, Heading } from 'react-bulma-components';

const { Field, Label, Textarea } = Form;

const ContactUserForm = () => {
  const [formData, setFormData] = useState({
    messageContent: ''
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
        <Heading renderAs='h3'>Contacter (nomUtilisateur)</Heading>
        <Field>
          <Label>Message</Label>
          <Textarea
        placeholder="Votre message..."
        value={formData.messageContent}
        onChange={handleChange}
        className="textarea"
      />
        </Field>

        



        

        <Button color="primary" type="submit">
          Envoyer
        </Button>
      </form>

  );
};

export default ContactUserForm;
