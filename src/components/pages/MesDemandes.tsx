import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/AuthContext';
import { User } from '../../@interfaces/user'; 
import { Animal } from '../../@interfaces/animal';
import { useNavigate } from 'react-router-dom';
import { Check, Cross, Delete } from 'react-flaticons';

const FilterPage = () => {
  const navigate = useNavigate();
  const [myUser, setMyUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { user: connectedUser } = useAuth(); 
  const [requestUserDetails, setRequestUserDetails] = useState<Record<number, User>>({});
  const [requestAnimalDetails, setRequestAnimalDetails] = useState<Record<number, Animal>>({});
  const [allFosterlingRequests, setAllFosterlingRequests] = useState(null);

  // Récupérer les données de l'utilisateur connecté
  useEffect(() => {
    if (connectedUser) {
      axios
        .get(`http://localhost:3000/api/users/${connectedUser.userId}`)
        .then((response) => {
          const userData = response.data;
          setMyUser(userData);
          setLoading(false);

          const fetchFosterlingDetails = async () => {
            const userRequests = userData.fosterlingRequests || [];

            // Récupérer les détails des utilisateurs et des animaux
            const userDetailsPromises = userRequests.map((request: any) =>
              axios.get(`http://localhost:3000/api/users/${request.users_id}`)
            );
            const animalDetailsPromises = userRequests.map((request: any) =>
              axios.get(`http://localhost:3000/api/animals/${request.animals_id}`)
            );

            const userDetailsResponses = await Promise.all(userDetailsPromises);
            const animalDetailsResponses = await Promise.all(animalDetailsPromises);

            const userDetailsMap = userDetailsResponses.reduce((acc: Record<number, User>, userResponse) => {
              acc[userResponse.data.id] = userResponse.data;
              return acc;
            }, {});

            const animalDetailsMap = animalDetailsResponses.reduce((acc: Record<number, Animal>, animalResponse) => {
              acc[animalResponse.data.id] = animalResponse.data;
              return acc;
            }, {});

            setRequestUserDetails(userDetailsMap);
            setRequestAnimalDetails(animalDetailsMap);
          };

          fetchFosterlingDetails();
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données:', error);
          setFetchError('Erreur lors de la récupération des données.');
          setLoading(false);
        });
    } else {
      setLoading(false);
      navigate('/'); 
    }
  }, [connectedUser, navigate]);

  // Récupérer toutes les demandes
  useEffect(() => {
    async function getAllRequests() {
      try {
        const response = await axios.get('http://localhost:3000/api/requests');
        setAllFosterlingRequests(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    getAllRequests();
  }, []);

  const handleConfirm = (requestId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir valider ?')) {
      axios.post(`http://localhost:3000/api/requests/${requestId}/validate`)
        .then(() => {
          alert('Demande validée avec succès.');
        })
        .catch((error) => {
          alert('Erreur lors de la validation de la demande.');
          console.error(error);
        });
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (fetchError) return <p>{fetchError}</p>;

  return (
    <>
      <div>
        <h1 className="title">Mes demandes</h1>
      </div>
      <section className="section">
        <div className="container">
          <div className="notification is-info is-light">
            {connectedUser?.userType === 'association' ? (
              <p>Cette page liste les demandes d'adoption ou d'accueil temporaire pour vos animaux enregistrés.</p>
            ) : (
              <p>Cette page liste les demandes d'adoption que vous avez formulées.</p>
            )}
          </div>
        </div>
        <div className="container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                
                <th colSpan={2} className='has-text-centered'>Animal</th>
                {connectedUser?.userType === 'association' ? <th>Demandeur</th> : <th>Propriétaire</th>}
                <th>Texte</th>
                <th>Statut</th>
                {connectedUser?.userType === 'association' && <th>Validation</th>}
              </tr>
            </thead>
            <tbody>
            {myUser?.type_user === 'association' && allFosterlingRequests?.map((request) => {
  const animal = myUser.createdAnimals.find(animal => animal.id === request.animals_id);

  if (animal) {
    return (
      <tr key={request.id}>
        <td>image</td>
        <td>{animal.name}</td>
        <td>nom</td>
        <td>{request.content_request}</td>
        <td>{request.request_status.toLowerCase() === 'pending' && (<span className="tag is-warning">En attente</span>)}
                    {request.request_status.toLowerCase() === 'rejected' && (<span className="tag is-danger">Rejetée</span>)}
                    {request.request_status.toLowerCase() === 'approved' && (<span className="tag is-success">Validée</span>)}</td>
        <td>
          <button className='button is-small is-success' aria-label='Valider la demande'><Check size={15}/></button>
          <button className='button is-small is-danger' aria-label='Refuser la demande'><Cross size={15}/></button>
        </td>
      </tr>
    );
  }
  return null;
})}

              {myUser?.fosterlingRequests?.map((item: any, index: number) => (
                <tr key={index}>
                  <td>
                    <figure className="image is-48x48">
                      <img
                        src={requestAnimalDetails[item.animals_id]?.pictures[0]?.URL_picture || '/img/default.jpg'}
                        alt={requestAnimalDetails[item.animals_id]?.name || 'Animal'}
                        width="64"
                        height="64"
                      />
                    </figure>
                  </td>
                  <td>
                    <a href={`/animal/${requestAnimalDetails[item.animals_id]?.id}`}>
                      {requestAnimalDetails[item.animals_id]?.name || 'Chargement...'}
                    </a>
                  </td>
                  {connectedUser?.userType === 'association' ? (
                    <td>
                      <a href="#">
                        {requestUserDetails[item.users_id]?.name || 'Chargement...'}
                      </a>
                    </td>
                  ) : (
                    <td>Propriétaire</td>
                  )}
                  <td>
                    {item.request_status.toLowerCase() === 'pending' && (<span className="tag is-warning">En attente</span>)}
                    {item.request_status.toLowerCase() === 'rejected' && (<span className="tag is-danger">Rejetée</span>)}
                    {item.request_status.toLowerCase() === 'approved' && (<span className="tag is-success">Validée</span>)}
                  </td>
                  {connectedUser?.userType === 'association' && (
                    <td>
                      <button className="button is-primary" onClick={() => handleConfirm(item.id)}>
                        Valider
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default FilterPage;
