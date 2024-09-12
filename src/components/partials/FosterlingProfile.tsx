import { useModal } from '../../hooks/ModalContext';
import { Button } from "react-bulma-components";
import { Trash, Pencil } from "react-flaticons";
import { Tooltip } from 'react-tooltip';

// Définir le type des props pour le profil d'accueil
interface FosterlingProfileProps {
  profile: {
    species_id: string | number;
    age: string | number;
    sexe: string;
    search_area: string | number;
    quantity:number
  };
}

function FosterlingProfile({ profile }: FosterlingProfileProps) {
  const { openModal } = useModal();
  console.log(profile);
  
  return (
    <tr>
      <td>{profile.species_id}</td>
      <td>{profile.age}</td>
      <td>{profile.sexe}</td>
      <td>{profile.quantity}</td>
      <td>{profile.search_area} Km</td>
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
}

export default FosterlingProfile;
