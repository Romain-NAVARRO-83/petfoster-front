import { Section, Container, Heading, Button } from 'react-bulma-components';

function Error404() {

  return (

    <Section>

      <Container textAlign="centered">

        <Heading size={1}>Page non trouvée</Heading>

        <Heading subtitle size={5}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum necessitatibus nihil exercitationem ex officiis itaque officia vero veritatis, consequuntur aut.
        </Heading>

        <Button color="primary" renderAs="a" href="/">
          Retour à l'accueil
        </Button>

      </Container>

    </Section>

  );
  
}

export default Error404;