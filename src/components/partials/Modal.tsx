import { useModal } from '../../hooks/ModalContext';
import ContactUserForm from '../formulaires/ContactUserForm'; 
import AddFosterlingRequestForm from '../formulaires/addForsterlingRequestForm';
import AddFosterlingProfileForm from '../formulaires/AddFosterlingProfileForm';
import EditProfileForm from '../formulaires/EditProfileForm'; 
import EditAnimalProfileForm from '../formulaires/EditAnimalProfileForm'; 
import CreateAnimalProfileForm from '../formulaires/CreateAnimalProfileForm';

function MainModal() {
  const { modalContent, isActive, closeModal, fullUser, senderId, receiverId, animalId } = useModal();

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          {modalContent === 'contactUser' && (
            <h3 className="title">Envoyer un message</h3>
          )}
          {modalContent === 'addFosterlingProfile' && (
            <h3 className="title">Ajouter un profil d'accueil</h3>
          )}
          {modalContent === 'editUserProfile' && (
            <h3 className="title">Éditer votre profil</h3>
          )}
          {modalContent === 'addFosterlingRequest' && (
            <h3 className="title">Faire une demande sur un animal</h3>
          )}
          {modalContent === 'editAnimalProfile' && (
            <h3 className="title">Éditer le profil d'un animal</h3>
          )}
          {modalContent === 'createAnimal' && (
            <h3 className="title">Enregistrer un animal</h3>
          )}
          <button className="delete" onClick={closeModal} aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {modalContent === 'contactUser' && (
            <ContactUserForm senderId={senderId} receiverId={receiverId} />
          )}

          {modalContent === 'addFosterlingProfile' && (
            <AddFosterlingProfileForm userId={senderId} />
          )}

          {modalContent === 'editUserProfile' && (
            <EditProfileForm user={fullUser} />
          )}

          {modalContent === 'addFosterlingRequest' && (
            <AddFosterlingRequestForm senderId={senderId} animalId={animalId} />
          )}

          {modalContent === 'editAnimalProfile' && (
            <EditAnimalProfileForm />
          )}

          {modalContent === 'createAnimal' && (
            <CreateAnimalProfileForm />
          )}
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={closeModal}>Fermer</button>
        </footer>
      </div>
    </div>
  );
}

export default MainModal;
