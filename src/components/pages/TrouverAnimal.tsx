import { Heading, Dropdown, Icon, Button } from "react-bulma-components";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import AnimalItemList from "../partials/AnimalItemList";
import { Link } from 'react-router-dom';

const position: LatLngExpression = [43.3365, 1.3396];


function TrouverAnimal() {


    return (
        <main>
            <div>
                <Heading>Trouver un animal</Heading>
            </div>

            <section className="section">
                <div className="container box">
                    <Heading renderAs="h2">Affinez votre recherche</Heading>
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
                        
< AnimalItemList />
< AnimalItemList />
< AnimalItemList />
                        

                    </div>
                    <div id="map" className="column is-full-mobile is-full-tablet is-half-desktop">
                    <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '80vh' }}
        >
          <TileLayer
  url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
/>

          <Marker position={position}>
            <Popup>C'est mon bled !

              <Link to="/profil">Profil user</Link>
            </Popup>
          </Marker>
        </MapContainer>
                    </div>
                </div>

            </section>

        </main>
    )
}

export default TrouverAnimal;