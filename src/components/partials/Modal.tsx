import React from 'react';
import { Modal, Box, Columns } from 'react-bulma-components';
import { useModal } from '../../hooks/ModalContext';
import EditProfileForm from '../formulaires/EditProfileForm';
import ContactUserForm from '../formulaires/ContactUserForm';
import AddFosterlingProfileForm from '../formulaires/AddFosterlingProfileForm';

const MainModal: React.FC = () => {
  const { modalContent, isActive, closeModal } = useModal();

  return (
    <Modal show={isActive} onClose={closeModal} closeOnBlur={true}>
      <Modal.Content>
        <Box>
          <button className="delete is-pulled-right" onClick={closeModal} aria-label="Close modal"></button>
          {modalContent === "editUserProfile" && (
            < EditProfileForm />
   )}
   {modalContent === "contactUser" && (
            < ContactUserForm />
   )}
   {modalContent === "addForsterlingProfile" && (
            < AddFosterlingProfileForm />
   )}
          
        </Box>
      </Modal.Content>
    </Modal>
  );
};

export default MainModal;


