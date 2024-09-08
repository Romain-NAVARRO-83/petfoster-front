import React, { useState } from 'react';
import { Button } from 'react-bulma-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/AuthContext';

function LoginForm() {
  // State pour le login
  const [emailLogin, setEmailLogin] = useState<string>('');
  const [passwordLogin, setPasswordLogin] = useState<string>('');
  const [emailErrorLogin, setEmailErrorLogin] = useState<string>('');
  const [passwordErrorLogin, setPasswordErrorLogin] = useState<string>('');
  const [submitErrorLogin, setSubmitErrorLogin] = useState<string>('');

  
  const { login } = useAuth();

  // Validation email
  const validateEmailLogin = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle de soumission(login)
  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    
    setEmailErrorLogin('');
    setPasswordErrorLogin('');
    setSubmitErrorLogin('');

    
    if (!validateEmailLogin(emailLogin)) {
      setEmailErrorLogin('Veuillez entrer une adresse email valide.');
      valid = false;
    }

    
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
          console.log(response.data);
          const user = emailLogin; 
          login(token, user);

          toast.success('Connexion réussie!');
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
        {/* {passwordErrorLogin && <p className="help is-danger">{passwordErrorLogin}</p>} */}
      </div>

      
      <div className="field">
        <div className="control">
          <Button color="primary" fullwidth type="submit">Se connecter</Button>
        </div>
      </div>

      
      {submitErrorLogin && toast.error(submitErrorLogin)}

      <ToastContainer />
    </form>
  );
}

export default LoginForm;
