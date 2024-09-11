import { Section, Container, Heading, Content, Box } from 'react-bulma-components';

const AboutUs: React.FC = () => {
  return (
    <>
      {/* Section d'introduction */}
      <Section>
        <Container>
          <Heading size={1} className="has-text-centered mb-5">
            QUI SOMMES-NOUS ?
          </Heading>
          <Content className="has-text-centered">
            <p className="has-text-white">
              Bienvenue sur notre page à propos. Nous sommes une équipe dédiée à fournir des solutions innovantes pour l'adoption et la gestion des animaux.
            </p>
          </Content>
        </Container>
      </Section>
      
      {/* Notre identité */}
      <Section>
        <Container>
          <Box className="has-background-warning p-5">
            <Heading size={3} className="has-text-centered mb-4">Notre identité</Heading>
            <div className="columns is-vcentered">
              <div className="column is-half has-text-centered">
                <Content className="is-size-5 has-text-white">
                  <p>
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                    Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla
                    ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                  </p>
                </Content>
              </div>
            </div>
          </Box>
        </Container>
      </Section>

      {/* Nos engagements */}
      <Section>
        <Container>
          <Box className="has-background-warning p-5">
            <Heading size={3} className="has-text-centered mb-4">Nos engagements</Heading>
            <div className="columns is-vcentered">
              <div className="column is-half has-text-centered">
                <Content className="is-size-5 has-text-white">
                  <p>
                    Nous nous engageons à offrir un service de qualité, centré sur le bien-être des animaux et la satisfaction des familles d'accueil.
                    Notre équipe travaille main dans la main avec des associations pour garantir une adoption responsable et respectueuse des animaux.
                  </p>
                </Content>
              </div>
            </div>
          </Box>
        </Container>
      </Section>

      {/* Foire aux questions */}
      <Section>
        <Container>
          <Box className="has-background-warning p-5">
            <Heading size={3} className="has-text-centered mb-4">Foire aux questions (FAQ)</Heading>
            <div className="columns is-vcentered">
              <div className="column is-half has-text-centered">
                <Content className="is-size-5 has-text-white">
                  <p>
                    Vous avez des questions ? Consultez notre FAQ pour en savoir plus sur nos services, nos procédures et les réponses à vos interrogations courantes.
                  </p>
                  <ul className="mt-4">
                    <li className="has-text-white">Comment fonctionne le processus d'adoption ? Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li className="has-text-white">Quels types d'animaux sont disponibles ? Nullam convallis elit nec interdum ultrices.</li>
                    <li className="has-text-white">Comment puis-je devenir une famille d'accueil ? Maecenas consequat urna ut tortor pharetra vehicula.</li>
                  </ul>
                </Content>
              </div>
            </div>
          </Box>
        </Container>
      </Section>
    </>
  );
};

export default AboutUs;


