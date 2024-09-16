import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface GeolocationContextType {
  location: { lat: number; lng: number } | null;
  errorGeoloc: string | null;
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined);

interface GeolocationProviderProps {
  children: ReactNode;
}

export function GeolocationProvider({ children }: GeolocationProviderProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [errorGeoloc, setErrorGeoloc] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorGeoloc('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorGeoloc('Pour une meilleure expérience sur Pet Foster, merci d\'activer la géolocalisation de votre navigateur');
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorGeoloc('Le service de géolocalisation est injoignable.');
            break;
          case error.TIMEOUT:
            setErrorGeoloc('La géolocalisation a pris trop de temps.');
            break;
          default:
            setErrorGeoloc('Erreur de geolocalisation inconnue.');
            break;
        }
      }
    );
  }, []);

  return (
    <GeolocationContext.Provider value={{ location, errorGeoloc }}>
      {children}
    </GeolocationContext.Provider>
  );
}

// Custom hook to use the Geolocation context
export const useGeolocation = () => {
  const context = useContext(GeolocationContext);
  if (!context) {
    throw new Error('useGeolocation must be used within a GeolocationProvider');
  }
  return context;
};
