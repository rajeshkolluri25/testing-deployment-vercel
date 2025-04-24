// propertyFormSchema.js

import * as yup from "yup";

const propertyDetailsSchema = yup.object().shape({
  propertyType: yup.string().required("Property Type is required"),
  buildingName: yup.string(),
  city: yup.string().required("City is required"),
  location: yup.string().required("Location is required"),
});

// Schema for PropertyFeaturesSection
const propertyFeaturesSchema = yup.object().shape({
  bhk: yup.string().required("BHK is required"),
  totalFloors: yup
    .number()
    .nullable()
    .transform((_, val) => (val === "" ? undefined : val)),
  floorNumber: yup
    .number()
    .nullable()
    .transform((_, val) => (val === "" ? undefined : val)),
  furnishedStatus: yup.string().required("Furnished Status is required"),
  amenities: yup.array().of(yup.string()),
});

// Schema for PropertyAreaSection
const propertyAreaSchema = yup.object().shape({
  builtUpArea: yup
    .number()
    .nullable()
    .transform((_, val) => (val === "" ? undefined : val))
    .required("Built-up Area is required"),
  carpetArea: yup
    .number()
    .nullable()
    .transform((_, val) => (val === "" ? undefined : val))
    .required("Carpet Area is required"),
});

// Schema for PropertyTransactionSection
const propertyTransactionSchema = yup.object().shape({
  possessionStatus: yup.string().required("Possession Status is required"),
  ageOfProperty: yup
    .number()
    .nullable()
    .transform((_, val) => (val === "" ? undefined : val)),
});

// Schema for PropertyDescriptionSection
const propertyDescriptionSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
});

// Schema for PropertyPriceSection
const propertyPriceSchema = yup.object().shape({
  totalPrice: yup
    .number()
    .nullable()
    .transform((_, val) => (val === "" ? undefined : val))
    .required("Total Price is required"),
  pricePerSqFt: yup
    .number()
    .nullable()
    .transform((_, val) => (val === "" ? undefined : val)),
  reraId: yup.string(),
});

// Combined schema for the entire form (optional, for final submission validation)
const propertyFormSchema = yup.object().shape({
  ...propertyDetailsSchema.fields,
  ...propertyFeaturesSchema.fields,
  ...propertyAreaSchema.fields,
  ...propertyTransactionSchema.fields,
  ...propertyDescriptionSchema.fields,
  ...propertyPriceSchema.fields,
});

export {
  propertyDetailsSchema,
  propertyFeaturesSchema,
  propertyAreaSchema,
  propertyTransactionSchema,
  propertyDescriptionSchema,
  propertyPriceSchema,
  propertyFormSchema,
};

// Define amenities options
export const amenitiesOptions = [
  "Swimming Pool",
  "Gym",
  "Garden",
  "Elevator",
  "Security",
  "Parking",
  "Power Backup",
  "Club House",
  "Children's Play Area",
  "Tennis Court",
  "Indoor Games",
  "Jogging Track",
];
