import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
// import { LatLng, LatLngExpression } from 'leaflet';
function Accueil() {


    return (
       <main>
        <div>
        <h1 className="title">Pet foster</h1>
        
    </div>
    <div>
    <h2>Test map</h2>
        <MapContainer center={[43.3365, 1.3396]} zoom={13} scrollWheelZoom={false} style={{height:'300px'}}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[43.3365, 1.3396]}>
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