import React, { useState } from 'react';
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

export default FosterlingRequestForm;
