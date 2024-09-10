import { useState, useEffect } from 'react';
import { useToast } from '../../hooks/ToastContext';
import { useModal } from '../../hooks/ModalContext';
import axios from 'axios';
interface ContactUserFormProps {
  senderId: number | null;   
  receiverId: number | null; 
}

function ContactUserForm({ senderId, receiverId }: ContactUserFormProps) {
  // CSRF TOKEN
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
    sender_id:senderId,    
    receiver_id:receiverId,  
  });

  // Gestion des changements dans le champ texte
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  const handleSubmit = async (e) => {
    // console.log(formData);
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:3000/api/messages', formData, {
        headers: {
          'x-xsrf-token': csrfToken || '',
        },
      });
      showSuccessToast('Message envoyé avec succès!');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message', error);
      showErrorToast('Erreur lors de l\'envoi du message.');
    }
  };


  // Toasts de submit
  const { showSuccessToast, showErrorToast } = useToast();
  const { closeModal } = useModal();
  return (
    <form onSubmit={handleSubmit}>
      <h3 className='title'>Envoyer un message</h3>
      <p>Sender : {senderId}</p>
      <p>Reciever : {receiverId}</p>
      <textarea
        name="content"
        id="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Tapez votre message"
        className='textarea'
      />
      <input type="hidden" value={senderId} name="sender_id" id="sender_id"/>
      <input type="hidden" value={receiverId} name="reciever_id" id="reciever_id"/>
      <button type="submit" className='button is-primary is-fullwidth'>Envoyer le message</button>
    </form>
  );
}

export default ContactUserForm;
