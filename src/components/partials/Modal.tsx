import React from 'react';
import { Modal, Box } from 'react-bulma-components';
import { useModal } from '../../hooks/ModalContext';
import ContactUserForm from '../formulaires/ContactUserForm'; 
import AddForsterlingRequestForm from '../formulaires/AddFosterlingProfileForm';
import AddFosterlingProfileForm from'../formulaires/AddFosterlingProfileForm'
import EditProfileForm from '../formulaires/EditProfileForm'; 
import EditAnimalProfileForm from '../formulaires/EditAnimalProfileForm'; 

function MainModal() {
  const { modalContent, isActive, closeModal } = useModal();

  return (
    <Modal show={isActive} onClose={closeModal} closeOnBlur={true}>
      <Modal.Content>
        <Box>
          <button className="delete is-pulled-right" onClick={closeModal} aria-label="Close modal"></button>
          

          {modalContent === 'contactUser' && (
            <ContactUserForm />
          )}


          {modalContent === 'addFosterlingProfile' && (
            <AddFosterlingProfileForm />  
          )}
          
          {modalContent === 'editUserProfile' && <EditProfileForm />}


          {modalContent === 'addFosterlingRequest' && (
            <AddForsterlingRequestForm />
          )}
          
          {modalContent === 'editAnimalProfile' && (
            <EditAnimalProfileForm />
          )}

        </Box>
      </Modal.Content>
    </Modal>
  );
}

export default MainModal;

