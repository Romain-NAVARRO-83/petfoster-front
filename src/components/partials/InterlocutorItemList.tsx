import { useAuth } from '../../hooks/AuthContext';
import dayjs from 'dayjs';

function InterlocutorItemList({
  interlocutorLastMessage,
  setCurrentInterlocutor,
  fetchDisscussion,
}) {
  const { user: connectedUser } = useAuth();

  return (
    <article
      className="box py-2 mb-3"
      onClick={() => {
        fetchDisscussion(
          connectedUser?.userId as number,
          interlocutorLastMessage.interlocutorId
        );
        setCurrentInterlocutor(interlocutorLastMessage.interlocutorId);
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
            {interlocutorLastMessage.interlocutorName}
          </p>
        </div>

        <p className="is-size-7 ">
          {connectedUser?.userId === interlocutorLastMessage.sender_id
            ? 'Vous'
            : interlocutorLastMessage.interlocutorName}{' '}
          - {dayjs(interlocutorLastMessage.created_at).format(' D MMM. YYYY')}
        </p>
      </div>
    </article>
  );
}

export default InterlocutorItemList;
