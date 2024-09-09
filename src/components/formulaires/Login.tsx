import React, { useState } from 'react';
import { Button } from 'react-bulma-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection

function LoginForm() {
  // State pour le login
  const [emailLogin, setEmailLogin] = useState<string>('');
  const [passwordLogin, setPasswordLogin] = useState<string>('');
  const [emailErrorLogin, setEmailErrorLogin] = useState<string>('');
  const [passwordErrorLogin, setPasswordErrorLogin] = useState<string>('');
  const [submitErrorLogin, setSubmitErrorLogin] = useState<string>('');

  const { login } = useAuth();
  const navigate = useNavigate(); // Utilisation du hook useNavigate pour rediriger

  // Validation email
  const validateEmailLogin = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle de soumission (login)
  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    setEmailErrorLogin('');
    setPasswordErrorLogin('');
    setSubmitErrorLogin('');

    // Validation de l'email
    if (!validateEmailLogin(emailLogin)) {
      setEmailErrorLogin('Veuillez entrer une adresse email valide.');
      valid = false;
    }

    // Validation du mot de passe
    if (passwordLogin.length < 12) {
      setPasswordErrorLogin('Le mot de passe doit contenir au moins 12 caractères.');
      valid = false;
    }

    if (valid) {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: emailLogin,
          password: passwordLogin,
        });

        if (response.status === 200) {
          const token = response.data.token;
          const user = emailLogin; 
          login(token);

          // Connexion réussie, redirection vers la page d'accueil
          toast.success('Connexion réussie!');
          navigate('/'); // Redirection vers la page d'accueil
        } else {
          setSubmitErrorLogin('Erreur de connexion: ' + (response.data.message || 'Erreur inconnue.'));
        }
      } catch (error) {
        setSubmitErrorLogin('Erreur, veuillez réessayer.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmitLogin}>
      {/* Champ email */}
      <div className="field">
        <label className="label" htmlFor="email">Email :</label>
        <div className="control">
          <input
            className={`input ${emailErrorLogin ? 'is-danger' : ''}`}
            type="email"
            id="email"
            name="email"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
            required
          />
        </div>
        {emailErrorLogin && <p className="help is-danger">{emailErrorLogin}</p>}
      </div>

      {/* Champ mot de passe */}
      <div className="field">
        <label className="label" htmlFor="password">Mot de passe :</label>
        <div className="control">
          <input
            className={`input ${passwordErrorLogin ? 'is-danger' : ''}`}
            type="password"
            id="password"
            name="password"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
            required
          />
        </div>
        {passwordErrorLogin && <p className="help is-danger">{passwordErrorLogin}</p>}
      </div>

      {/* Bouton de soumission */}
      <div className="field">
        <div className="control">
          <Button color="primary" fullwidth type="submit">Se connecter</Button>
        </div>
      </div>

      {/* Message d'erreur de soumission */}
      {submitErrorLogin && <p className="help is-danger">{submitErrorLogin}</p>}

      <ToastContainer />
    </form>
  );
}

export default LoginForm;

