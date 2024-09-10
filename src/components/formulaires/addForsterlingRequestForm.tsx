import { useState, useEffect } from 'react';
import { useToast } from '../../hooks/ToastContext';
import { useModal } from '../../hooks/ModalContext';
import axios from 'axios';

interface AddFosterlingRequestFormProps {
  senderId: number | null;    // ID de l'expéditeur
  animalId: number | null;    // ID de l'animal
}

function AddFosterlingRequestForm({ senderId, animalId }: AddFosterlingRequestFormProps) {
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
    sender_id: senderId || null,    // Utiliser senderId passé en prop
    animal_id: animalId || null,    // Utiliser animalId passé en prop
  });

  // Gestion des changements dans le champ texte
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:3000/api/messages', formData, {
        headers: {
          'x-xsrf-token': csrfToken || '', // Inclure le token CSRF dans les headers
        },
      });
      showSuccessToast('Message envoyé avec succès!');
      closeModal(); // Fermer la modal après succès
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
      <h3 className='title'>Demander à accueillir l'animal</h3>
      <p>Demandeur : {senderId}</p>
      <p>Animal : {animalId}</p>
      <textarea
        name="content"
        id="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Tapez votre message"
        className='textarea'
      />
      {/* Champs cachés pour l'expéditeur et le destinataire */}
      <input type="hidden" value={senderId || ''} name="sender_id" id="sender_id"/>
      <input type="hidden" value={animalId || ''} name="animal_id" id="animal_id"/>
      <button type="submit" className='button is-primary is-fullwidth'>Envoyer le message</button>
    </form>
  );
}

export default AddFosterlingRequestForm;
