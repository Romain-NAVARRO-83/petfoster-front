import {Trash } from 'react-flaticons';
// import { useModal } from '../../hooks/ModalContext';
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
  // const { openModal } = useModal();
  console.log(profile);

  return (
    <tr>
      <td aria-label="Espèce">
        <IdToSPecies speciesId={profile.species_id} />
      </td>
      <td aria-label="Age">{profile.age}</td>
      <td aria-label="Sexe">{profile.sexe}</td>
      <td aria-label="Qté">{profile.quantity}</td>
      <td aria-label="Perim.">{profile.search_area} Km</td>
      <td className="has-text-right">
        {/* <button
          className="button is-small is-ghost has-text-success"
          onClick={() => openModal('updateFosterlingProfile')}
          aria-label="modifier le profil"
        >
          <Pencil/>
        </button> */}

        <button
          className="button is-small is-ghost has-text-danger"
          aria-label="Supprimer"
          onClick={() => deleteFunction(profile.id)}
        >
          <Trash/>
        </button>
      </td>
    </tr>
  );
}

export default FosterlingProfile;
