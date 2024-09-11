import { Section, Container, Heading, Button } from 'react-bulma-components';

function Error404() {

  return (

    <>

      <div><Heading>Page non trouvée</Heading></div>

      <Section>

        <Container textAlign="centered">

          <p >Oups ! La page que vous recherchez n'existe pas. </p>

          <Button color="primary" renderAs="a" href="/">
            Retour à l'accueil
          </Button>

        </Container>

      </Section>
      
    </>

  );
  
}

export default Error404;