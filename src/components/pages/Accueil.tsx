import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Heading } from 'react-bulma-components';
const position: LatLngExpression = [43.3365, 1.3396];
function Accueil() {


    return (
       <main>
        <div>
        <h1 className="title">Pet foster</h1>
        <Heading></Heading>
        
    </div>
    <div>
    
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height:'300px'}}>
  <TileLayer
    
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position}>
    <Popup>
      C'est mon bled !
    </Popup>
  </Marker>
</MapContainer>
    </div>
    
        </main>
    )
  }
  
  export default Accueil;