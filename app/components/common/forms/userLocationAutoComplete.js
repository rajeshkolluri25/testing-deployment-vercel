// components/common/forms/userLocationAutoComplete.js
import React, { useState, useEffect, useCallback } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { debounce } from "@mui/material/utils";
import { Controller } from "react-hook-form";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSimplifiedAddress } from "./getAddress";
import { setUserLocationDetails } from "../../../redux/location/locationSlice";

const UserLocationAutoComplete = ({
  control,
  variant = "standard",
  name,
  label,
  errors,
  InputProps,
  setApiAddress,
  clearErrors,
  defaultValue,
  setValue,
  country,
  handleClearValue,
  selectedCity,
  selectedMapAddress,
  cityBounds,
  cityCleared,
  setCityCleared,
  onLocationSelect,
}) => {
  console.log("UserLocationAutoComplete Props:", {
    name,
    defaultValue,
    selectedCity,
    selectedMapAddress,
    cityBounds,
  }); // Log props for debugging

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API_KEY,
  });

  const [locationData, setLocationData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [shouldClearInput, setShouldClearInput] = useState(false);
  const dispatch = useDispatch();
  const userLocationValues = useSelector((state) => state.locationData);

  const handleInputChange = debounce((newInputValue) => {
    console.log("locationNewInputValue", newInputValue);

    if (newInputValue?.trim() !== "") {
      const commonOptions = {
        input: newInputValue,
        types: [],
        region: "IN",
        componentRestrictions: { country },
      };

      if (selectedCity && cityBounds) {
        getPlacePredictions({
          ...commonOptions,
          types: ["geocode", "establishment"],
          componentRestrictions: { country: "IN" },
          locationRestriction: cityBounds,
        });
      } else {
        getPlacePredictions(commonOptions);
      }
    }
  }, 200);

  const debouncedHandleInputChange = useCallback(
    debounce(handleInputChange, 500),
    [handleInputChange]
  );

  useEffect(() => {
    if (locationData?.length && !shouldClearInput) {
      placesService?.getDetails(
        {
          placeId: locationData,
        },
        (placeDetails) => {
          if (placeDetails) {
            const address = getSimplifiedAddress(placeDetails);
            console.log("tempAddress", address);
            const fullAddress = {
              ...address,
              place_id: locationData,
            };
            setApiAddress(fullAddress);
            setSelectedItem(address);
            dispatch(setUserLocationDetails(address));
            clearErrors(name);
            const addressParts = [
              address?.locationName,
              address?.line1,
              address?.line2,
              address?.state,
              address?.city,
              address?.country,
              address?.zip_code,
            ];
            const formattedAddressString = addressParts
              .filter((part) => part && part.trim())
              .join(", ");
            setInputValue(formattedAddressString || "");
            setValue(name, formattedAddressString);
            if (onLocationSelect) {
              onLocationSelect(fullAddress);
            }
          } else {
            console.error("Error fetching place details:", locationData);
            // Optionally handle the error, e.g., set an error state
          }
        }
      );
    }
  }, [
    locationData,
    placesService,
    clearErrors,
    name,
    shouldClearInput,
    dispatch,
    setApiAddress,
    setValue,
  ]);

  useEffect(() => {
    if (
      userLocationValues?.userLocationDetails &&
      Object.keys(userLocationValues.userLocationDetails).length > 0
    ) {
      setSelectedItem({
        ...userLocationValues?.userLocationDetails,
      });
      const details = userLocationValues.userLocationDetails;
      const addressParts = [
        details?.locationName || details?.line1,
        details?.line2,
        details?.city,
        details?.state,
        details?.country,
        details?.zip_code || details?.zipCode,
      ];
      const formattedAddressString = addressParts
        .filter((part) => part?.trim()) // Ensure part is not null/undefined before trim
        .join(", ");
      setInputValue(formattedAddressString || "");
    } else if (inputValue === "" && defaultValue) {
      setInputValue(defaultValue || "");
      setSelectedItem(
        typeof defaultValue === "string"
          ? { description: defaultValue }
          : defaultValue
      );
      setValue(name, defaultValue);
    }
  }, [
    defaultValue,
    inputValue,
    name,
    setValue,
    userLocationValues?.userLocationDetails,
  ]);

  useEffect(() => {
    if (selectedMapAddress?.fullAddress) {
      setInputValue(selectedMapAddress.fullAddress || "");
    }
  }, [selectedMapAddress]);

  const handleClearValues = () => {
    setInputValue("");
    setLocationData("");
    setSelectedItem("");
    setValue(name, null);
    handleClearValue(true);
    setShouldClearInput(false);
    getPlacePredictions({
      input: "",
      types: [],
      region: "IN",
      componentRestrictions: { country },
    });
  };

  useEffect(() => {
    if (cityCleared || shouldClearInput) {
      handleClearValues();
    }
  }, [cityCleared, handleClearValues, shouldClearInput]);

  return (
    <>
      <Grid>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              {/* {console.log("InputValue before Autocomplete:", inputValue)} */}
              <Autocomplete
                disabled={!selectedCity}
                freeSolo={isPlacePredictionsLoading ? true : false}
                loading={isPlacePredictionsLoading}
                disableClearable={false}
                options={
                  selectedCity && placePredictions ? placePredictions : []
                }
                inputValue={inputValue || ""} // Ensure inputValue is a string
                loadingText="Loading"
                noOptionsText={
                  !isPlacePredictionsLoading && (inputValue || "").trim() !== ""
                    ? "No Results Found"
                    : ""
                }
                onInputChange={(event, value, reason) => {
                  if (
                    (reason === "clear" || value === "") &&
                    reason !== "reset"
                  ) {
                    setShouldClearInput(true);
                    handleClearValues();
                  } else if (reason === "input") {
                    setShouldClearInput(false);
                    setInputValue(value);
                    debouncedHandleInputChange(value);
                    setCityCleared(false);
                  } else if (reason === "reset") {
                    setInputValue(inputValue);
                    setCityCleared(false);
                  }
                }}
                getOptionLabel={(option) => {
                  try {
                    return option?.description || "";
                  } catch (error) {
                    console.error("Error in getOptionLabel:", error, option);
                    return "";
                  }
                }}
                onChange={(e, data) => {
                  if (data) {
                    field.onChange(data.place_id);
                    setLocationData(data.place_id);
                    setSelectedItem(data);
                    setShouldClearInput(false);
                    clearErrors(name);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={label}
                    variant={variant}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      ...InputProps,
                    }}
                  />
                )}
              />
            </>
          )}
        />
      </Grid>
      {errors && errors[name] && errors[name].message && (
        <Typography className="text-danger fs-13 mt-1">
          {errors[name].message}
        </Typography>
      )}
    </>
  );
};

export default UserLocationAutoComplete;
