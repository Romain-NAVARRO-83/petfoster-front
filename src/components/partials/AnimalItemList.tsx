
import { Link } from 'react-router-dom';

import { Pencil, Eye } from 'react-flaticons';
import { useModal } from '../../hooks/ModalContext';
import { Animal } from 'src/@interfaces/animal';
import { useAuth } from '../../hooks/AuthContext'; // Importer le contexte d'authentification

// Utilitaire pour calculer l'âge de l'animal
import computeAge from '../../utils/computeAge'

// Interface pour définir les propriétés passées au composant
interface AnimalListItemProps {
  animal: Animal;
}

function AnimalItemList({ animal }: AnimalListItemProps) {
  // On récupère l'utilisateur connecté via le contexte Auth
  const { user: connectedUser } = useAuth(); 
  // On récupère la fonction openModal via le contexte Modal
  const { openModal } = useModal();

  // Vérification si l'objet animal ou animal.creator est indéfini
  // if (!animal || !animal.creator) {
  //   // Si animal ou creator est absent, on ne retourne rien (ou on peut afficher un indicateur de chargement)
  //   return null; 
  // }

  return (
    <article className='box'>
      <div className="columns is-vcentered">
        
        {/* Affichage de l'image miniature de l'animal */}
        <div className="animal-miniature is-narrow column has-text-centered">
          <img
            src={`/img/animaux/${animal.id}-${animal.name}-1.webp`} 
            alt="Animal"
            width="64"
            height="64"
          />
        </div>

        {/* Conteneur du texte avec les informations de l'animal */}
        <div className='column'>
          <p className="has-text-weight-bold has-text-left">{animal.name} </p>
          <div className='columns'>
            {/* Espèce de l'animal */}
            <div className='column'>Espèce: {/*{animal.species.name}*/}</div>
            {/* Calcul et affichage de l'âge de l'animal */}
            <div className='column'>Age: {computeAge(animal.date_of_birth)}</div>
            {/* Sexe de l'animal */}
            <div className='column'>
            {animal.sexe === "F" ? (
    <img src="/img/vector/femelle.svg" width="25" height="25" alt="Female" />
  ) : (
    <img src="/img/vector/male.svg" width="25" height="25" alt="Male" />
  )}
            </div>
          </div>
        </div>

        {/* Colonne avec les boutons d'actions (édition et visualisation) */}
        <div className='column is-narrow has-text-centered'>
        
          {/* Bouton d'édition visible uniquement si l'utilisateur connecté est le créateur de l'animal */}
          {connectedUser && connectedUser.userId === animal.creator?.id && (
            <button
              className="has-text-success button"
              onClick={() => openModal('editAnimalProfile')} // Ouvre le modal pour modifier le profil de l'animal
            >
              <Pencil />
            </button>)}

          {/* Lien pour voir le profil détaillé de l'animal */}
          <Link to={`/animal/${animal.id}`} className='button has-text-info'>
            <Eye />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default AnimalItemList;
