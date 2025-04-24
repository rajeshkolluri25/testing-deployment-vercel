export const getAddressFromCoordinates = async (lat, lon) => {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      console.log("locationMapsResults", data.results);

      function getFormattedAddress(data) {
        let filteredData = data.find((item) => item.types.includes("premise"));

        if (!filteredData) {
          filteredData = data.find((item) =>
            item.types.includes("street_address")
          );
        }

        if (!filteredData) {
          console.log("No valid address found");
          return null;
        }

        console.log("filteredData", filteredData);

        return getAddressFromMapSelection({
          filteredData, // Correct key name
          lat,
          lon,
        });
      }

      const address = getFormattedAddress(data.results);

      return address || "Address not found"; // Ensure a fallback value
    }

    return "Address not found";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Address not found";
  }
};
export const getUserAddress = (placeDetails) => {
  console.log("locationPlaceDetails", placeDetails);
  let state = "",
    city = "",
    country = "",
    line2 = "",
    line1 = "",
    zip_code = "";
  let fullAdress = placeDetails?.formatted_address;
  let locationName = placeDetails?.name;
  if (locationName) {
    locationName = locationName.split("|")[0].trim();
  }

  let Latitude = placeDetails?.geometry?.location?.lat();
  let Longitude = placeDetails?.geometry?.location?.lng();
  if (placeDetails?.address_components !== undefined) {
    let addrComp = placeDetails?.address_components;
    for (let i = 0; i < addrComp.length; ++i) {
      var typ = addrComp[i].types;
      //compIsType checks the type and returns boolean
      if (compIsType(typ, "administrative_area_level_1"))
        state = addrComp[i].long_name; //store the state
      else if (compIsType(typ, "locality"))
        city = addrComp[i].long_name; //store the city
      else if (compIsType(typ, "country"))
        country = addrComp[i].long_name; //store the country
      else if (compIsType(typ, "postal_code"))
        zip_code = addrComp[i].long_name; //store the pincode
      else if (compIsType(typ, "premise"))
        line1 = line1
          ? line1 + ", " + addrComp[i].long_name
          : addrComp[i].long_name;
      //stores in line1
      else if (compIsType(typ, "neighborhood"))
        line1 = line1
          ? line1 + ", " + addrComp[i].long_name
          : addrComp[i].long_name;
      //stores in line1
      else if (compIsType(typ, "sublocality_level_3"))
        line2 = line2
          ? line2 + ", " + addrComp[i].long_name
          : addrComp[i].long_name;
      //stores in line2
      else if (compIsType(typ, "sublocality_level_2"))
        line2 = line2
          ? line2 + ", " + addrComp[i].long_name
          : addrComp[i].long_name;
      //stores in line2
      else if (compIsType(typ, "sublocality_level_1"))
        line2 = line2
          ? line2 + ", " + addrComp[i].long_name
          : addrComp[i].long_name; //stores in line2

      //we can break early if we find all three data
      // if (state != null && city != null && country != null) break;
    }
  }
  // console.log("location :: ", placeDetails);
  // console.log("Latitude :: ", placeDetails.geometry.location.lat());
  // console.log("Longitude :: ", placeDetails.geometry.location.lng());
  // console.log("vicinity :: ", placeDetails.
  // formatted_address);

  return {
    line1,
    line2,
    city,
    state,
    country,
    zip_code,
    fullAdress: fullAdress,
    latitude: Latitude,
    longitude: Longitude,
    locationName: locationName,
  };
};
export const getSimplifiedAddress = (placeDetails) => {
  console.log("locationPlaceDetails", placeDetails);

  if (!placeDetails) {
    console.warn("getSimplifiedAddress received undefined placeDetails");
    return {
      locationName: "",
      city: "",
      state: "",
      country: "",
      zip_code: "",
      locality: "",
      fullAddress: "",
      latitude: null,
      longitude: null,
    };
  }

  let state = "",
    city = "",
    country = "",
    zip_code = "",
    locality = "";

  const fullAddress = placeDetails?.formatted_address || "";
  let locationName = placeDetails?.name?.split("|")[0]?.trim() || "";
  const latitude = placeDetails?.geometry?.location?.lat() || null;
  const longitude = placeDetails?.geometry?.location?.lng() || null;

  if (placeDetails?.address_components) {
    placeDetails.address_components.forEach((component) => {
      const types = component.types;
      const longName = component.long_name;

      // Add checks before potentially using substring or other string methods
      if (Array.isArray(types)) {
        // Assuming compIsType checks if any type in the array matches
        if (
          compIsType(types, "administrative_area_level_1") &&
          typeof longName === "string"
        ) {
          state = longName;
        } else if (
          compIsType(types, ["sublocality_level_1", "sublocality"]) &&
          typeof longName === "string"
        ) {
          locality = longName;
        } else if (
          compIsType(types, "locality") &&
          typeof longName === "string"
        ) {
          city = longName;
        } else if (
          compIsType(types, "country") &&
          typeof longName === "string"
        ) {
          country = longName;
        } else if (
          compIsType(types, "postal_code") &&
          typeof longName === "string"
        ) {
          zip_code = longName;
        }
      }
    });
  }

  return {
    locationName,
    city,
    state,
    country,
    zip_code,
    locality,
    fullAddress,
    latitude,
    longitude,
  };
};

// You still need to ensure your compIsType function handles undefined or non-string types safely.
// Here's a reminder of a safe implementation:
const compIsType = (componentTypes, typeToCheck) => {
  if (!Array.isArray(componentTypes)) {
    return false;
  }

  if (typeof typeToCheck === "string") {
    return componentTypes.includes(typeToCheck);
  } else if (Array.isArray(typeToCheck)) {
    return typeToCheck.some((type) => componentTypes.includes(type));
  }

  return false;
};
