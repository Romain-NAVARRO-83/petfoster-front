import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AnimalItemList from '../partials/AnimalItemList';
import { useModal } from '../../hooks/ModalContext';
import { useAuth } from '../../hooks/AuthContext';
import { PlusSmall } from 'react-flaticons';
import { User } from 'src/@interfaces/user';

const MesAnimaux = () => {
  // State pour stocker les animaux (du user)
  const [myUser, setMyUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { openModal } = useModal();
  const { user: connectedUser } = useAuth(); 

  // Récupérer les animaux de l'utilisateur
  useEffect(() => {
    console.log('Connected user:', connectedUser);
    
    if (connectedUser) {
      axios
        .get(`http://localhost:3000/api/users/${connectedUser.userId}`) 
        .then((response) => {
          console.log('User data:', response.data); 
          setMyUser(response.data);  // Assurez-vous que `response.data` contient bien la structure attendue pour `myUser`
          setLoading(false);            
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setFetchError('Erreur lors de la récupération des données.');
          setLoading(false); 
        });
    } else {
      setLoading(false); 
    }
  }, [connectedUser]);  

  return (
    <>
      <main>
        <div>
          <h1 className="title">Mes animaux</h1>
        </div>

        <section className="section">
          <div className="has-text-centered">
            {connectedUser && (
              <button
                className="button is-primary is-pulled-right"
                onClick={() => openModal('createAnimal')}
              >
                <PlusSmall /> Enregistrer un animal
              </button>
            )}
          </div>
        </section>

        {/* Chargement ou message d'erreur */}
        {loading ? (
          <p>Chargement...</p>
        ) : fetchError ? (
          <p>{fetchError}</p>
        ) : (
          <div className='container columns is-multiline'>
            {/* Liste des animaux créés */}
            
            <div className='column is-full is-half-desktop'>
            <h2 className='title'>Animaux créés</h2>
              {myUser?.createdAnimals && myUser.createdAnimals.length > 0 ? (
                myUser.createdAnimals.map((oneAnimal) => (
                  <>
                    {/* {JSON.stringify(oneAnimal)} */}
                    <AnimalItemList animal={oneAnimal} />
                    </>
                ))
              ) : (
                <div className='notification is-info is-light '>
                <p className='is-full has-text-centered'>Vous n'avez pas encore créé d'animaux.</p>
                </div>
              )}
            </div>

            {/* Liste des animaux hébergés */}
           
            <div className='column is-full is-half-desktop'>
            <h2 className='title'>Animaux hébergés</h2>
              {myUser?.userAnimals && myUser.userAnimals.length > 0 ? (
                myUser.userAnimals.map((animal) => (
                  animal.name
                    
                  
                ))
              ) : (
                <div className='notification is-info is-light '>
                <p className='is-full has-text-centered'>Vous n'hébergez aucun animal pour le moment.<br/>
                Vous pouvez <strong>Créer un profil d'accueil</strong></p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default MesAnimaux;
