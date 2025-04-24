// components/common/maps/propertiesMap.js
"use client";
import React, { memo, useState, useCallback, useEffect } from "react";
import { getAddressFromCoordinates } from "../forms/getAddress";
import { toast } from "react-toastify";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
};

const PropertyMap = ({ properties, getMapSelectedAddress, cityBounds }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API_KEY,
    libraries: ["places"],
  });
  console.log("cityBounds", cityBounds);

  const [map, setMap] = useState(null);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 17.385044,
    lng: 78.486671,
  });

  console.log("defaultCenter", defaultCenter);

  const isInsideBounds = (lat, lng) => {
    return (
      lat <= cityBounds.north &&
      lat >= cityBounds.south &&
      lng <= cityBounds.east &&
      lng >= cityBounds.west
    );
  };

  // ✅ Calculate Center Dynamically from Bounds
  useEffect(() => {
    if (cityBounds) {
      const lat = (cityBounds.north + cityBounds.south) / 2;
      const lng = (cityBounds.east + cityBounds.west) / 2;
      setDefaultCenter({ lat, lng });
    }
  }, [cityBounds]);

  // ✅ Restrict Map to Dynamic Bounds
  const onLoad = useCallback(
    (mapInstance) => {
      if (cityBounds) {
        const bounds = new window.google.maps.LatLngBounds({
          north: cityBounds.north,
          south: cityBounds.south,
          east: cityBounds.east,
          west: cityBounds.west,
        });

        mapInstance.fitBounds(bounds);

        // ✅ Prevent users from panning outside the city bounds
        mapInstance.setOptions({
          restriction: { latLngBounds: bounds, strictBounds: false },
        });
      }

      setMap(mapInstance);
    },
    [cityBounds]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    if (!isInsideBounds(lat, lng)) {
      toast.warning("Please select a location inside the city.");
      if (map && cityBounds) {
        const bounds = new window.google.maps.LatLngBounds({
          north: cityBounds.north,
          south: cityBounds.south,
          east: cityBounds.east,
          west: cityBounds.west,
        });
        map.fitBounds(bounds);
      }
      return;
    }
    const results = await getAddressFromCoordinates(lat, lng);
    console.log("results", results);
    getMapSelectedAddress && getMapSelectedAddress(results);
  };

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      key={JSON.stringify(cityBounds)}
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={defaultCenter} // ✅ Dynamic Center
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {properties?.map((property, index) => (
        <Marker
          key={index}
          position={{ lat: property.latitude, lng: property.longitude }}
          title={property.name}
        />
      ))}
    </GoogleMap>
  );
};

export default memo(PropertyMap);
