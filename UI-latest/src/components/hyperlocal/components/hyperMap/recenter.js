//Custom Hook Made to recenter leaflet map (otherwise the 'center' attribute in Leaflet tag of JSX is immutable)
import { useMap } from "react-leaflet";

function ReCenter({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default ReCenter
