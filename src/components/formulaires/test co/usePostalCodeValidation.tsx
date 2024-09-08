import { useState } from 'react';

// Hook personnalisé pour valider le code postal via l'API Zippopotam.us
const usePostalCodeValidation = () => {
  const [postalCodeError, setPostalCodeError] = useState('');

  const validatePostalCode = async (country: string, city: string, postalCode: string): Promise<boolean> => {
    try {
      // Utiliser le code ISO alpha-2 en minuscule
      const apiUrl = `https://api.zippopotam.us/${country.toLowerCase()}/${postalCode}`;
      console.log('Requête à l\'API Zippopotam.us avec l\'URL :', apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        console.error(`Erreur: Zippopotam.us renvoie le code d'état ${response.status}`);
        return false;
      }

      const data = await response.json();

      if (data.places) {
        const matchingPlace = data.places.find((place: any) =>
          place['place name'].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        );
        return !!matchingPlace;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la validation du code postal:', error);
      return false;
    }
  };

  const handlePostalCodeValidation = async (selectedCountryCode: string, selectedCity: string, postalCode: string) => {
    if (selectedCountryCode) {
      const isPostalCodeValid = await validatePostalCode(selectedCountryCode, selectedCity, postalCode);

      if (!isPostalCodeValid) {
        setPostalCodeError('Le code postal ne correspond pas à la ville sélectionnée.');
        return false;
      } else {
        setPostalCodeError('');
        return true;
      }
    } else {
      console.error('Code ISO du pays non défini.');
      setPostalCodeError('Le code ISO du pays est manquant.');
      return false;
    }
  };

  return {
    postalCodeError,
    handlePostalCodeValidation,
  };
};

export default usePostalCodeValidation;
