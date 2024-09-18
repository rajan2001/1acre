"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useEffect } from 'react';
import { useState } from 'react';

const containerStyle = {
    width: '80%',
    height: '400px',
    "margin": "auto",
    borderRadius: '15px',
};

const center = {
    lat: 17.1438828,
    lng: 77.5633691,
};

const MapComponent = () => {
    const [markers, setMarkers] = useState<any>([]);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);

    const handleClick = (marker: any) => {
        setSelectedMarker(marker);
    };

    const handleCloseClick = () => {
        setSelectedMarker(null);
    };

    useEffect(() => {
        fetch('https://prod-be.1acre.in/lands/landmaps/?seller_id=211')
            .then((res) => res.json())
            .then((res) => setMarkers(res));
    }, []);

    return (
        <LoadScript googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {markers.length !== 0 &&
                    markers.map((marker: any) => (
                        <Marker
                            key={marker.id}
                            position={{ lat: Number(marker.lat), lng: Number(marker.long) }}
                            onClick={() => handleClick(marker)}
                            icon={{
                                url: 'https://res.cloudinary.com/dq7nbdwjd/image/upload/f_auto,q_auto/kgyv8gadhgo9ec5aeon4',
                                scaledSize: new window.google.maps.Size(20, 20),
                            }}
                        />
                    ))}
                {selectedMarker && (
                    <InfoWindow
                        position={{ lat: Number(selectedMarker.lat), lng: Number(selectedMarker.long) }}
                        onCloseClick={handleCloseClick}
                    >
                        <div className="marker_card">
                            <div>
                                <p className="marker_info">
                                    {` ${selectedMarker.total_land_size_in_acres.acres} Acres ${selectedMarker.total_land_size_in_acres.guntas}  Guntas -
                                    ${selectedMarker.price_per_acre_crore.lakh} lakhs per acre`}
                                </p>
                            </div>

                            <button className="marker_button">View Details</button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
