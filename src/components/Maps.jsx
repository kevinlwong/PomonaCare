import { useState } from "react";
import {
    APIProvider,
    Map
} from "@vis.gl/react-google-maps";

export default function MapComponent() {
    const position = { lat: 34.05, lng: -117.81 };
    const apiKey = process.env.VITE_APP_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return <div>Google Maps API key is missing</div>;
    }

    return (
        <APIProvider apiKey={apiKey}>
            <div>React Google Maps</div>
            <Map center={position} zoom={10} />
        </APIProvider>
    );
}