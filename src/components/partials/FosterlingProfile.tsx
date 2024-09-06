import React from 'react';
import { useModal } from '../../hooks/ModalContext';
import { Button } from "react-bulma-components";
import { Trash, Pencil } from "react-flaticons";
import { Tooltip } from 'react-tooltip';

// Définir le type des props pour le profil d'accueil
interface FosterlingProfileProps {
  profile: {
    species: string;
    age: string;
    gender: string;
    perimeter: string;
  };
}

const FosterlingProfile: React.FC<FosterlingProfileProps> = ({ profile }) => {
  const { openModal } = useModal();

  return (
    <tr>
      <td>{profile.species}</td>
      <td>{profile.age}</td>
      <td>{profile.gender}</td>
      <td>{profile.perimeter}</td>
      <td className='has-text-right'>
        <Button
          color="primary"
          onClick={() => openModal('updateFosterlingProfile')}
          size="small"
          data-tooltip-id="edit-tooltip"
          data-tooltip-content="Modifier le profil"
        >
          <Pencil size={15} />
        </Button>

        <Button
          color="danger"
          size="small"
          data-tooltip-id="delete-tooltip"
          data-tooltip-content="Supprimer"
        >
          <Trash size={15} />
        </Button>
        
        <Tooltip id="edit-tooltip" />
        <Tooltip id="delete-tooltip" />
      </td>
    </tr>
  );
};

export default FosterlingProfile;