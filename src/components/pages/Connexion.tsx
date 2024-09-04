// problème sur les faux pays / lien condition général a faire / problème au niveau de ville lors de la resélection de pays / Ajouté choix type user button radio / 

// API RestCountries : Cette API sert à récupérer la liste des pays. Elle fournit des informations sur tous les pays du monde, y compris leurs noms, codes, et autres détails.

// API CountriesNow : Cette API sert à récupérer les villes d'un pays spécifique. Lorsque vous sélectionnez un pays, l'API renvoie une liste des villes disponibles dans ce pays.

//Zippopotam.us : Cette API permet de récupérer les informations de code postal à partir d'une ville et d'un pays.

// API react-select : permet de créer des composants de sélection (dropdown) stylisés et interactifs.

import React, { useState, useEffect } from 'react';
import { Container, Section, Heading, Box, Button, Tabs } from 'react-bulma-components';
import { isValidPhoneNumber } from 'libphonenumber-js';
import Select from 'react-select';

const RegistrationPage: React.FC = () => {

    // États pour gérer les valeurs des champs de formulaire
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');
    const [countries, setCountries] = useState<{ name: string, dialCode: string, isoCode: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [countryDialCode, setCountryDialCode] = useState(''); // Pour stocker l'indicatif du pays sélectionné
    const [postalCodeError, setPostalCodeError] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState(''); 

    // Validation de l'email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Fonction pour gérer le changement de numéro de téléphone et ajouter l'indicatif si nécessaire
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let phone = e.target.value;

        // Vérifier si l'indicatif est déjà présent, sinon le préfixer
        if (!phone.startsWith(countryDialCode)) {
            phone = countryDialCode + phone;
        }
        setPhoneNumber(phone);
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();  // Empêcher la soumission par défaut
        let isValid = true;
    
        // Validation de l'email
        if (!validateEmail(email)) {
            setEmailError("Veuillez entrer une adresse email valide.");
            isValid = false;
        } 
        else {
            setEmailError('');
        }
    
        // Vérification de la correspondance des mots de passe
        if (password !== confirmPassword) {
            setPasswordError("Les mots de passe ne correspondent pas.");
            isValid = false;
        } 
        else {
            setPasswordError('');
        }
    
        // Vérification de la longueur minimale du mot de passe (12 caractères)
        if (password.length < 12) {
            setPasswordError("Le mot de passe doit contenir au moins 12 caractères.");
            isValid = false;
        }
    
        // Validation du numéro de téléphone uniquement s'il est renseigné
        if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
            setPhoneError("Veuillez entrer un numéro de téléphone valide.");
            isValid = false;
        } 
        else {
            setPhoneError('');
        }
    
        // Validation du code postal (appel à l'API Zippopotam.us)
        if (selectedCountryCode) {

            const isPostalCodeValid = await validatePostalCode(selectedCountryCode, selectedCity, postalCode);

            if (!isPostalCodeValid) {
                setPostalCodeError("Le code postal ne correspond pas à la ville sélectionnée.");
                isValid = false;
            } 
            else {
                setPostalCodeError('');
            }
        } 
        else {
            console.error("Code ISO du pays non défini.");
            isValid = false;
        }
    
        // Si toutes les validations sont passées
        if (isValid) {
            // Logique de soumission du formulaire ici
            console.log("Formulaire soumis avec succès.");
        }
    };
    

    // Récupération de la liste des pays via l'API REST Countries, avec leurs indicatifs
    useEffect(() => {

        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countryData = data.map((country: any) => ({
                    name: country.name.common,
                    dialCode: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ''),
                    isoCode: country.cca2.toLowerCase() // Ajout du code ISO alpha-2
                })).sort((a: any, b: any) => a.name.localeCompare(b.name));
                setCountries(countryData); // Mise à jour de la liste des pays avec indicatifs et code ISO
            })
            .catch(error => console.error("Erreur lors de la récupération des pays:", error));
    }, []);
    

    // Récupération des villes en fonction du pays sélectionné via l'API CountriesNow
    useEffect(() => {

        if (selectedCountry) {

            // Rechercher les données du pays sélectionné
            const selectedCountryData = countries.find(country => country.name === selectedCountry);
    
            if (selectedCountryData) {

                // Mise à jour de l'indicatif du pays
                setCountryDialCode(selectedCountryData.dialCode); 
                setPhoneNumber(selectedCountryData.dialCode); // Mettre à jour le numéro de téléphone avec l'indicatif
    
                // Utilisation du code ISO alpha-2 pour Zippopotam.us
                setSelectedCountryCode(selectedCountryData.isoCode); // Utiliser le code ISO pour la validation
    
                // Récupérer les villes pour le pays sélectionné
                fetch('https://countriesnow.space/api/v0.1/countries/cities', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        country: selectedCountry // Utilise le nom du pays sélectionné
                    })
                })
                .then(response => response.json())
                .then(data => {
                    // Mise à jour de la liste des villes
                    setCities(data.data || []); 
                    setSelectedCity(''); // Réinitialiser la ville sélectionnée
                })
                .catch(error => console.error("Erreur lors de la récupération des villes:", error));
            } 
            else {
                console.error("Erreur: Pays non trouvé dans la liste des pays.");
            }
        } 
        else {
            // Réinitialisation si aucun pays n'est sélectionné
            setCities([]);
            setPhoneNumber(''); // Réinitialiser le champ téléphone
            setSelectedCity(''); // Réinitialiser la ville sélectionnée
        }
    }, [selectedCountry, countries]);
    


    // Fonction pour valider le code postal via l'API Zippopotam.us
    const validatePostalCode = async (country: string, city: string, postalCode: string): Promise<boolean> => {

        try {

            // Utiliser le code ISO alpha-2 en minuscule
            const apiUrl = `https://api.zippopotam.us/${country.toLowerCase()}/${postalCode}`;
            console.log("Requête à l'API Zippopotam.us avec l'URL :", apiUrl);
    
            const response = await fetch(apiUrl);
    
            if (!response.ok) {
                console.error(`Erreur: Zippopotam.us renvoie le code d'état ${response.status}`);
                return false;
            }
    
            const data = await response.json();
    
            if (data.places) {
                const matchingPlace = data.places.find((place: any) => 
                    place['place name'].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                );
                return !!matchingPlace;
            } else {
                return false;
            }
        } 
        catch (error) {
            console.error("Erreur lors de la validation du code postal:", error);
            return false;
        }
    };
    

    // Transformer la liste des villes en format compatible avec react-select
    const cityOptions = cities.map(city => ({ value: city, label: city }));

    return (

        <>
        
        <div>
            <Heading className="has-text-centered">Inscription</Heading>
        </div>

        <Section>

            <Container>
               
                <Tabs align="center">

                    <Tabs.Tab active={activeTab === 'login'} onClick={() => setActiveTab('login')}>
                        Connexion
                    </Tabs.Tab>

                    <Tabs.Tab active={activeTab === 'signup'} onClick={() => setActiveTab('signup')}>
                        Créer un compte
                    </Tabs.Tab>

                </Tabs>

                <Box>

                    {activeTab === 'login' ? (

                        // Formulaire de connexion
                        <form>

                            <div className="field">

                                <label className="label" htmlFor="email">Email :</label>

                                <div className="control">

                                    <input

                                        className={`input ${emailError ? 'is-danger' : ''}`}
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        
                                    />

                                </div>

                                {emailError && <p className="help is-danger">{emailError}</p>}

                            </div>

                            <div className="field">

                                <label className="label" htmlFor="password">Mot de passe :</label>

                                <div className="control">
                                    <input className="input" type="password" id="password" name="password" required />
                                </div>

                            </div>

                            <div className="field">

                                <div className="control">
                                    <Button color="primary" fullwidth>S'inscrire</Button>
                                </div>

                            </div>

                        </form>

                    ) : (

                        // Formulaire de création de compte
                        <form action="/submit_registration" method="post" onSubmit={handleSubmit}>

                            <div className="field">

                                <label className="label" htmlFor="nom">Nom <span className="has-text-danger">*</span> :</label>

                                <div className="control">
                                    <input className="input" type="text" id="nom" name="nom" required />
                                </div>

                            </div>

                            <div className="field">

                                <label className="label" htmlFor="email">Email <span className="has-text-danger">*</span> :</label>

                                <div className="control">

                                    <input

                                        className={`input ${emailError ? 'is-danger' : ''}`}
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required

                                    />

                                </div>

                                {emailError && <p className="help is-danger">{emailError}</p>}

                            </div>

                            <div className="field">

                                <label className="label" htmlFor="password">Mot de passe <span className="has-text-danger">*</span> :</label>

                                <div className="control">

                                    <input

                                        className={`input ${passwordError ? 'is-danger' : ''}`}
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required

                                    />

                                </div>

                                {passwordError && <p className="help is-danger">{passwordError}</p>}

                            </div>

                            <div className="field">

                                <label className="label" htmlFor="confirm_password">Confirmer le mot de passe <span className="has-text-danger">*</span> :</label>

                                <div className="control">

                                    <input

                                        className={`input ${passwordError ? 'is-danger' : ''}`}
                                        type="password"
                                        id="confirm_password"
                                        name="confirm_password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required

                                    />

                                </div>

                                {passwordError && <p className="help is-danger">{passwordError}</p>}

                            </div>

                            <div className="field">

                                <label className="label" htmlFor="pays">Pays <span className="has-text-danger">*</span> :</label>

                                <div className="control">

                                    <div className="select">

                                        <select id="pays" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required>

                                            <option value="">Sélectionnez un pays</option>
                                            {countries.map(country => (
                                                <option key={country.name} value={country.name}>{country.name}</option>
                                            ))}

                                        </select>

                                    </div>

                                </div>

                            </div>

                            <div className="field">

                                <label className="label" htmlFor="ville">Ville <span className="has-text-danger">*</span>:</label>

                                <div className="control">                                 

                                    <Select

                                        options={cityOptions} // Les options des villes formatées
                                        onChange={(option) => setSelectedCity(option?.value || '')} // Met à jour la ville sélectionnée
                                        isDisabled={!selectedCountry || cities.length === 0} // Désactiver si aucun pays ou si pas de villes
                                        placeholder="Tapez pour rechercher une ville"
                                        noOptionsMessage={({ inputValue }) => inputValue.length === 0 ? null : "Aucune ville disponible"} // Message si aucune ville n'est trouvée + n'apparais pas si pas au moins un imput
                                        filterOption={(option, inputValue) => 
                                            inputValue.length > 0 && option.label.toLowerCase().startsWith(inputValue.toLowerCase())
                                        } // Filtrer dynamiquement selon la saisie

                                    />

                                </div>

                            </div>

                            <div className="field">

                                <label className="label" htmlFor="code_postal">Code postal <span className="has-text-danger">*</span> :</label>

                                <div className="control">

                                    <input

                                        className={`input ${postalCodeError ? 'is-danger' : ''}`}
                                        type="text"
                                        id="code_postal"
                                        name="code_postal"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        required

                                    />

                                </div>

                                {postalCodeError && <p className="help is-danger">{postalCodeError}</p>}

                            </div>


                            <div className="field">

                                <label className="label" htmlFor="adresse">Adresse :</label>

                                <div className="control">
                                    <input className="input" type="text" id="adresse" name="adresse" required />
                                </div>

                            </div>

                            <div className="field">

                                <label className="label" htmlFor="telephone">Téléphone :</label>

                                <div className="control">

                                    <input

                                        className={`input ${phoneError ? 'is-danger' : ''}`}
                                        type="tel"
                                        id="telephone"
                                        name="telephone"
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}

                                    />

                                </div>

                                {phoneError && <p className="help is-danger">{phoneError}</p>}

                            </div>

                            <div className="field">

                                <div className="control">

                                    <label className="checkbox">
                                        <input type="checkbox" id="conditions" name="conditions" required />
                                        J'accepte les <a href="#">conditions générales <span className="has-text-danger">*</span></a>
                                    </label>

                                </div>

                            </div>

                            <div className="field">

                                <div className="control">
                                    <Button color="primary" fullwidth>Créer un compte</Button>
                                </div>

                            </div>

                        </form>

                    )}

                </Box>

            </Container>

        </Section>

        </>

    );

};

export default RegistrationPage;