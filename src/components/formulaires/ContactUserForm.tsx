import { useState } from 'react';
import axios from 'axios';
interface ContactUserFormProps {
  senderId: number | null;   
  receiverId: number | null; 
}

function ContactUserForm({ senderId, receiverId }: ContactUserFormProps) {

  const [formData, setFormData] = useState({
    messageContent: '',
    senderId,    
    receiverId,  
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
    console.log("Sender ID:", senderId, "Receiver ID:", receiverId);
    try {
      await axios.post('http://localhost:300/api/messages', formData);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='title'>Envoyer un message</h3>
      <p>Sender : {senderId}</p>
      <p>Reciever : {receiverId}</p>
      <textarea
        name="messageContent"
        value={formData.messageContent}
        onChange={handleChange}
        placeholder="Tapez votre message"
        className='textarea'
      />
      <input type="hidden" value={senderId} name="sender_id"/>
      <input type="hidden" value={receiverId} name="reciever_id"/>
      <button type="submit" className='button is-primary is-fullwidth'>Envoyer le message</button>
    </form>
  );
}

export default ContactUserForm;
