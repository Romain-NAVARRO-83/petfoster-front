import { Link } from 'react-router-dom';
import { Pencil, Eye, Home } from 'react-flaticons';
import { useModal } from '../../hooks/ModalContext';
import { Animal } from 'src/@interfaces/animal';
import { useAuth } from '../../hooks/AuthContext';
import computeAge from '../../utils/computeAge';
import MiniatureAnimal from './Miniature';
import IdToSPecies from './IdToSpecies';
import GenderIcon from './GenderIcon';

// Interface pour définir les propriétés passées au composant
interface AnimalListItemProps {
  animal: Animal;
}

function AnimalItemList({ animal }: AnimalListItemProps) {
  const { user: connectedUser } = useAuth();
  const { openModal } = useModal();
  return (
    <article className="box animal-item">
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column columns is-vcentered is-half-mobile is-mobile is-half-tablet is-3-desktop is-multiline">
          <MiniatureAnimal animal={animal} />
          <div>
            <p className="has-text-weight-bold has-text-left">{animal.name} </p>
            <IdToSPecies speciesId={animal.species_id} />
          </div>
        </div>
        <div className="column is-half-mobile is-half-tablet is-narrow-desktop">
          <GenderIcon gender={animal.sexe} size={20} />{' '}
          {computeAge(animal.date_of_birth)}
        </div>
        <div className="column has-text-right">
          {/* edit, see, fosterer */}
          {connectedUser && connectedUser.userId === animal.creator?.id && (
            <>
              {animal &&
                animal.animalOwners &&
                animal.animalOwners.length > 0 && (
                  <Link
                    to={`/profil/${animal?.animalOwners[0]?.user?.id}`}
                    className="has-text-info button is-extra-small"
                    title={animal?.animalOwners[0]?.user?.name}
                  >
                    <Home />
                  </Link>
                )}

              <button
                className="has-text-success button is-extra-small"
                onClick={() =>
                  openModal('editAnimalProfile', null, null, animal.id)
                }
                title="éditer l'animal"
              >
                <Pencil />
              </button>
            </>
          )}

          {/* Lien pour voir le profil détaillé de l'animal */}
          <Link
            to={`/animal/${animal.id}`}
            className="button has-text-info is-extra-small"
            title={`voir le profil de ${animal.name}`}
          >
            <Eye />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default AnimalItemList;
