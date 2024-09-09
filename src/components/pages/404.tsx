// del
import { Section, Container, Heading, Button } from 'react-bulma-components';

function Error404() {

  return (
    <>
<div><Heading>Page non trouvée</Heading></div>
    <Section>

      <Container textAlign="centered">

        

        <p >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum necessitatibus nihil exercitationem ex officiis itaque officia vero veritatis, consequuntur aut.
        </p>

        <Button color="primary" renderAs="a" href="/">
          Retour à l'accueil
        </Button>

      </Container>

    </Section>
    </>

  );
  
}

export default Error404;