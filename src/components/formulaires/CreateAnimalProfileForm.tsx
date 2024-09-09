import { useState } from 'react';

// Définition de l'interface pour typer l'objet formData
interface FormData {
  nom: string;
  tel: string;
  pays: string;
  codePostal: string;
  ville: string;
  adresse: string;
}

const CreateAnimalProfileForm = () => {
  
  return (

    <form>
    <div className="field">
        <label className="label" htmlFor="name">Nom</label>
        <div className="control">
            <input className="input" type="text" id="name" name="name" placeholder="Le nom de l'animal" required />
        </div>
    </div>

    <div className="field">
        <label className="label" htmlFor="dob">Date de naissance</label>
        <div className="control">
            <input className="input" type="date" id="dob" name="dob" required />
        </div>
        <div className='notification is-info is-light'><p>Entrez une date approximative si besoin</p></div>
    </div>

    <div className="field">
        <label className="label" htmlFor='sexe'>Sexe</label>
        <div className="control">
            <label className="radio">
                <input type="radio" id="male" name="sexe" value="M" required />
                Mâle
            </label>
            <label className="radio">
                <input type="radio" id="female" name="sexe" value="F" required />
                Femelle
            </label>
        </div>
    </div>

    <div className="field">
        <label className="label" htmlFor="race">Race</label>
        <div className="control">
            <input className="input" type="text" id="race" name="race" placeholder="Entrez une iformation sur la race" />
        </div>
    </div>

    <div className="field">
        <label className="label" htmlFor="shortStory">Description courte</label>
        <div className="control">
            <textarea className="textarea" id="shortStory" name="shortStory" placeholder="L'animal en quelques mots"></textarea>
        </div>
    </div>

    <div className="field">
        <label className="label" htmlFor="longStory">Description longue</label>
        <div className="control">
            <textarea className="textarea" id="longStory" name="longStory" placeholder="N'hésitez pas à ajouter des détail sur l'animal"></textarea>
        </div>
    </div>

    <div className="field">
        <label className="label" htmlFor="health">Santé</label>
        <div className="control">
            <textarea className="textarea" id="health" name="health" placeholder="Entrez des informations sur sa santé si nécessaire"></textarea>
        </div>
    </div>

    <div className="field">
        <label className="label" htmlFor="species">Species</label>
        <div className="control">
            <div className="select">
            <option value="Chat">Chat</option>
                  <option value="Chien">Chien</option>
                  <option value="Cheval">Cheval</option>
                  <option value="Lapin">Lapin</option>
                  <option value="Cochon d'Inde">Cochon d'Inde</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Furet">Furet</option>
                  <option value="Oiseau">Oiseau</option>
                  <option value="Serpent">Serpent</option>
                  <option value="Lézard">Lézard</option>
                  <option value="Tortue">Tortue</option>
                  <option value="Rat">Rat</option>
            </div>
        </div>
    </div>


            <input  type="hidden" id="creatorId" name="creatorId" value="à voir" />


    <div className="field">
        <div className="control">
            <button className="button is-primary is-fullwidth" type="submit">Submit</button>
        </div>
    </div>
</form>


    

  );
  
};

export default CreateAnimalProfileForm;
