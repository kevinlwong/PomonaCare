import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import CoraTagline from "../utils/CoraTagline";

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
  const defaultCenter = { lat: 34.05, lng: -117.81 };
  const [center, setCenter] = useState(defaultCenter);
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

  const runSearch = (searchTerm) => {
    console.log(`Searching for: ${searchTerm}`);
    if (!placesServiceRef.current) {
      console.warn("PlacesService is not initialized yet");
      return;
    }

    const request = {
      location: defaultCenter,
      radius: 5000,
      keyword: searchTerm,
      openNow: false,
    };

    placesServiceRef.current.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setResults(results);
        console.log("Search results:", results);
      } else {
        console.error("Places search failed:", status);
        setResults([]);
      }
    });
  };

  const centerMapOnPlace = (place) => {
    const location = place.geometry.location;
    if (mapRef.current) {
      mapRef.current.panTo(location);
      mapRef.current.setZoom(15);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 gap-4">
      <CoraTagline text="Got Symptoms? Find Help!" />
      <CoraTagline text="¿Tienes síntomas? ¡Busca ayuda!" />

      <p className="font-heading text-md md:text-lg max-w-2xl text-center text-gray-700 dark:text-gray-300">
        Enter your symptoms into the search bar to find help catered to you!
        <br />
        ¡Ingresa tus síntomas en la barra de búsqueda para encontrar ayuda
        adaptada a tus necesidades!
      </p>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={keyword}
          placeholder="Search for services (e.g. clinic, shelter)"
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 w-64 border border-gray-300 rounded"
        />
        <button
          onClick={() => runSearch(keyword)}
          disabled={!mapLoaded}
          className={`px-4 py-2 rounded text-white ${
            mapLoaded
              ? "bg-purple-600 hover:bg-purple-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Search
        </button>
      </div>

      <div className="relative w-[1000px] h-[600px]">
        <Map
          defaultCenter={center}
          zoom={13}
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ position: "absolute", inset: 0 }}
        >
          {results.map((place) => (
            <Marker
              key={place.place_id}
              position={place.geometry.location}
              title={place.name}
            />
          ))}
        </Map>
      </div>

      <div className="mt-6 w-full max-w-2xl">
        {results.length > 0 ? (
          results.map((place) => (
            <div
              key={place.place_id}
              onClick={() => centerMapOnPlace(place)}
              className="bg-gray-100 rounded-lg p-4 mb-4 shadow cursor-pointer hover:bg-gray-200 transition"
            >
              <h2 className="text-lg font-semibold">{place.name}</h2>
              <p className="text-sm text-gray-600">
                {place.vicinity || place.formatted_address}
              </p>
              {place.rating && <p className="text-sm">⭐ {place.rating} / 5</p>}
              {place.opening_hours?.open_now !== undefined && (
                <p className="text-sm">
                  {place.opening_hours.open_now ? "🟢 Open Now" : "🔴 Closed"}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results to display</p>
        )}
      </div>
    </div>
  );
}
