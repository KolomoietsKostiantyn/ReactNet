import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type Props = {
    latitude: number,
    longitude: number

}



export default function MyMap({latitude, longitude}: Props){

console.log(latitude);
console.log(longitude);

return(<MapContainer
      center={[latitude, longitude]} 
      zoom={12}
      style={{ height: "500px", width: "100%" }}
>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <Marker position={[latitude, longitude]}>
        <Popup>🚩</Popup>
      </Marker>
</MapContainer>)

}



