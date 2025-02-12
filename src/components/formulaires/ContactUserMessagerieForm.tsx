import { useState, useEffect } from 'react';
import { useToast } from '../../hooks/ToastContext';
import instanceAxios from '../../../axiosSetup/axiosSetup';

interface ContactUserFormProps {
  senderId: number | null;
  receiverId: number | null;
  fetchDisscussion: (senderId: number, receiverId: number) => void;
}

function ContactUserMessagerieForm({
  senderId,
  receiverId,
  fetchDisscussion,
}: ContactUserFormProps) {
  // Récupérer le token CSRF pour la requête sécurisée
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await instanceAxios.get('/csrf-token');
        setCsrfToken(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const [formData, setFormData] = useState({
    content: '',
    // sender_id: senderId, // Expéditeur
    // receiver_id: receiverId, // Destinataire
  });

  useEffect(() => {
    setFormData({
      content: '',
    });
  }, [receiverId]);

  // Gestion des changements dans le champ texte
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log(formData);
    e.preventDefault();

    try {
      await instanceAxios.post(
        '/messages',
        {
          content: formData.content,
          sender_id: senderId,
          receiver_id: receiverId,
        },
        {
          headers: {
            'x-xsrf-token': csrfToken || '', // Inclure le token CSRF dans les headers
          },
        }
      );
      showSuccessToast('Message envoyé avec succès!');
      if (senderId !== null && receiverId !== null) {
        fetchDisscussion(senderId, receiverId);
      } else {
        console.error("Erreur : senderId ou receiverId est null", { senderId, receiverId });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
      showErrorToast("Erreur lors de l'envoi du message.");
    }
  };

  {
    console.log(receiverId);
  }

  // Toasts de submit
  const { showSuccessToast, showErrorToast } = useToast();
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="content"
        id="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Tapez votre message"
        className="textarea"
      />
      {/* <input
        type="hidden"
        value={senderId || ''}
        name="sender_id"
        id="sender_id"
      />
      <input
        type="hidden"
        value={receiverId || ''}
        name="receiver_id"
        id="receiver_id"
      /> */}
      <button type="submit" className="button is-primary is-fullwidth mt-3">
        Envoyer le message
      </button>
    </form>
  );
}

export default ContactUserMessagerieForm;
