import InterlocutorItemList from './InterlocutorItemList';
import Message from '../partials/Message';
import ContactUserMessagerieForm from '../formulaires/ContactUserMessagerieForm';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import axios from 'axios';

// const interlocutors = [
//   {
//     id: 2,
//     name: 'Marie Dubois',
//     last_message: { user: 1, date: '2024-09-09T14:51:33.503Z' },
//   },
//   {
//     id: 3,
//     name: 'Jean Martin',
//     last_message: { user: 3, date: '2024-09-09T15:51:33.503Z' },
//   },
//   {
//     id: 4,
//     name: 'John Snow',
//     last_message: { user: 3, date: '2024-09-09T15:51:33.503Z' },
//   },
//   {
//     id: 5,
//     name: 'Clive Rosfield',
//     last_message: { user: 3, date: '2024-09-09T15:51:33.503Z' },
//   },
// ];

interface MessageType {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: Date;
  is_read: boolean;
  updated_at: Date;
}

function Messagerie() {
  const { user: connectedUser } = useAuth();
  const [interlocutorsLastMessage, setInterlocutorsLastMessage] =
    useState<any>(null); // TODO Typage

  const [currentInterlocutor, setCurrentInterlocutor] = useState<number | null>(
    null
  ); // TODO Typage

  const [currentChat, setCurrentChat] = useState<MessageType[] | null>(null); // TODO Typage

  useEffect(() => {
    if (connectedUser) {
      async function fetchInterlocutors() {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/connectedUser/${connectedUser?.userId}/messages`
          );

          if (response.status === 200) {
            setInterlocutorsLastMessage(response.data);
          }
        } catch (error) {
          console.log('Error catched : Interlocuteurs introuvables');
        }
      }

      fetchInterlocutors();
    }
  }, [connectedUser]);

  async function fetchDisscussion(
    connectedUserId: number,
    interlocutorId: number
  ) {
    try {
      const response = await axios.get(
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

  // const scrollable = useRef(null);
  // useEffect(() => {
  //   if (scrollable.current) {
  //     scrollable.current.scrollTop = scrollable.current.scrollHeight;
  //   }
  // }, []);

  return (
    <section className="section yellow-line">
      <h2 className="title">Vos messages</h2>
      <div className="columns container">
        <div className="column is-one-third messenger-item-list">
          {interlocutorsLastMessage &&
            interlocutorsLastMessage.map((item) => (
              <InterlocutorItemList
                interlocutorLastMessage={item}
                key={item.id}
                setCurrentInterlocutor={setCurrentInterlocutor}
                fetchDisscussion={fetchDisscussion}
              />
            ))}
        </div>
        <div className="column">
          <div
            className="chat-window box is-flex is-flex-direction-column-reverse"
            // ref={scrollable}
          >
            {currentChat
              ? currentChat.map((item) => <Message message={item} key={item.id}/>)
              : 'Selectionnez une discussion'}
          </div>

          {currentInterlocutor && (
            <div className="box">
              <ContactUserMessagerieForm
                senderId={connectedUser?.userId}
                receiverId={currentInterlocutor}
                fetchDisscussion={fetchDisscussion}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Messagerie;
