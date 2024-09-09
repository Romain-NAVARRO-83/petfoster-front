import React, { createContext, useState, useContext } from 'react';
<<<<<<< HEAD
import { jwtDecode } from "jwt-decode";
=======
import {jwtDecode} from 'jwt-decode'; // Correct import
>>>>>>> 7fd82eda57b66204d4bc6ea24f75a829e43fdf19

// Définition de l'interface pour le token décodé
interface DecodedToken {
  userId: number;
  userName: string;
  iat: number;
  exp: number;
}

// Interface pour le contexte d'authentification
interface AuthContextType {
  user: DecodedToken | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Création du contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);

  const login = (token: string) => {
    // const navigate = useNavigate(); 
    // Décode le token et stocke les informations de l'utilisateur
    const decodedUser = jwtDecode<DecodedToken>(token);
    setToken(token);
    setUser(decodedUser);
    // navigate('/');

    
    // Enregistrer le token dans localStorage
    localStorage.setItem('token', token);
  };

  const logout = () => {
    // Supprimer les informations d'authentification lors de la déconnexion
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
