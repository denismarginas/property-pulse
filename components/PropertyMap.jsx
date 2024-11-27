"use client";
import { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import mapboxgl from "mapbox-gl";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, SetLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "us", // Default region for responses.
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} 
          ${property.location.state} ${property.location.zipcode}`
        );

        // Check for results
        if (res.results.length === 0) {
          // No results found
          setGeocodeError(true);
          SetLoading(false);
          return;
        }
        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });

        SetLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        SetLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  // Handle case when geocode failed
  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }
  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={mapboxgl}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 15,
        }}
        style={{ width: "100%", height: "500px" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image
            src={pin}
            alt="Location"
            width={40}
            height={40}
            style={{ width: "40px", height: "40px" }}
          />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
