import React from 'react';
import { Modal, Button, Box } from 'react-bulma-components';
import { useModal } from '../../hooks/ModalContext';
import EditProfileForm from '../formulaires/EditProfileForm';

const MainModal = () => {
  const { isActive, closeModal } = useModal(); // Use context state

  return (
    <Modal show={isActive} onClose={closeModal} closeOnBlur={true}>
      <Modal.Content>
        <Box>
        <button class="delete" onClick={closeModal} aria-label='Fermer la modale'></button>
          < EditProfileForm />
          {/* <Button color="primary" onClick={closeModal}>
            Close
          </Button> */}
        </Box>
      </Modal.Content>
    </Modal>
  );
};

export default MainModal;