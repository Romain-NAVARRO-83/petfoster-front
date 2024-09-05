import React, { useState } from 'react';
import { Button } from 'react-bulma-components';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  // State for login form data and errors
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [emailErrorLogin, setEmailErrorLogin] = useState('');
  const [passwordErrorLogin, setPasswordErrorLogin] = useState('');
  const [submitErrorLogin, setSubmitErrorLogin] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Email validation function
  const validateEmailLogin = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission (login)
  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // Reset errors
    setEmailErrorLogin('');
    setPasswordErrorLogin('');
    setSubmitErrorLogin('');

    // Validate email
    if (!validateEmailLogin(emailLogin)) {
      setEmailErrorLogin('Veuillez entrer une adresse email valide.');
      valid = false;
    }

    // Validate password
    if (passwordLogin.length < 12) {
      setPasswordErrorLogin('Le mot de passe doit contenir au moins 12 caractères.');
      valid = false;
    }

    // If form is valid, send the request using axios
    if (valid) {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: emailLogin,
          password: passwordLogin,
        });

        if (response.status === 200) {
          console.log('Connexion réussie', response.data);
          setLoginSuccess(true);
          // Handle successful login (e.g., store token, redirect)
        } else {
          setSubmitErrorLogin('Erreur de connexion: ' + (response.data.message || 'Erreur inconnue.'));
        }
      } catch (error) {
        setSubmitErrorLogin('Erreur réseau, veuillez réessayer.');
      }
    }
  };

  // TOAST (retour du formulaire)
// Function to trigger toast notifications
const triggerToast = (message, type) => {
  toast(message, { type });
};




  // const [showToast, setShowToast] = useState(false);
  // const [toastMessage, setToastMessage] = useState('');
  // const [toastType, setToastType] = useState('info');

  // const triggerToast = (message, type) => {
  //   setToastMessage(message);
  //   setToastType(type);
  //   setShowToast(true);

  //   // Ferme apres 3 sec
  //   setTimeout(() => {
  //     setShowToast(false);
  //   }, 3000);
  // };
  return (
    <form onSubmit={handleSubmitLogin}>
      {/* Email Field */}
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

      {/* Password Field */}
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

      {/* Submit Button */}
      <div className="field">
        <div className="control">
          <Button color="primary" fullwidth type="submit">Se connecter</Button>
        </div>
      </div>

      {/* Submit Error */}
      {submitErrorLogin && triggerToast({submitErrorLogin}, 'danger')
      // <p className="help is-danger has-text-centered">{submitErrorLogin}</p>
      }
      {/* Login success */}
      {/* {loginSuccess && triggerToast('Connexion réussie!', 'success')
      } */}
         {loginSuccess && triggerToast('Login successful!', 'success')
      }



{/* Toast Container, required for the toast to be displayed */}
<ToastContainer />
    </form>
  );
}

export default LoginForm;
