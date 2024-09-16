import { useState, useEffect } from 'react';
import { User } from 'src/@interfaces/user'; // Adjust the import path to your user interface

// Define the type for the form data
interface FormData {
  nom: string;
  tel: string;
  pays: string;
  codePostal: string | number;
  ville: string;
  adresse: string;
}

// Define the props type for the component
interface EditProfileFormProps {
  user?: User | null;
}

function EditProfileForm({ user }: EditProfileFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nom: user?.name || '',
    tel: user?.phone || '',
    pays: user?.country || '',
    codePostal: user?.zip || '',
    ville: user?.city || '',
    adresse: user?.address || '',
  });

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

  console.log(user)
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          />
        </div>
      </div>

      {/* Country field */}
      <div className="field">
        <label className="label">Pays</label>
        <div className="control">
          <input
            className="input"
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            placeholder="Votre pays"
            aria-label="Pays"
          />
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
                value={formData.codePostal}
                onChange={handleChange}
                placeholder="Votre code postal"
                aria-label="Code postal"
              />
            </div>
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label className="label">Ville</label>
            <div className="control">
              <input
                className="input"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                placeholder="Votre ville"
                aria-label="Ville"
              />
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
      <button className="button is-primary" type="submit">
        Enregistrer
      </button>
    </form>
  );
}

export default EditProfileForm;
