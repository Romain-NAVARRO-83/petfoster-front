import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the shape of the context data
interface GeolocationContextType {
  location: { lat: number; lng: number } | null;
  error: string | null;
}

// Create the Geolocation context
const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined);

// Define the props type for the provider, including children
interface GeolocationProviderProps {
  children: ReactNode;
}

// GeolocationProvider component without React.FC
export function GeolocationProvider({ children }: GeolocationProviderProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
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
      (error) => setError(error.message)
    );
  }, []);

  return (
    <GeolocationContext.Provider value={{ location, error }}>
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
