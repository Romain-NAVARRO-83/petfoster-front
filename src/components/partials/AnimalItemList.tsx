import React from 'react';
import { Box, Columns, Image, Button } from 'react-bulma-components';
import { Envelope, Pencil } from 'react-flaticons';
import { useModal } from '../../hooks/ModalContext';

const AnimalItemList: React.FC = () => {
  const { openModal } = useModal();
  return (
    <Box>
      <Columns vCentered>
        {/* Conteneur pour l'image */}
        <Columns.Column narrow textAlign="centered">
          <Image
            rounded
            size={64}
            src="https://bulma.io/assets/images/placeholders/64x64.png"
            alt="Animal"
          />
        </Columns.Column>

        {/* Conteneur pour le texte et les textarea */}
        <Columns.Column>
          <p className="has-text-weight-bold has-text-left">Nom animal</p>
          <Columns>
            <Columns.Column>Espèce</Columns.Column>
            <Columns.Column>Age</Columns.Column>
            <Columns.Column>Sexe</Columns.Column>
          </Columns>
        </Columns.Column>

        {/* Conteneur pour le bouton */}

        <Columns.Column narrow textAlign="centered">
          <Button color="info">Voir</Button>
          <Button
            color="primary"
            onClick={() => openModal('editAnimalProfile')}
          >
            <Pencil /> Editer
          </Button>
        </Columns.Column>
      </Columns>
    </Box>
  );
};

export default AnimalItemList;
