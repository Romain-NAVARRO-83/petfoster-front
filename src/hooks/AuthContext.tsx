import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from "jwt-decode"; // Correct import

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
    // Décode le token et stocke les informations de l'utilisateur
    const decodedUser = jwtDecode<DecodedToken>(token);
    setToken(token);
    setUser(decodedUser);
    
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
