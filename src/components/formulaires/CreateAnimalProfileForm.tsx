import { useState } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  species_id: number;
  sexe: string;
  date_of_birth: string;
  race: string;
  short_story: string;
  long_story: string;
  health: string;
  creator_id: number;
}

const CreateAnimalProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    species_id: 1, // défaut ?
    sexe: '',
    date_of_birth: '',
    race: '',
    short_story: '',
    long_story: '',
    health: '',
    creator_id: 1, // à remplcer avec connected user id
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('formdata :', formData);
    try {
      const response = await axios.post('http://localhost:3000/api/animals', formData);
      console.log('Réponse du serveur:', response.data);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  return (
    <form className="columns is-multiline" onSubmit={handleSubmit}>
      <div className="field column is-full">
        <label className="label" htmlFor="name">Nom</label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            placeholder="Le nom de l'animal"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field column is-half-desktop">
        <label className="label" htmlFor="species_id">Espèce</label>
        <div className="control">
          <div className="select">
            <select id="species_id" name="species_id" value={formData.species_id} onChange={handleChange} required>
              <option value="" disabled>Sélectionnez une espèce</option>
              <option value={1}>Chat</option>
              <option value={2}>Chien</option>
              <option value={3}>Cheval</option>
              <option value={4}>Lapin</option>
              <option value={5}>Cochon d'Inde</option>
              <option value={6}>Hamster</option>
              <option value={7}>Furet</option>
              <option value={8}>Oiseau</option>
              <option value={9}>Serpent</option>
              <option value={10}>Lézard</option>
              <option value={11}>Tortue</option>
              <option value={12}>Rat</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field column is-half-desktop">
        <label className="label" htmlFor="sexe">Sexe</label>
        <div className="control columns">
          <label className="radio">
            <input type="radio" id="male" name="sexe" value="M" required onChange={handleChange} />
            Mâle
          </label>
          <label className="radio">
            <input type="radio" id="female" name="sexe" value="F" required onChange={handleChange} />
            Femelle
          </label>
        </div>
      </div>

      <div className="field column is-half-desktop">
        <label className="label" htmlFor="date_of_birth">Date de naissance</label>
        <div className="control">
          <input
            className="input"
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            required
            value={formData.date_of_birth}
            onChange={handleChange}
          />
        </div>
        <div className="notification is-info is-light">
          <p>Entrez une date approximative si besoin</p>
        </div>
      </div>

      <div className="field column is-half-desktop">
        <label className="label" htmlFor="race">Race</label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="race"
            name="race"
            placeholder="Entrez une information sur la race"
            value={formData.race}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field column is-full">
        <label className="label" htmlFor="short_story">Description courte</label>
        <div className="control">
          <textarea
            className="textarea"
            id="short_story"
            name="short_story"
            placeholder="L'animal en quelques mots"
            value={formData.short_story}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className="field column is-full">
        <label className="label" htmlFor="long_story">Description longue</label>
        <div className="control">
          <textarea
            className="textarea"
            id="long_story"
            name="long_story"
            placeholder="N'hésitez pas à ajouter des détails sur l'animal"
            value={formData.long_story}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className="field column is-full">
        <label className="label" htmlFor="health">Santé</label>
        <div className="control">
          <textarea
            className="textarea"
            id="health"
            name="health"
            placeholder="Entrez des informations sur sa santé si nécessaire"
            value={formData.health}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <input type="hidden" id="creator_id" name="creator_id" value={formData.creator_id} />

      <div className="field column is-full">
        <div className="control">
          <button className="button is-primary is-fullwidth" type="submit">
            Enregistrer l'animal
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateAnimalProfileForm;