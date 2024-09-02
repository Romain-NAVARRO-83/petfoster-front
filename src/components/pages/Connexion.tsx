import { Container, Section, Box, Tabs, Button } from 'react-bulma-components';

const LoginPage = () => {

  return (

    <Section>

        <Container>

            <Tabs align="center">

                <Tabs.Tab active>Connexion</Tabs.Tab>
                <Tabs.Tab>Créer un compte</Tabs.Tab>

            </Tabs>

            
            <Box>
                
                <form>

                    <div className="field">

                        <label className="label" htmlFor="email">Adresse mail</label>

                        <div className="control">
                            <input className="input" type="email" id="email" placeholder="Adresse mail" required />
                        </div>
                        
                    </div>

                    <div className="field">

                        <label className="label" htmlFor="password">Mot de passe</label>

                        <div className="control">
                            <input className="input" type="password" id="password" placeholder="Mot de passe" required />
                        </div>

                    </div>

                    <div className="field">

                        <div className="control">
                            <Button color="primary" fullwidth>Connexion</Button>
                        </div>

                        <div className="has-text-centered">
                            <a href="#">Mot de passe oublié?</a>
                        </div>

                    </div>

                </form>

            </Box>

            <div className="has-text-centered">
                <img className="image is-128x128" src="-" alt="Logo" />
            </div>

        </Container>

    </Section>

  );

};

export default LoginPage;