import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix the default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapClickHandler = ({ setMarkerPosition }) => {
    useMapEvents({
        click: (e) => {
            setMarkerPosition(e.latlng);
        },
    });
    return null;
};

export const Map = ({ lat, lng, setFieldValue }) => {
    const [markerPosition, setMarkerPosition] = useState({ lat, lng });

    useEffect(() => {
        setFieldValue("lat", markerPosition.lat);
        setFieldValue("lng", markerPosition.lng);
    }, [markerPosition, lat, lng]);

    return (
        <MapContainer center={[lat, lng]} zoom={6} style={{ height: '40vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler setMarkerPosition={setMarkerPosition} />
            {markerPosition && (
                <Marker position={markerPosition}>
                    <Popup>
                        Latitude: {markerPosition.lat}, Longitude: {markerPosition.lng}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
}