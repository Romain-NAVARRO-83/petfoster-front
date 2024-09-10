import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// Interface pour le token décodé
interface DecodedToken {
  userId: number;
  userName: string;
  userType: string;
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
  // État pour stocker le token et les informations de l'utilisateur
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);

  // Vérifie la présence d'un token dans le localStorage lors du chargement initial de l'application
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Récupération du token stocké
    
    if (storedToken) {
      try {
        // Décoder le token stocké
        const decodedUser = jwtDecode<DecodedToken>(storedToken);
        
        // Vérifier si le token est encore valide (non expiré)
        if (decodedUser.exp * 1000 > Date.now()) {
          // Si le token est valide, mettre à jour l'état avec l'utilisateur et le token
          setToken(storedToken);
          setUser(decodedUser);
        } else {
          // Si le token est expiré, le supprimer du localStorage
          localStorage.removeItem('token');
        }
      } catch (error) {
        // Si la décodage échoue (token invalide), on retire le token du localStorage
        console.error('Échec du décodage du token', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Fonction pour gérer la connexion de l'utilisateur
  const login = (token: string) => {
    // Décoder le token fourni lors de la connexion
    const decodedUser = jwtDecode<DecodedToken>(token);
    setToken(token);
    setUser(decodedUser);

    // Sauvegarder le token dans le localStorage pour maintenir la session
    localStorage.setItem('token', token);
    // console.log("wahtZeToken :" + JSON.stringify(decodedUser))
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const logout = () => {
    // Réinitialiser l'état de l'authentification et supprimer le token du localStorage
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  // Fournir les fonctions et états au reste de l'application via le contexte
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }

  return context;
};
export default AuthContext;