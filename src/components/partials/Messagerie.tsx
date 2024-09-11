import MessengerItemList from '../partials/MessengerItemList';
import Message from '../partials/Message';
import { useState } from 'react';

const messages12 = [
  {
    id: 1,
    sender_id: 1,
    content:
      "Bonjour, Nous sommes une famille d'accueil intéressée par l'accueil temporaire d'un animal. Nous avons un grand jardin et une maison spacieuse, et nous avons déjà de l'expérience avec les chiens. Serait-il possible d'avoir plus d'informations sur les animaux disponibles actuellement ?",
    created_at: '2024-09-09T14:45:33.503Z',
    receiver_id: 2,
  },
  {
    id: 2,
    sender_id: 2,
    content:
      "Merci pour votre intérêt à devenir famille d'accueil. Nous avons plusieurs chiens actuellement en attente d'une famille d'accueil. Parmi eux, nous avons un labrador nommé 'Max' qui a 3 ans et s'entend bien avec les autres animaux et les enfants. Seriez-vous disponibles pour un rendez-vous afin de discuter plus en détail de cet accueil ?",
    created_at: '2024-09-09T14:46:33.503Z',

    receiver_id: 1,
  },
  {
    id: 3,
    sender_id: 1,
    content:
      'Merci pour votre réponse. Max semble correspondre à ce que nous recherchons. Nous serions ravis de le rencontrer. Nous sommes disponibles ce vendredi après-midi. Cela conviendrait-il pour le rendez-vous ?',
    created_at: '2024-09-09T14:47:33.503Z',

    receiver_id: 2,
  },
  {
    id: 4,
    sender_id: 2,
    content:
      'Merci pour votre retour. Vendredi après-midi nous convient parfaitement. Le rendez-vous est confirmé pour 15h à notre refuge. Nous vous présenterons Max, et nous discuterons des détails concernant son séjour chez vous.',
    created_at: '2024-09-09T14:48:33.503Z',

    receiver_id: 1,
  },
  {
    id: 5,
    sender_id: 1,
    content:
      "Bonjour, Nous sommes une famille d'accueil intéressée par l'accueil temporaire d'un animal. Nous avons un grand jardin et une maison spacieuse, et nous avons déjà de l'expérience avec les chiens. Serait-il possible d'avoir plus d'informations sur les animaux disponibles actuellement ?",
    created_at: '2024-09-09T14:49:33.503Z',

    receiver_id: 2,
  },
  {
    id: 6,
    sender_id: 2,
    content:
      "Merci pour votre intérêt à devenir famille d'accueil. Nous avons plusieurs chiens actuellement en attente d'une famille d'accueil. Parmi eux, nous avons un labrador nommé 'Max' qui a 3 ans et s'entend bien avec les autres animaux et les enfants. Seriez-vous disponibles pour un rendez-vous afin de discuter plus en détail de cet accueil ?",
    created_at: '2024-09-09T14:50:33.503Z',

    receiver_id: 1,
  },
  {
    id: 7,
    sender_id: 1,
    content:
      'Merci pour votre réponse. Max semble correspondre à ce que nous recherchons. Nous serions ravis de le rencontrer. Nous sommes disponibles ce vendredi après-midi. Cela conviendrait-il pour le rendez-vous ?',
    created_at: '2024-09-09T14:51:33.503Z',

    receiver_id: 2,
  },
  {
    id: 8,
    sender_id: 2,
    content:
      'Merci pour votre retour. Vendredi après-midi nous convient parfaitement. Le rendez-vous est confirmé pour 15h à notre refuge. Nous vous présenterons Max, et nous discuterons des détails concernant son séjour chez vous.',
    created_at: '2024-09-09T14:51:33.503Z',

    receiver_id: 1,
  },
];
const messages13 = [
  {
    id: 9,
    sender_id: 1,
    content: 'Phrase 1',
    created_at: '2024-09-09T15:45:33.503Z',
    receiver_id: 3,
  },
  {
    id: 10,
    sender_id: 3,
    content: 'Phrase 2',
    created_at: '2024-09-09T15:46:33.503Z',

    receiver_id: 1,
  },
  {
    id: 11,
    sender_id: 1,
    content: 'Phrase 3',
    created_at: '2024-09-09T15:47:33.503Z',

    receiver_id: 3,
  },
  {
    id: 12,
    sender_id: 3,
    content: 'Phrase 4',
    created_at: '2024-09-09T15:48:33.503Z',

    receiver_id: 1,
  },
  {
    id: 13,
    sender_id: 1,
    content: 'Phrase 5',
    created_at: '2024-09-09T15:49:33.503Z',

    receiver_id: 3,
  },
  {
    id: 14,
    sender_id: 3,
    content: 'Phrase 6',
    created_at: '2024-09-09T15:50:33.503Z',

    receiver_id: 1,
  },
  {
    id: 15,
    sender_id: 1,
    content: 'Phrase 7',
    created_at: '2024-09-09T15:51:33.503Z',

    receiver_id: 3,
  },
  {
    id: 16,
    sender_id: 3,
    content: 'Phrase 8',
    created_at: '2024-09-09T15:51:33.503Z',

    receiver_id: 1,
  },
];

const users = [
  {
    id: 2,
    name: 'Marie Dubois',
    last_message: { user: 1, date: '2024-09-09T14:51:33.503Z' },
  },
  {
    id: 3,
    name: 'Jean Martin',
    last_message: { user: 3, date: '2024-09-09T15:51:33.503Z' },
  },
  {
    id: 3,
    name: 'Jean Martin',
    last_message: { user: 3, date: '2024-09-09T15:51:33.503Z' },
  },
  {
    id: 3,
    name: 'Jean Martin',
    last_message: { user: 3, date: '2024-09-09T15:51:33.503Z' },
  },
];

function Messagerie() {
  const [currentChat, setCurrentChat] = useState<any>(null);

  console.log(currentChat);

  return (
    <section className="section yellow-line">
      <h2 className="title">Vos messages</h2>
      <div className="columns container">
        <div className="column is-one-third messenger-item-list">
          {users &&
            users.map((item) => (
              <MessengerItemList
                interlocutor={item}
                setCurrentChat={setCurrentChat}
              />
            ))}
        </div>
        <div className="column">
          <div className="chat-window box is-flex is-flex-direction-column-reverse">
            {currentChat
              ? currentChat.map((item) => <Message message={item} />)
              : 'Selectionnez une discussion'}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Messagerie;
