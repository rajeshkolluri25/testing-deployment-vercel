// CustomCityAutoComplete.jsx
import { useLazyGetCitiesQuery } from "../../../redux/property/index";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import React, { useMemo, useState, useEffect } from "react";
import _debounce from "lodash/debounce";
import { Typography } from "@mui/material";

export default function CustomCityAutoComplete({
  name,
  rules,
  cityHandler,
  errors,
  defaultValue,
  handleCityClear,
  ...rest
}) {
  const { control, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [hasTyped, setHasTyped] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [getCities] = useLazyGetCitiesQuery();

  const debouncedGetLocationData = useMemo(
    () =>
      _debounce(async (keyword = "") => {
        setCityLoading(true);
        if (keyword) {
          const result = await getCities({ keyword, country: "India" });
          setCityOptions(result?.data?.data || []);
        }
        setCityLoading(false);
      }, 1500),
    [getCities]
  );

  useEffect(() => {
    if (defaultValue) {
      setSelectedCity({ name: defaultValue });
      setInputValue(defaultValue);
      setValue(name, defaultValue);
      setHasTyped(false);
    }
  }, [defaultValue, setValue, name]);

  const handleCityChange = (value) => {
    if (value == null) {
      handleCityClear();
    } else {
      setSelectedCity(value);
      cityHandler && cityHandler(value);
    }
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            freeSolo={cityLoading ? true : false}
            options={cityOptions}
            loading={cityLoading}
            value={selectedCity}
            inputValue={inputValue}
            loadingText="Loading"
            forcePopupIcon={false}
            noOptionsText={
              hasTyped && !cityLoading && cityOptions.length === 0
                ? "No Results Found"
                : ""
            }
            getOptionLabel={(option) => option.name || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                {...rest}
                inputRef={ref}
                placeholder="Search City/Town"
              />
            )}
            onChange={(_, value) => {
              handleCityChange(value);
              field.onChange(value?.name || "");
            }}
            onInputChange={(_, value) => {
              setInputValue(value);
              setHasTyped(!!value);
              if (value) debouncedGetLocationData(value);
            }}
          />
        )}
      />
      {errors?.[name]?.message && (
        <Typography className="text-danger fs-13 mt-1">
          {errors[name].message.includes("cannot be null")
            ? "Please enter your location"
            : errors[name].message}
        </Typography>
      )}
    </>
  );
}
