import { useState, useEffect } from 'react';

const useCities = (selectedCountry: string, countries: { name: string, dialCode: string, isoCode: string }[]) => {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryDialCode, setCountryDialCode] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

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
          .catch(error => console.error('Erreur lors de la récupération des villes:', error));
      } else {
        console.error('Erreur: Pays non trouvé dans la liste des pays.');
      }
    } else {
      // Réinitialisation si aucun pays n'est sélectionné
      setCities([]);
      setPhoneNumber(''); // Réinitialiser le champ téléphone
      setSelectedCity(''); // Réinitialiser la ville sélectionnée
    }
  }, [selectedCountry, countries]);

  return {
    cities,
    selectedCity,
    setSelectedCity,
    phoneNumber,
    setPhoneNumber,
    countryDialCode,
    selectedCountryCode,
  };
};

export default useCities;
