// import React from 'react';
import { Modal, Box } from 'react-bulma-components';
import { useModal } from '../../hooks/ModalContext';
import EditProfileForm from '../formulaires/EditProfileForm';
import ContactUserForm from '../formulaires/ContactUserForm';
import AddFosterlingProfileForm from '../formulaires/AddFosterlingProfileForm';
import UpdateFosterlingProfileForm from '../formulaires/UpdateFosterlingProfileForm';

function MainModal(){
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
   {modalContent === "updateForsterlingProfile" && (
            < UpdateFosterlingProfileForm />
   )}
          
        </Box>
      </Modal.Content>
    </Modal>
  );
};

export default MainModal;


