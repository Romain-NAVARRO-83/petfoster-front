import { Section, Container, Heading, Content, Image, Footer } from 'react-bulma-components';

const AboutUs: React.FC = () => {

    return (

        <>

            <Section>

                <Container>

                    <Heading size={1} textAlign="center">QUI SOMMES-NOUS ?</Heading>

                    <Content>

                        <Heading size={4}>Notre identité</Heading>

                        <p>
                            Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                            Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme
                            assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                            Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son
                            contenu n'en soit modifié.
                        </p>
                        
                    </Content>

                    <Content className="has-background-warning p-5">

                        <Heading size={4}>Nos engagements</Heading>

                        <Image src="https://via.placeholder.com/128x128.png?text=Logo" alt="Logo" size={128} style={{ display: 'inline-block' }} />

                        <p>
                            Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                            Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme
                            assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                            Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son
                            contenu n'en soit modifié.
                        </p>

                    </Content>

                    <Content className="mt-6">

                        <Heading size={4}>FOIRE AUX QUESTIONS</Heading>

                        <p>
                            Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                            Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme
                            assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                            Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son
                            contenu n'en soit modifié.
                        </p>

                    </Content>

                </Container>

            </Section>

            <Footer>

                <Content textAlign="center">

                    <p><strong>Information site</strong></p>
                    <p><a href="#">Qui sommes-nous ?</a></p>
                    <p><a href="#">Accessibilité</a></p>
                    <p><a href="#">Nous contacter</a></p>
                    <p><a href="#">Vie privée / Cookies</a></p>

                </Content>

            </Footer>

        </>

    );

};

export default AboutUs;