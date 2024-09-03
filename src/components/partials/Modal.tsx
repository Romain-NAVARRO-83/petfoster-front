import React from 'react';
import { Modal, Button, Box } from 'react-bulma-components';
import { useModal } from '../../hooks/ModalContext';

const MainModal = () => {
  const { isActive, closeModal } = useModal(); // Use context state

  return (
    <Modal show={isActive} onClose={closeModal} closeOnBlur={true}>
      <Modal.Content>
        <Box>
          <p>Contenu de la modale</p>
          <Button color="primary" onClick={closeModal}>
            Close
          </Button>
        </Box>
      </Modal.Content>
    </Modal>
  );
};

export default MainModal;