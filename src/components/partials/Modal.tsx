import React from 'react';
import { Modal, Box } from 'react-bulma-components';
import { useModal } from '../../hooks/ModalContext';
import EditProfileForm from '../formulaires/EditProfileForm';

const MainModal: React.FC = () => {
  const { modalContent, isActive, closeModal } = useModal();

  return (
    <Modal show={isActive} onClose={closeModal} closeOnBlur={true}>
      <Modal.Content>
        <Box>
          <button className="delete is-pull-right" onClick={closeModal} aria-label="Close modal"></button>
          {modalContent === "editUserProfile" && (
            < EditProfileForm />
   )}
          
        </Box>
      </Modal.Content>
    </Modal>
  );
};

export default MainModal;
