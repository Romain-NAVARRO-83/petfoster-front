import axios from 'axios';
// import { useAuth } from '../../hooks/AuthContext';
// const { user: connectedUser } = useAuth();

const connectedUser = { id: 1 };

function MessengerItemList({ interlocutor, setCurrentChat }) {
  async function fetchDisscussion(
    connectedUserId: number,
    interlocutorId: number
  ) {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/connectedUser/${connectedUserId}/messages/interlocutor/${interlocutorId}`
      );

      if (response.status === 200) {
        setCurrentChat(response.data);
      } else {
        console.log('Discussion introuvable');
      }
    } catch (error) {
      console.log('Error catched : Discussion introuvable');
    }
  }

  return (
    <article
      className="box py-2 mb-3"
      onClick={() => {
        fetchDisscussion(connectedUser?.userId as number, interlocutor.id);
      }}
    >
      <div className="is-vcentered is-flex is-align-items-center is-justify-content-space-between">
        <div style={{ gap: '10px' }} className="is-flex is-align-items-center">
          <div className="messagerie-user-miniature is-narrow has-text-centered">
            <img
              src={`/img/utilisateurs/1-Alice Dupont-1.webp`}
              alt="Utilisateur"
              width="32"
              height="32"
            />
          </div>

          <p className="has-text-weight-bold is-size-6 has-text-left">
            {interlocutor.name}
          </p>
        </div>

        <p className="is-size-7 ">
          {connectedUser?.userId === interlocutor.last_message.user
            ? 'Vous'
            : interlocutor.last_message.user}
          - {interlocutor.last_message.date}
        </p>
      </div>
    </article>
  );
}

export default MessengerItemList;
