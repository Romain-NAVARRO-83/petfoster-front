import { useState, useEffect } from 'react';
import axios from 'axios';

interface ContactUserFormProps {
  senderId: number | null;    // ID de l'expéditeur
  receiverId: number | null;  // ID du destinataire
}

function ContactUserForm({ senderId, receiverId }: ContactUserFormProps) {
  // Récupérer le token CSRF pour la requête sécurisée
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/csrf-token');
        setCsrfToken(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const [formData, setFormData] = useState({
    content: '',
    sender_id: senderId,    // Expéditeur
    receiver_id: receiverId,  // Destinataire
  });

  // Gestion des changements dans le champ texte
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post('http://localhost:3000/api/messages', formData, {
        headers: {
          'x-xsrf-token': csrfToken || '', // Inclure le token CSRF dans les headers
        },
      });
      console.log("Message envoyé avec succès");
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='title'>Envoyer un message</h3>
      <p>Expéditeur : {senderId}</p>
      <p>Destinataire : {receiverId}</p>
      <textarea
        name="content"
        id="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Tapez votre message"
        className='textarea'
      />
      <input type="hidden" value={senderId || ''} name="sender_id" id="sender_id"/>
      <input type="hidden" value={receiverId || ''} name="receiver_id" id="receiver_id"/>
      <button type="submit" className='button is-primary is-fullwidth'>Envoyer le message</button>
    </form>
  );
}

export default ContactUserForm;

