import React, { useState } from 'react';
import { Button } from 'react-bulma-components';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import { useToast } from '../../hooks/ToastContext';
import { useEffect } from 'react';

function LoginForm() {
  // State pour le login
  const [emailLogin, setEmailLogin] = useState<string>('');
  const [passwordLogin, setPasswordLogin] = useState<string>('');
  const [emailErrorLogin, setEmailErrorLogin] = useState<string>('');
  const [passwordErrorLogin, setPasswordErrorLogin] = useState<string>('');
  const [submitErrorLogin, setSubmitErrorLogin] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Gérer l'état de soumission
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate(); 
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/csrf-token');
        setCsrfToken(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  // Validation email
  const validateEmailLogin = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
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
    if (passwordLogin.trim().length < 12) {
      setPasswordErrorLogin('Le mot de passe doit contenir au moins 12 caractères.');
      valid = false;
    }

    if (valid) {
      setIsSubmitting(true); // Activer le mode soumission pour désactiver le bouton
      try {
        const response = await axios.post('http://localhost:3000/api/login', {

          email: emailLogin.trim(),
          password: passwordLogin.trim(),
        },
        {
          headers: {
            'x-xsrf-token': csrfToken || '',
          },
        }
      ); 

        if (response.status === 200) {
          const token = response.data.token;
          login(token);

          showSuccessToast('Connexion réussie!');
          navigate('/'); // Redirection vers la page d'accueil
        } else {
          setSubmitErrorLogin('Erreur de connexion: ' + (response.data.message || 'Erreur inconnue.'));
        }
      } catch (error) {
        setSubmitErrorLogin('Erreur, veuillez réessayer.');
        showErrorToast('Erreur lors de la connexion, veuillez réessayer.');
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
            aria-describedby="emailErrorLogin" // Pour l'accessibilité
            required
            disabled={isSubmitting} // Désactiver le champ pendant la soumission
          />
        </div>
        {emailErrorLogin && <p className="help is-danger" id="emailErrorLogin">{emailErrorLogin}</p>}
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
            aria-describedby="passwordErrorLogin" // Pour l'accessibilité
            required
            disabled={isSubmitting} // Désactiver le champ pendant la soumission
          />
        </div>
        {passwordErrorLogin && <p className="help is-danger" id="passwordErrorLogin">{passwordErrorLogin}</p>}
      </div>

      {/* Bouton de soumission */}
      <div className="field">
        <div className="control">
          <Button color="primary" fullwidth type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
        </div>
      </div>

      {/* Identifiants de test */}
      <div className='notification is-info is-light columns'>
        <ul className='column'>
          <li>Adoptant</li>
          <li>marie.dubois@example.com</li>
          <li>hashed_password3</li>
        </ul>
        <ul className='column'>
          <li>Famille d'accueil</li>
          <li>jean.martin@example.com</li>
          <li>hashed_password2</li>
        </ul>
        <ul className='column'>
          <li>Association</li>
          <li>contact@spa-example.com</li>
          <li>hashed_password5</li>
        </ul>
      </div>

      {/* Message d'erreur de soumission */}
      {submitErrorLogin && <p className="help is-danger">{submitErrorLogin}</p>}
    </form>
  );
}

export default LoginForm;

