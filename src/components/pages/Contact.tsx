import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     nom: '',
//     email: '',
//     message: ''
//   });

//   const [errorMessage, setErrorMessage] = useState('');

//   const navigate = useNavigate();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const apiUrl = 'https://ton-api-backend.com/send-email';

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     });

  //     if (response.ok) {
  //       navigate('/');
  //     } else {
  //       setErrorMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.');
  //     }
  //   } catch (error) {
  //     setErrorMessage('Erreur lors de l\'envoi du message. Veuillez vérifier votre connexion.');
  //   }
  // };

  return (
    <>
    <div><h1 className="title mb-5">Contactez-nous</h1>
      </div>
    <section className="section contact-page">
      
      <div className="container">
        
        {/* {errorMessage && <p className="has-text-danger">{errorMessage}</p>} */}

        <div className="columns">
          {/* Formulaire de contact */}
          <div className="column is-half">
            <h4 className="title is-4">Formulaire de contact</h4>
            <div className="box">
              <form 
              // onSubmit={handleSubmit}
              >
                <div className="field">
                  <label className="label" htmlFor="nom">Nom</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      id="nom"
                      name="nom"
                      placeholder="Votre nom"
                      // value={formData.nom}
                      // onChange={handleChange}
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
                      // value={formData.email}
                      // onChange={handleChange}
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
                      // value={formData.message}
                      // onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <button className="button is-primary" type="submit">Soumettre</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Informations pratiques */}
          <div className="column is-half">
            <h4 className="title is-4">Informations pratiques</h4>

            <p><strong>Email</strong></p>
            <p><a href="mailto:petfoster@gmail.com">petfoster@gmail.com</a></p>

            <p><strong>Adresse</strong></p>
            <p>202 Avenue de la République<br />28000 Chartres</p>

            <p><strong>Téléphone</strong></p>
            <p><a href="tel:+33237234000">+33 2 37 23 40 00</a></p>

            {/* <div className="box">
              <figure className="image is-16by9">
                <img src="#" alt="Carte de l'emplacement" />
              </figure>
            </div> */}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactPage;
