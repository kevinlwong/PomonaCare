import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

export default function MapComponent() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Google Maps API key is missing</div>;
  }

  return (
    <APIProvider apiKey={apiKey} libraries={["places"]}>
      <InnerMap />
    </APIProvider>
  );
}

function InnerMap() {
  const position = { lat: 34.05, lng: -117.81 };
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef(null);
  const placesServiceRef = useRef(null);

  const map = useMap();

  useEffect(() => {
    if (map && !placesServiceRef.current) {
      console.log("MAP LOADED!");
      mapRef.current = map;
      placesServiceRef.current = new window.google.maps.places.PlacesService(
        map
      );
      setMapLoaded(true);
    }
  }, [map]);

  useEffect(() => {
    if (mapLoaded && placesServiceRef.current) {
      runSearch(keyword);
    }
  }, [mapLoaded, keyword]);

  const runSearch = (searchTerm) => {
    console.log(`Searching for: ${searchTerm}`);
    if (!placesServiceRef.current) {
      console.warn("PlacesService is not initialized yet");
      return;
    }

    const request = {
      location: position,
      radius: 5000,
      keyword: searchTerm,
    };

    placesServiceRef.current.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setResults(results);
        console.log("Search results:", results);
      } else {
        console.error("Places search failed:", status);
      }
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={keyword}
          placeholder="Search for services (e.g. clinic, shelter)"
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "250px",
            marginRight: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => runSearch(keyword)}
          disabled={!mapLoaded}
          style={{
            opacity: !mapLoaded ? 0.5 : 1,
            cursor: !mapLoaded ? "not-allowed" : "pointer",
            padding: "0.5rem 1rem",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          Search
        </button>
      </div>

      <div style={{ height: "80vh", width: "100%" }}>
        <Map center={position} zoom={13} />
        {results.map((place) => (
          <Marker
            key={place.place_id}
            position={place.geometry.location}
            title={place.name}
          />
        ))}
      </div>
    </div>
  );
}
