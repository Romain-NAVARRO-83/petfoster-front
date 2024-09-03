import { Heading, Dropdown, Icon, Button } from "react-bulma-components";
import "./TrouverAnimal.css";

function TrouverAnimal() {


    return (
        <main>
            <div>
                <Heading>Trouver un animal</Heading>
            </div>
            <section className="section">
                <div className="container box">
                    <Heading subtitle>Affinez votre recherche</Heading>
                    <div className="is-flex is-justify-content-center is-align-items-center">

                        <div className="mx-6">
                            <Dropdown
                                closeOnSelect={false}
                                color=""
                                icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
                                label="Espèce"
                            >
                                <Dropdown.Item
                                    renderAs="a" value="Toutes">Toutes</Dropdown.Item>
                                <Dropdown.Item
                                    renderAs="a" value="chien">Chien</Dropdown.Item>
                                <Dropdown.Item
                                    renderAs="a" value="Chat">Chat</Dropdown.Item>
                            </Dropdown>
                        </div>

                        <div className="mx-6">
                            <Dropdown
                                closeOnSelect={false}
                                color=""
                                icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
                                label="Age"
                            >

                                <Dropdown.Item
                                    renderAs="a" value="Moins d'1 an">Moins d'1 an </Dropdown.Item>
                                <Dropdown.Item
                                    renderAs="a" value="Entre 1 an et 3 ans">Entre 1 an et 3 an</Dropdown.Item>
                                <Dropdown.Item
                                    renderAs="a" value="Entre 3 ans et 6 ans">Entre 3 ans et 6 ans</Dropdown.Item>
                                <Dropdown.Item
                                    renderAs="a" value="Plus de 6 ans">Plus de 6 ans</Dropdown.Item>
                            </Dropdown>
                        </div>

                        <div className="mx-6">
                            <Dropdown
                                closeOnSelect={false}
                                color=""
                                icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
                                label="Sexe"
                            >
                                <Dropdown.Item
                                    renderAs="a" value="Tous">Tous</Dropdown.Item>
                                <Dropdown.Item
                                    renderAs="a" value="Mâle">Mâle</Dropdown.Item>
                                <Dropdown.Item
                                    renderAs="a" value="Femelle">Femelle</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container columns">

                    <div className="column is-full-mobile is-full-tablet is-half-desktop">
                        <article className="box">
                            <div className="columns is-vcentered">
                                {/* Conteneur pour l'image */}
                                <div className="column is-narrow has-text-centered">
                                    <figure className="image is-128x128 is-inline-block">
                                        <img className="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Animal" />
                                    </figure>
                                </div>

                                {/* Conteneur pour le texte et les textarea  */}
                                <div className="column is-narrow">
                                    <p className="has-text-weight-bold has-text-left">Nom animal</p>
                                    <textarea
                                        className="textarea mt-2" placeholder="Espèce" rows="1"></textarea>
                                    <textarea
                                        className="textarea mt-2" placeholder="Age" rows="1"></textarea>
                                    <textarea className="textarea mt-2" placeholder="Sexe" rows="1"></textarea>
                                </div>

                                {/* Conteneur pour le bouton */}
                                <div className="column is-narrow has-text-centered">
                                    <Button color="info" className="mt-4" renderAs="span">Voir</Button>
                                </div>
                            </div>
                        </article>

                        <article className="box">
                            <div className="columns is-vcentered">
                                {/* Conteneur pour l'image */}
                                <div className="column is-narrow has-text-centered">
                                    <figure className="image is-128x128 is-inline-block">
                                        <img className="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Animal" />
                                    </figure>
                                </div>

                                {/* Conteneur pour le texte et les textarea  */}
                                <div className="column is-narrow">
                                    <p className="has-text-weight-bold has-text-left">Nom animal</p>
                                    <textarea
                                        className="textarea mt-2" placeholder="Espèce" rows="1"></textarea>
                                    <textarea
                                        className="textarea mt-2" placeholder="Age" rows="1"></textarea>
                                    <textarea className="textarea mt-2" placeholder="Sexe" rows="1"></textarea>
                                </div>

                                {/* Conteneur pour le bouton */}
                                <div className="column is-narrow has-text-centered">
                                    <Button color="info" className="mt-4" renderAs="span">Voir</Button>
                                </div>
                            </div>
                        </article>

                        <article className="box">
                            <div className="columns is-vcentered">
                                {/* Conteneur pour l'image */}
                                <div className="column is-narrow has-text-centered">
                                    <figure className="image is-128x128 is-inline-block">
                                        <img className="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Animal" />
                                    </figure>
                                </div>

                                {/* Conteneur pour le texte et les textarea  */}
                                <div className="column is-narrow">
                                    <p className="has-text-weight-bold has-text-left">Nom animal</p>
                                    <textarea
                                        className="textarea mt-2" placeholder="Espèce" rows="1"></textarea>
                                    <textarea
                                        className="textarea mt-2" placeholder="Age" rows="1"></textarea>
                                    <textarea className="textarea mt-2" placeholder="Sexe" rows="1"></textarea>
                                </div>

                                {/* Conteneur pour le bouton */}
                                <div className="column is-narrow has-text-centered">
                                    <Button color="info" className="mt-4" renderAs="span">Voir</Button>
                                </div>
                            </div>
                        </article>

                        <article className="box">
                            <div className="columns is-vcentered">
                                {/* Conteneur pour l'image */}
                                <div className="column is-narrow has-text-centered">
                                    <figure className="image is-128x128 is-inline-block">
                                        <img className="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Animal" />
                                    </figure>
                                </div>

                                {/* Conteneur pour le texte et les textarea  */}
                                <div className="column is-narrow">
                                    <p className="has-text-weight-bold has-text-left">Nom animal</p>
                                    <textarea
                                        className="textarea mt-2" placeholder="Espèce" rows="1"></textarea>
                                    <textarea
                                        className="textarea mt-2" placeholder="Age" rows="1"></textarea>
                                    <textarea className="textarea mt-2" placeholder="Sexe" rows="1"></textarea>
                                </div>

                                {/* Conteneur pour le bouton */}
                                <div className="column is-narrow has-text-centered">
                                    <Button color="info" className="mt-4" renderAs="span">Voir</Button>
                                </div>
                            </div>
                        </article>

                    </div>
                    <div id="map" className="column is-full-mobile is-full-tablet is-half-desktop">
                        map
                    </div>
                </div>

            </section>

        </main>
    )
}

export default TrouverAnimal;