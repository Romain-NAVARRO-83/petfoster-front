import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/AuthContext';
import { User } from 'src/@interfaces/user';

const FilterPage = () => {
  const [myUser, setMyUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { user: connectedUser } = useAuth(); 
  const [requestUserDetails, setRequestUserDetails] = useState({}); // État pour stocker les détails des utilisateurs liés aux demandes de famille d'accueil
  const [requestAnimalDetails, setRequestAnimalDetails] = useState({}); // État pour stocker les détails des animaux liés aux demandes de famille d'accueil

  // État pour gérer la configuration du tri
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Utilisation d'un effet pour récupérer les données de l'utilisateur connecté
  useEffect(() => {
    if (connectedUser) {
      console.log(connectedUser)
      // Requête pour récupérer les données de l'utilisateur connecté
      axios
        .get(`http://localhost:3000/api/users/${connectedUser.userId}`) 
        .then((response) => {
          const userData = response.data;
          setMyUser(userData); // Stocker les données de l'utilisateur
          setLoading(false);

          // Fonction asynchrone pour récupérer les détails des utilisateurs et des animaux liés aux demandes
          const fetchFosterlingDetails = async () => {
            const userRequests = userData.fosterlingRequests || [];

            // Promesses pour récupérer les détails des utilisateurs liés aux demandes
            const userDetailsPromises = userRequests.map((request) =>
              axios.get(`http://localhost:3000/api/users/${request.users_id}`)
            );

            // Promesses pour récupérer les détails des animaux liés aux demandes
            const animalDetailsPromises = userRequests.map((request) =>
              axios.get(`http://localhost:3000/api/animals/${request.animals_id}`)
            );

            // Attendre que toutes les requêtes soient terminées
            const userDetailsResponses = await Promise.all(userDetailsPromises);
            const animalDetailsResponses = await Promise.all(animalDetailsPromises);

            // Créer un objet pour stocker les détails des utilisateurs en fonction de leur id
            const userDetailsMap = userDetailsResponses.reduce((acc, userResponse) => {
              acc[userResponse.data.id] = userResponse.data; // Associer les détails de l'utilisateur par id
              return acc;
            }, {});

            // Créer un objet pour stocker les détails des animaux en fonction de leur id
            const animalDetailsMap = animalDetailsResponses.reduce((acc, animalResponse) => {
              acc[animalResponse.data.id] = animalResponse.data; // Associer les détails de l'animal par id
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

  // Fonction pour trier les demandes en fonction de la clé sélectionnée
  const sortedData = React.useMemo(() => {
    if (!myUser || !myUser.fosterlingRequests) return [];

    let sortableData = [...myUser.fosterlingRequests];

    if (sortConfig !== null && sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [myUser, sortConfig]);

  // Fonction pour gérer les clics de tri sur les colonnes
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Fonction pour gérer la confirmation de validation
  const handleConfirm = () => {
    if (window.confirm('Êtes-vous sûr de vouloir valider ?')) {
      // Logique de confirmation ici
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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quisquam, commodi, atque dolorum delectus aspernatur perferendis magnam corrupti totam, suscipit ipsa nam impedit corporis accusantium molestias quia obcaecati esse eligendi.
            </p>
          </div>
        </div>
        <div className="container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Image</th>  
                <th>
                  <button className="button is-ghost" onClick={() => requestSort('animal')}>
                    Nom animal
                  </button>
                </th>
                <th>
                  <button className="button is-ghost" onClick={() => requestSort('demandeur')}>
                    Nom demandeur
                  </button>
                </th>
                <th>
                  <button className="button is-ghost" onClick={() => requestSort('statut')}>
                    Statut
                  </button>
                </th>
                <th>Valider</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <figure className="image is-48x48">
                      <img src={`/img/animaux/${requestAnimalDetails[item.animals_id]?.pictures[0]?.URL_picture}`} alt={requestAnimalDetails[item.animals_id]?.name} width="64"
            height="64"/>
                    </figure>
                  </td>
                  <td>
                    <a href={`/animal/${requestAnimalDetails[item.animals_id]?.id}`}>{requestAnimalDetails[item.animals_id]?.name || 'Chargement...'}</a>
                  </td>
                  <td>
                    <a href="#">
                      {requestUserDetails[item.users_id] ? requestUserDetails[item.users_id].name : 'Chargement...'}
                    </a>
                  </td>
                  <td>
                    {item.request_status === 'Pending' && (<span className="tag is-warning">En attente</span>)}
                    {item.request_status === 'Rejected' && (<span className="tag is-danger">Rejetée</span>)}
                    {item.request_status === 'Approved' && (<span className="tag is-success">Validée</span>)}
                    </td>
                  <td>
                    <button className="button is-primary" onClick={handleConfirm}>
                      Valider
                    </button>
                  </td>
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
