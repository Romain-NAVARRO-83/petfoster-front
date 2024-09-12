import { useAuth } from '../../hooks/AuthContext';
import dayjs from 'dayjs';

// const connectedUser = { id: 1 };

function Message({ message }) {
  const { user: connectedUser } = useAuth();

  const issueDate = dayjs(message.created_at).format('D MMM. YYYY - H:mm');
  console.log(issueDate);

  return (
    <>
      {message.sender_id === connectedUser?.userId ? (
        <div className="container-sent-message" id="message envoyé">
          <p className="box">{message.content}</p>
          <p className="issue-date has-text-right">{issueDate}</p>
        </div>
      ) : (
        <div className="container-received-message" id="message reçu">
          <p className="box">{message.content}</p>
          <p className="issue-date">{issueDate}</p>
        </div>
      )}
    </>
  );
}

export default Message;
