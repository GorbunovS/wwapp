import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import CardComponent from './CapitalCard';
import { getMarkStyleURL } from './scripts/weather';
import { fetchSimpleWeatherForecast } from '../src/scripts/wheatherData';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
const center = [55.751244, 37.618423];
const MapComponent = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadWeatherData = async () => {
            try {
                setLoading(true);
                const data = await fetchSimpleWeatherForecast('f69f83d93f2bdce6419d2bf34b0f7934');
                setCards(data);
            }
            catch {
                setError('не удалось загрузить погоду');
            }
            finally {
                setLoading(false);
            }
        };
        loadWeatherData();
    }, []);
    if (loading)
        return _jsx("div", { className: "loading", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043F\u043E\u0433\u043E\u0434\u0435..." });
    if (error)
        return _jsx("div", { className: "error", children: error });
    return (_jsx("div", { style: { height: '100vh', width: '100%', position: 'relative' }, children: _jsxs(MapContainer, { center: center, zoom: 6, style: { height: '100%', width: '100%' }, children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }), cards.map((card) => {
                    const iconUrl = getMarkStyleURL(card.currentDesc);
                    const icon = L.icon({
                        iconUrl: iconUrl,
                        iconSize: [60, 60],
                        iconAnchor: [20, 40],
                        popupAnchor: [0, -35],
                    });
                    return (_jsx(Marker, { position: card.position, icon: icon, children: _jsx(Popup, { maxHeight: 1000, maxWidth: 1000, closeButton: false, children: _jsx(CardComponent, { name: card.name, description: card.currentDesc, temperature: card.currentTemp }) }) }, card.id));
                })] }) }));
};
export default MapComponent;
