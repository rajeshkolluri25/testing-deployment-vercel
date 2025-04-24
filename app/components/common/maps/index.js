// components/common/maps/propertiesPage.js
"use client";
import React, { useState } from "react";
import PropertyMap from "./propertiesMap";

const properties = [
  // { name: "Property 1", latitude: 17.385044, longitude: 78.486671 },
  // { name: "Property 2", latitude: 17.395044, longitude: 78.496671 },
  // { name: "Property 3", latitude: 17.405044, longitude: 78.506671 },
];

const PropertiesPage = ({
  mapText,
  getMapSelectedAddress,
  cityBounds,
  fromDetailsPage,
}) => {
  const [selectedAddress, setSelectedAddress] = useState("");

  console.log("selectedAddress", selectedAddress);
  return (
    <div
      className={fromDetailsPage ? "border rounded-3 py-3 px-4 mb-4" : ""}
      name="locality"
    >
      {/* {mapText && <h1>Properties on Map</h1>} */}

      {selectedAddress && (
        <p>
          <strong>Selected Address:</strong> {selectedAddress}
        </p>
      )}

      {/* ✅ Pass setSelectedAddress function to PropertyMap */}
      <PropertyMap
        properties={properties}
        onLocationSelect={setSelectedAddress}
        getMapSelectedAddress={getMapSelectedAddress}
        cityBounds={cityBounds}
      />
    </div>
  );
};

export default PropertiesPage;
