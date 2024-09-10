import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/AuthContext';
import { User } from 'src/@interfaces/user';

const FilterPage = () => {
  const [myUser, setMyUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { user: connectedUser } = useAuth(); 

  // State for sorting configuration
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    if (connectedUser) {
      axios
        .get(`http://localhost:3000/api/users/${connectedUser.userId}`) 
        .then((response) => {
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

  // Sorting functionality applied to fosterlingRequests
  const sortedData = React.useMemo(() => {
    if (!connectedUser || !connectedUser.fosterlingRequests) return [];

    let sortableData = [...connectedUser.fosterlingRequests];

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
  }, [connectedUser, sortConfig]);

  // Request sorting based on column clicked
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleConfirm = () => {
    if (window.confirm('Êtes-vous sûr de vouloir valider ?')) {
      // Confirmation logic here
    }
  };

  if (loading) return <p>Loading...</p>;
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
                      <img src="avatar_placeholder.png" alt="Avatar" />
                    </figure>
                  </td>
                  <td>
                    <a href="#">{item.animal}</a>
                  </td>
                  <td>
                    <a href="#">{item.demandeur}</a>
                  </td>
                  <td>{item.statut}</td>
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
