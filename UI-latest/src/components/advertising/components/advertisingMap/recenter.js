import { useMap } from "react-leaflet";

function ReCenter({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default ReCenter
