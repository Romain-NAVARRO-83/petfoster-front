import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../hooks/ToastContext';
import { User } from 'src/@interfaces/user'; // Adjust the import path

interface FormData {
  nom: string;
  tel: string;
  pays: string;
  codePostal: string | number;
  ville: string;
  adresse: string;
}

interface EditProfileFormProps {
  user?: User | null;
}

function EditProfileForm({ user }: EditProfileFormProps) {
  const { showSuccessToast, showErrorToast } = useToast();
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nom: user?.name || '',
    tel: user?.phone || '',
    pays: user?.country || '',
    codePostal: user?.zip || '',
    ville: user?.city || '',
    adresse: user?.address || '',
  });

  const [loading, setLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState<string[]>([]); // Cities list

  // Fetch CSRF token
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/csrf-token');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
        showErrorToast('Erreur lors de la récupération du token CSRF');
      }
    };
    fetchCsrfToken();
  }, [showErrorToast]);

  // Prefill the form fields when the user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.name || '',
        tel: user.phone || '',
        pays: user.country || '',
        codePostal: user.zip || '',
        ville: user.city || '',
        adresse: user.address || '',
      });
    }
  }, [user]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle city change and fetch coordinates based on the selected city
  const handleCityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setFormData((prevData) => ({ ...prevData, ville: selectedCity }));

    if (selectedCity && formData.pays) {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?city=${selectedCity}&country=${formData.pays}&format=json`);
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          showSuccessToast(`Coordonnées de ${selectedCity}: Latitude: ${lat}, Longitude: ${lon}`);
        } else {
          showErrorToast("Impossible de trouver les coordonnées de la ville.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des coordonnées:", error);
        showErrorToast("Erreur lors de la récupération des coordonnées.");
      }
    }
  };

  // Fetch cities based on postal code (CP)
  const fetchCities = async (zip: string) => {
    try {
      const response = await axios.get(`https://api.zippopotam.us/fr/${zip}`);
      const cities = response.data.places.map((place: any) => place['place name']);
      setCityOptions(cities);
    } catch (error) {
      console.error("Erreur lors de la récupération des villes:", error);
      showErrorToast("Erreur lors de la récupération des villes.");
      setCityOptions([]); // Reset city options if error
    }
  };

  // Handle postal code change and fetch cities
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPostalCode = e.target.value;
    setFormData((prevData) => ({ ...prevData, codePostal: newPostalCode }));

    // If the postal code is valid, fetch the associated cities
    if (newPostalCode.length === 5) {
      fetchCities(newPostalCode);
    } else {
      setCityOptions([]); // Reset city options if postal code is too short
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:3000/api/users/${user?.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-xsrf-token': csrfToken || '',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        showSuccessToast('Profil mis à jour avec succès');
      } else {
        showErrorToast('Erreur lors de la mise à jour du profil');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du profil', error);
      showErrorToast('Erreur lors de la soumission du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title has-text-centered">Modifier votre profil</h1>

      {/* Name field */}
      <div className="field">
        <label className="label">Nom</label>
        <div className="control">
          <input
            className="input"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Votre nom"
            aria-label="Nom"
            required
          />
        </div>
      </div>

      {/* Telephone field */}
      <div className="field">
        <label className="label">Tél</label>
        <div className="control">
          <input
            className="input"
            name="tel"
            type="tel"
            value={formData.tel}
            onChange={handleChange}
            placeholder="Votre numéro de téléphone"
            aria-label="Téléphone"
            required
          />
        </div>
      </div>

      {/* Country field */}
      <div className="field">
        <label className="label">Pays</label>
        <div className="control">
          <div className="select">
            <select name="pays" value={formData.pays} onChange={handleChange} required>
              <option value="">Sélectionnez un pays</option>
              <option value="france">France</option>
              <option value="belgique">Belgique</option>
              <option value="suisse">Suisse</option>
            </select>
          </div>
        </div>
      </div>

      {/* Postal code and city fields */}
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Code postal</label>
            <div className="control">
              <input
                className="input"
                name="codePostal"
                type="number"
                value={formData.codePostal}
                onChange={handlePostalCodeChange}
                placeholder="Votre code postal"
                aria-label="Code postal"
                required
              />
            </div>
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label className="label">Ville</label>
            <div className="control">
              <div className="select">
                <select value={formData.ville} onChange={handleCityChange} required>
                  <option value="">Sélectionnez une ville</option>
                  {cityOptions.map((cityOption, index) => (
                    <option key={index} value={cityOption}>
                      {cityOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address field */}
      <div className="field">
        <label className="label">Adresse</label>
        <div className="control">
          <input
            className="input"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Votre adresse (optionnel)"
            aria-label="Adresse"
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="field">
        <div className="control">
          <button
            className={`button is-primary is-fullwidth ${loading ? 'is-loading' : ''}`}
            type="submit"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProfileForm;
