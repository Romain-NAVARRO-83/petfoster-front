import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon as LeafletIcon } from 'leaflet';

// Position par défaut
const defaultPosition: LatLngExpression = [43.3365, 1.3396];

function MapComponent(){
  return(
    <p>map</p>
  )
}
export default MapComponent;