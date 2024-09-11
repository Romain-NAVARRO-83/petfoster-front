const connectedUser = { id: 1 };

function Message({ message }) {
  return (
    <>
      {message.sender_id === connectedUser.id ? (
        <div className="container-sent-message" id="message envoyé">
          <p className="box">{message.content}</p>
          <p className=" issue-date has-text-right">{message.created_at}</p>
        </div>
      ) : (
        <div className="container-received-message" id="message reçu">
          <p className="box">{message.content}</p>
          <p className="issue-date">{message.created_at}</p>
        </div>
      )}
    </>
  );
}

export default Message;
