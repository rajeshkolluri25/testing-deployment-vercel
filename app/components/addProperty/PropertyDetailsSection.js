// components/sections/PropertyDetailsSection.jsx
"use client";
import React, { useState, useEffect } from "react";
import { Building, MapPin } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { InputAdornment } from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import PropertiesPage from "../common/maps";
import CustomCityAutoComplete from "../common/forms/customCityAutoComplete";
import UserLocationAutoComplete from "../common/forms/userLocationAutoComplete";
import { useFormContext } from "react-hook-form"; // Import useFormContext
import { getCityBounds } from "../../utils";

const PropertyDetailsSection = ({ goToNextTab, onLocationSelect }) => {
  const [apiAddress, setApiAddress] = useState(null);
  const [cityBounds, setCityBounds] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); // Initialize without form value
  const [cityCleared, setCityCleared] = useState(false);
  const [selectedMapAddress, setSelectedMapAddress] = useState("");
  const { control, formState, setValue, clearErrors, getValues, watch } =
    useFormContext(); // Get form context
  console.log("apiAddress", apiAddress);

  useEffect(() => {
    // Initialize selectedCity from form values on mount
    setSelectedCity(getValues().city || "");
  }, [getValues]);

  const endAdornment = (
    <InputAdornment position="end">
      <CiLocationOn />
    </InputAdornment>
  );

  const cityHandler = (cityObject) => {
    if (cityObject?.name) {
      setSelectedCity(cityObject.name);
      setValue("city", cityObject.name); // Update form value
      handleCityBounds(cityObject.name); // 👉 Call bounds update immediately
    } else if (cityObject === null) {
      setSelectedCity("");
      setValue("city", ""); // Update form value
      handleCityBounds(""); // 👉 Reset bounds if city is cleared
    }
  };

  const getMapSelectedAddress = (address) => {
    console.log("Selected Address from Map:", address);
    setApiAddress({ ...address }); // Create a new object
    setSelectedMapAddress(address);
    clearErrors("location");
    setValue("location", address?.fullAddress);
  };
  const handleCityBounds = (city) => {
    if (city) {
      getCityBounds(city)
        .then((bounds) => {
          console.log("City Bounds:", bounds);
          setCityBounds(bounds);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleCityClear = () => {
    setCityCleared(true);
    setValue("city", "");
    setSelectedCity("");
  };

  const handleClearLocation = () => {
    setValue("location", "");
    setApiAddress(null);
  };

  // Example of using getValues().city in a useEffect dependency

  useEffect(() => {
    const currentCity = getValues().city;
    if (apiAddress && currentCity) {
      handleCityBounds(currentCity);
    }
  }, [apiAddress]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Property Details
        </CardTitle>
        <CardDescription>
          Enter the basic details about the property.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <FormField
            control={control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Residential Apartment">
                      Apartment
                    </SelectItem>
                    <SelectItem value="Independent House">
                      Independent House
                    </SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <FormField
            control={control}
            name="propertyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building/Project Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter building or project name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <CustomCityAutoComplete
                    name={field.name}
                    control={control}
                    rules={{ required: "City is required" }}
                    errors={formState.errors}
                    cityHandler={cityHandler}
                    defaultValue={field.value}
                    handleCityClear={handleCityClear}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <UserLocationAutoComplete
                    name={field.name}
                    field={field} // Pass the field object
                    errors={formState.errors}
                    error={!!formState.errors?.location}
                    label="Search your location"
                    control={control}
                    setApiAddress={setApiAddress}
                    InputProps={{
                      endAdornment: endAdornment,
                    }}
                    defaultValue={apiAddress?.fullAddress || field.value}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    handleClearValue={handleClearLocation}
                    country="IN"
                    selectedCity={getValues().city}
                    selectedMapAddress={selectedMapAddress}
                    cityBounds={cityBounds}
                    cityCleared={cityCleared}
                    setCityCleared={setCityCleared}
                    onLocationSelect={onLocationSelect}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <PropertiesPage
            getMapSelectedAddress={getMapSelectedAddress}
            cityBounds={cityBounds}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button type="button" onClick={goToNextTab}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetailsSection;
