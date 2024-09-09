import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AnimalItemList from '../partials/AnimalItemList';
import { useModal } from '../../hooks/ModalContext';
import { useAuth } from '../../hooks/AuthContext';
import { PlusSmall } from 'react-flaticons';

const MesAnimaux = () => {
  // State pour stocker les animaux (du user)
  const [myUser, setMyUser] = useState<any[]>([]);
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
          console.log('Animals data:', response.data); 
          setMyUser(response.data);  
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


        {loading ? (
          <p>Chargement...</p>
        ) : fetchError ? (
          <p>{fetchError}</p>
        ) : (
          <div className='container columns is-multiline'>
            
            <p>
            Problème : il faut récupérer les animaux créés par l'user ainsi que ceux hébérgés par l'user.
            </p>
            {/* {JSON.stringify(myUser)} */}
              {myUser.userAnimals.length > 0 ? (
                myUser.userAnimals.map((animal: any) => (
                  <Columns.Column size={12} className="is-fullwidth" key={animal.id}>
                    <AnimalItemList animal={animal} />
                  </Columns.Column>
                ))
              ) : (
                <p>Vous n'avez pas encore ajouté d'animaux.</p>
              )}
           
          </div>
        )}

        
      </main>
    </>
  );
};

export default MesAnimaux;
