import { useGeolocation } from '../../hooks/GeolocationContext';

export default function GeolocNotification() {
  const { errorGeoloc } = useGeolocation();

  return (
    <>
      {errorGeoloc && (
        <div className="container has-text-centered">
          <div className="notification is-danger">
            <p>{errorGeoloc}</p>
          </div>
        </div>
      )}
    </>
  );
}
