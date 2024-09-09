import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Columns, Image, Button } from 'react-bulma-components';
import { Pencil, Eye } from 'react-flaticons';
import { useModal } from '../../hooks/ModalContext';
import { Animal } from 'src/@interfaces/animal';
// Utilitaires
import computeAge from '../../utils/computeAge'


// Interface for the props passed to the component
interface AnimalListItemProps {
  animal: Animal;
}

function AnimalItemList({ animal }: AnimalListItemProps) {
  const { openModal } = useModal();

  return (
    <article className='box'>
      <div className="columns is-vcentered">
        
        <div className="animal-miniature is-narrow column has-text-centered">
          <img
            src={`/img/animaux/${animal?.id}-${animal?.name}-1.webp`} 
            alt="Animal"
            width="64"
            height="64"
            
          />
        </div>

        {/* Text container */}
        <div className='column'>
          <p className="has-text-weight-bold has-text-left">{animal?.name} </p>
          <div className='columns'>
            <div className='column'>Espèce: {/*{animal?.species.name}*/}</div>
            <div className='column'>Age: {computeAge(animal?.date_of_birth)}</div>
            <div className='column'>Sexe: {animal?.sexe}</div>
          </div>
        </div>


        <div className='column is-narrow has-text-centered'>
        <Link to={`/animal/${animal?.id}`} className='button has-text-info'>
            <Eye />
          </Link>
          <button
            className="has-text-success button"
            onClick={() => openModal('editAnimalProfile')}
          >
            <Pencil />
          </button>
        </div>
      </div>
    </article>
  );
}

export default AnimalItemList;
