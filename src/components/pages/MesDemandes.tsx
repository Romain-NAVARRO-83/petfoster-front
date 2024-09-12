import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/AuthContext';
import { User } from 'src/@interfaces/user'; // Assurez-vous que 'Animal' est importé correctement
import { Animal } from 'src/@interfaces/animal';

// Composant principal de la page de filtrage des demandes
const FilterPage = () => {
  const [myUser, setMyUser] = useState<User | null>(null); // Stocker les données de l'utilisateur connecté
  const [loading, setLoading] = useState(true); // État pour afficher le chargement
  const [fetchError, setFetchError] = useState<string | null>(null); // Stocker les erreurs de récupération de données
  const { user: connectedUser } = useAuth(); // Récupérer l'utilisateur connecté via le contexte d'authentification
  const [requestUserDetails, setRequestUserDetails] = useState<Record<number, User>>({}); // Stocker les détails des utilisateurs liés aux demandes
  const [requestAnimalDetails, setRequestAnimalDetails] = useState<Record<number, Animal>>({}); // Stocker les détails des animaux liés aux demandes

  // Effet pour récupérer les données de l'utilisateur connecté
  useEffect(() => {
    if (connectedUser) {
      console.log(connectedUser.userType);

      // Requête pour récupérer les données de l'utilisateur connecté
      axios
        .get(`http://localhost:3000/api/users/${connectedUser.userId}`)
        .then((response) => {
          const userData = response.data;
          setMyUser(userData); // Stocker les données de l'utilisateur
          setLoading(false); // Fin du chargement

          // Fonction asynchrone pour récupérer les détails des utilisateurs et des animaux liés aux demandes
          const fetchFosterlingDetails = async () => {
            const userRequests = userData.fosterlingRequests || [];

            // Promesses pour récupérer les détails des utilisateurs liés aux demandes
            const userDetailsPromises = userRequests.map((request: any) =>
              axios.get(`http://localhost:3000/api/users/${request.users_id}`)
            );

            // Promesses pour récupérer les détails des animaux liés aux demandes
            const animalDetailsPromises = userRequests.map((request: any) =>
              axios.get(`http://localhost:3000/api/animals/${request.animals_id}`)
            );

            // Attendre que toutes les requêtes soient terminées
            const userDetailsResponses = await Promise.all(userDetailsPromises);
            const animalDetailsResponses = await Promise.all(animalDetailsPromises);

            // Créer un objet pour stocker les détails des utilisateurs en fonction de leur id
            const userDetailsMap = userDetailsResponses.reduce((acc: Record<number, User>, userResponse) => {
              acc[userResponse.data.id] = userResponse.data;
              return acc;
            }, {});

            // Créer un objet pour stocker les détails des animaux en fonction de leur id
            const animalDetailsMap = animalDetailsResponses.reduce((acc: Record<number, Animal>, animalResponse) => {
              acc[animalResponse.data.id] = animalResponse.data;
              return acc;
            }, {});

            // Mettre à jour l'état avec les détails récupérés
            setRequestUserDetails(userDetailsMap);
            setRequestAnimalDetails(animalDetailsMap);
          };

          // Lancer la récupération des détails des utilisateurs et des animaux
          fetchFosterlingDetails();
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données:', error);
          setFetchError('Erreur lors de la récupération des données.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [connectedUser]);

  // Fonction pour gérer la confirmation de validation
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

  // Affichage du chargement ou des erreurs
  if (loading) return <p>Chargement...</p>;
  if (fetchError) return <p>{fetchError}</p>;

  return (
    <>
      <div>
        <h1 className='title'>Mes demandes</h1>
      </div>
      <section className="section">
        <div className='container'>
          <div className='notification is-info is-light'>
          {connectedUser && connectedUser.userType === 'association' ? (
            <p>Cette page liste les demandes d'adopion (ou d'accueil temporaire) concernant les animaux que vous avez enregistrés.</p>
          ) : (
            <p>Cette page liste les demandes d'adoption que vous avez formulées. Si l'une d'elles est validée, vous pourrez le voir dans le tableau.</p>
          )}
          </div>
        </div>
        <div className="container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Image</th>  
                <th>Nom animal</th>
                {connectedUser && connectedUser.userType === 'association' &&  <th>Nom demandeur</th>}
                <th>Statut</th>
                {connectedUser && connectedUser.userType === 'association' && <th>Valider</th>}
              </tr>
            </thead>
            <tbody>
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
                  {connectedUser && connectedUser.userType === 'association' &&<td>
                    <a href="#">
                      {requestUserDetails[item.users_id]?.name || 'Chargement...'}
                    </a>
                  </td>}
                  <td>
                    {item.request_status === 'Pending' && (<span className="tag is-warning">En attente</span>)}
                    {item.request_status === 'Rejected' && (<span className="tag is-danger">Rejetée</span>)}
                    {item.request_status === 'Approved' && (<span className="tag is-success">Validée</span>)}
                  </td>
                  {connectedUser && connectedUser.userType === 'association' && (
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

