import { useModal } from '../../hooks/ModalContext';
import IdToSPecies from './IdToSpecies';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// Définir le type des props pour le profil d'accueil
interface FosterlingProfileProps {
  profile: {
    species_id: number;
    age: string | number;
    sexe: string;
    search_area: string | number;
    quantity: number;
    id: number;
  };
  deleteFunction: (id: number) => Promise<void>;
}

function FosterlingProfile({
  profile,
  deleteFunction,
}: FosterlingProfileProps) {
  const { openModal } = useModal();
  console.log(profile);

  return (
    <tr>
      <td>
        <IdToSPecies speciesId={profile.species_id} />
      </td>
      <td>{profile.age}</td>
      <td>{profile.sexe}</td>
      <td>{profile.quantity}</td>
      <td>{profile.search_area} Km</td>
      <td className="has-text-right">
        <button
          className="button is-small is-ghost has-text-success"
          onClick={() => openModal('updateFosterlingProfile')}
          aria-label="modifier le profil"
        >
          <span className="icon is-small">
            <i className="fas fa-pencil-alt"></i>{' '}
            {/* Icône de crayon pour éditer */}
          </span>
        </button>

        <button
          className="button is-small is-ghost has-text-danger"
          aria-label="Supprimer"
          onClick={() => deleteFunction(profile.id)}
        >
          <span className="icon is-small">
            <i className="fas fa-trash-alt"></i>{' '}
            {/* Icône de poubelle pour supprimer */}
          </span>
        </button>
      </td>
    </tr>
  );
}

export default FosterlingProfile;
