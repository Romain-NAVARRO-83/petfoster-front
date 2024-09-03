import { Container, Section, Box, Button, Heading } from 'react-bulma-components';

const ContactPage = () => {

  return (

    <Section>

      <Container>
        
        <Heading size={4}>FORMULAIRE DE CONTACT</Heading>

        <Box>

          <form action="#" method="post">

            <div className="field">

              <label className="label" htmlFor="nom">Nom</label>

              <div className="control">
                <input className="input" type="text" id="nom" name="nom" placeholder="Votre nom" required />
              </div>

            </div>

            <div className="field">

              <label className="label" htmlFor="email">Email</label>

              <div className="control">
                <input className="input" type="email" id="email" name="email" placeholder="Votre adresse email" required />
              </div>

            </div>

            <div className="field">

              <label className="label" htmlFor="message">Message</label>

              <div className="control">
                <textarea className="textarea" id="message" name="message" placeholder="Votre message" required></textarea>
              </div>

            </div>

            <div className="field">

              <div className="control">
                <Button color="primary">Soumettre</Button>
              </div>

            </div>

          </form>

        </Box>

        <Heading size={4}>INFORMATIONS PRATIQUES</Heading>

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

      </Container>

    </Section>

  );

};

export default ContactPage;