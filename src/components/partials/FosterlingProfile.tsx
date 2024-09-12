import { useModal } from '../../hooks/ModalContext';
import { Button } from "react-bulma-components";
import { Trash, Pencil } from "react-flaticons";
import { Tooltip } from 'react-tooltip';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Définir le type des props pour le profil d'accueil
interface FosterlingProfileProps {
  profile: {
    species_id: string | number;
    age: string | number;
    sexe: string;
    search_area: string | number;
    quantity:number;
    id:number;
  };
  deleteFunction: (id: number) => Promise<void>; 

}


function FosterlingProfile({ profile, deleteFunction }: FosterlingProfileProps) {
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
        <button
        className='button is-small is-ghost has-text-success'
          onClick={() => openModal('updateFosterlingProfile')}
          data-tooltip-id="edit-tooltip"
          data-tooltip-content="Modifier le profil"
          aria-label='modifier le profil'
        >
          <Pencil size={15} />
        </button>

        <button
          className='button is-small is-ghost has-text-danger'
          data-tooltip-id="delete-tooltip"
          data-tooltip-content="Supprimer"
          aria-label='Supprimer'
          onClick={() => deleteFunction(profile.id)} 
        >
          <Trash size={15} />
        </button>
        
        <Tooltip id="edit-tooltip" />
        <Tooltip id="delete-tooltip" />
      </td>
    </tr>
  );
}

export default FosterlingProfile;
