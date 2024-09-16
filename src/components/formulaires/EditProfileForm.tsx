import { useState } from 'react';

// Define the FormData interface for typing formData object
interface FormData {
  nom: string;
  tel: string;
  pays: string;
  codePostal: string;
  ville: string;
  adresse: string;
}

const EditProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    tel: '',
    pays: '',
    codePostal: '',
    ville: '',
    adresse: ''
  });

  // State to manage validation errors
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // State to handle form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to display success message after submission
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form validation function
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    // Validate 'nom' field
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est obligatoire';
    }

    // Validate 'tel' field
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!formData.tel.trim()) {
      newErrors.tel = 'Le téléphone est obligatoire';
    } else if (!phoneRegex.test(formData.tel)) {
      newErrors.tel = 'Le numéro de téléphone n\'est pas valide';
    }

    // Validate 'pays' field
    if (!formData.pays.trim()) {
      newErrors.pays = 'Le pays est obligatoire';
    }

    // Validate 'codePostal' field
    if (!formData.codePostal.trim()) {
      newErrors.codePostal = 'Le code postal est obligatoire';
    } else if (isNaN(Number(formData.codePostal))) {
      newErrors.codePostal = 'Le code postal doit être un nombre';
    }

    // Validate 'ville' field
    if (!formData.ville.trim()) {
      newErrors.ville = 'La ville est obligatoire';
    }

    return newErrors;
  };

  // Function to handle field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    setIsSubmitting(true);

    try {
      console.log('Données soumises : ', formData);

      
      setSuccessMessage('Profil mis à jour avec succès.');

      // Reset 
      setFormData({
        nom: '',
        tel: '',
        pays: '',
        codePostal: '',
        ville: '',
        adresse: ''
      });
    } catch (error) {
      console.error('Erreur lors de la soumission', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Succes*/}
      {successMessage && (
        <div className="notification is-success">
          {successMessage}
        </div>
      )}

      {/* Pseudo */}
      <div className="field">
        <label className="label">Pseudo</label>
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
        {errors.nom && <p className="help is-danger">{errors.nom}</p>}
      </div>

      {/* Tel*/}
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
        {errors.tel && <p className="help is-danger">{errors.tel}</p>}
      </div>

      {/* Pays*/}
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
        {errors.pays && <p className="help is-danger">{errors.pays}</p>}
      </div>

      {/* Code postal*/}
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
                type="text"
                aria-label="Code postal"
              />
            </div>
            {errors.codePostal && <p className="help is-danger">{errors.codePostal}</p>}
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
            {errors.ville && <p className="help is-danger">{errors.ville}</p>}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="notification is-info">
        <p>Cette information est nécessaire pour vous placer sur la carte et permettre aux utilisateurs de vous trouver.</p>
      </div>

      {/* Adresse*/}
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

      <div className="notification is-info">
        <p>Celle-ci n'est pas obligatoire, vous pouvez décider de la laisser vide</p>
      </div>

      {/* Submit button */}
      <button className="button is-primary is-fullwidth" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours...' : 'Enregistrer'}
      </button>
    </form>
  );
};

export default EditProfileForm;
