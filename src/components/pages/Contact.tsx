import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate pour la redirection
import { Container, Section, Box, Button, Heading, Columns } from 'react-bulma-components';

const ContactPage = () => {
  // États pour capturer les valeurs des champs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Hook pour la navigation
  const navigate = useNavigate();

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remplace cette URL par celle de ton API ou service d'envoi d'email
    const apiUrl = 'https://ton-api-backend.com/send-email';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Si le message a été envoyé avec succès, redirige vers la page d'accueil
        navigate('/'); // Redirige vers la page principale
      } else {
        setErrorMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      }
    } catch (error) {
      setErrorMessage('Erreur lors de l\'envoi du message. Veuillez vérifier votre connexion.');
    }
  };

  return (
    <Section className="contact-page">
      <Container>
        
        <Heading size={3} className="has-text-centered mb-5">Contactez-nous</Heading>

        {errorMessage && <p className="has-text-danger">{errorMessage}</p>}

        <Columns>
          {/* Formulaire de contact */}
          <Columns.Column size={6}>
            <Heading size={4}>Formulaire de contact</Heading>
            <Box>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label" htmlFor="nom">Nom</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      id="nom"
                      name="nom"
                      placeholder="Votre nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="email">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Votre adresse email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="message">Message</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      id="message"
                      name="message"
                      placeholder="Votre message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <Button color="primary" type="submit">Soumettre</Button>
                  </div>
                </div>
              </form>
            </Box>
          </Columns.Column>

          {/* Informations pratiques */}
          <Columns.Column size={6}>
            <Heading size={4}>Informations pratiques</Heading>

            <p><strong>Email</strong></p>
            <p><a href="mailto:petfoster@gmail.com">petfoster@gmail.com</a></p>

            <p><strong>Adresse</strong></p>
            <p>202 Avenue de la République<br />28000 Chartres</p>

            <p><strong>Téléphone</strong></p>
            <p><a href="tel:+33237234000">+33 2 37 23 40 00</a></p>

            <Box>
              <figure className="image is-16by9">
                <img src="#" alt="Carte de l'emplacement" />
              </figure>
            </Box>
          </Columns.Column>
        </Columns>
        
      </Container>
    </Section>
  );
};

export default ContactPage;


