import { useState } from 'react';
import { Form, Button, Columns, Notification, Heading } from 'react-bulma-components';
import { P } from 'react-flaticons';

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

const EditAnimalProfileForm = () => {
  
  return (

    <>
    <p>Edit animal profile</p>
    </>

    

  );
  
};

export default EditAnimalProfileForm;
