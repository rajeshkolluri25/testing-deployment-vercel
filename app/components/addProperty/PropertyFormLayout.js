import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";
import PropertyDetailsSection from "./PropertyDetailsSection";
import PropertyFeaturesSection from "./PropertyFeaturesSection";
import PropertyAreaSection from "./PropertyAreaSection";
import PropertyTransactionSection from "./PropertyTransactionSection";
import PropertyDescriptionSection from "./PropertyDescriptionSection";
import PropertyPriceSection from "./PropertyPriceSection";
import PropertyUploadsSection from "./PropertyUploadsSection";
import {
  usePropertyCreationMutation,
  useUpdatePropertyMutation,
} from "../../redux/property/index";
import {
  propertyDetailsSchema,
  propertyFeaturesSchema,
  propertyAreaSchema,
  propertyTransactionSchema,
  propertyDescriptionSchema,
  propertyPriceSchema,
  propertyFormSchema,
} from "./propertyFormSchema";
import { add } from "date-fns";

const PropertyFormLayout = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("section1");
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [propertyCreation] = usePropertyCreationMutation();
  const [updatePropertyData] = useUpdatePropertyMutation();
  const userid = "67923b2486bd45e5c9ba4c46";
  const [apiAddress, setApiAddress] = useState(null);

  console.log("apiAddress", apiAddress);

  const form = useForm({
    resolver: yupResolver(propertyFormSchema),
    defaultValues: {
      propertyType: "",
      buildingName: "",
      city: "",
      location: "",
      bhk: "",
      totalFloors: undefined,
      floorNumber: undefined,
      furnishedStatus: "",
      amenities: [],
      builtUpArea: undefined,
      carpetArea: undefined,
      possessionStatus: "",
      ageOfProperty: undefined,
      description: "",
      totalPrice: undefined,
      pricePerSqFt: undefined,
      reraId: "",
      propertyName: "", // Assuming you have propertyName elsewhere
      cost: undefined, // Add cost to default values if needed later
      bhkType: "", // Add bhkType to default values if needed later
      totalNumberOfFloors: undefined, // Add totalNumberOfFloors if needed later
      posessionStatus: "", // Add posessionStatus if needed later
      description: "", // Ensure description is in default values
      builtupArea: undefined, // Ensure builtupArea is in default values
      carpetArea: undefined, // Ensure carpetArea is in default values
    },
    mode: "onChange",
  });

  const { handleSubmit, trigger, formState, getValues } = form;

  const handleCreateOrUpdate = async (payload) => {
    if (propertyData?._id) {
      const response = await updatePropertyData({
        id: propertyData._id,
        ...payload,
      });
      if (response?.data?.data) {
        setPropertyData(response.data.data);
        return true;
      } else {
        toast.error("Failed to update property details.");
        return false;
      }
    } else {
      const response = await propertyCreation(payload);
      if (response?.data?.data?._id) {
        setPropertyData(response.data.data);
        return true;
      } else {
        toast.error("Failed to create property details.");
        return false;
      }
    }
  };
  const handleLocationSelected = (address) => {
    setApiAddress(address);
  };
  const handleTabUpdate = async (payload) => {
    if (propertyData?._id) {
      const response = await updatePropertyData({
        id: propertyData._id,
        ...payload,
      });
      if (response?.data?.data) {
        setPropertyData(response.data.data);
        return true;
      } else {
        toast.error(`Failed to update section ${activeTab}.`);
        return false;
      }
    } else {
      toast.error("Please complete the Property Details section first.");
      return false;
    }
  };

  const goToNextTab = async () => {
    const tabMapping = {
      section1: "section2",
      section2: "section3",
      section3: "section4",
      section4: "section5",
      section5: "section6",
      section6: "section7",
    };

    let isValid = true;
    let payload = {};

    switch (activeTab) {
      case "section1":
        isValid = await trigger(Object.keys(propertyDetailsSchema.fields));
        payload = {
          propertyName: getValues().propertyName, // Assuming you have propertyName elsewhere
          createdUserId: userid,
          createdByRole: "admin",
          address: {
            locality: apiAddress?.locality,
            city: getValues().city,
            state: apiAddress?.state,
            country: apiAddress?.country,
            zipcode: apiAddress?.zip_code,
            fullAddress: apiAddress?.fullAddress,
            place_id: apiAddress?.place_id,
          },
          location: {
            type: "Point",
            coordinates: [apiAddress?.longitude, apiAddress?.latitude],
          },
        };
        break;
      case "section2":
        isValid = await trigger(Object.keys(propertyFeaturesSchema.fields));
        payload = {
          amenities: getValues().amenities,
          propertyConfiguration: [
            {
              name: getValues().bhk,
              totalNumberOfFloors: getValues().totalFloors,
              floorNumber: getValues().floorNumber,
              furnishedStatus: getValues().furnishedStatus,
            },
          ],
        };
        break;
      case "section3":
        isValid = await trigger(Object.keys(propertyAreaSchema.fields));
        payload = {
          propertyConfiguration: [
            {
              builtupArea: { number: getValues().builtUpArea, units: "Sq. Ft" },
              carpetArea: { number: getValues().carpetArea, units: "Sq. Ft" },
            },
          ],
        };
        break;
      case "section4":
        isValid = await trigger(Object.keys(propertyTransactionSchema.fields));
        payload = {
          ageOfProperty: getValues().ageOfProperty,
          propertyConfiguration: [
            {
              posessionStatus: getValues().possessionStatus,
            },
          ],
        };
        break;
      case "section5":
        isValid = await trigger(Object.keys(propertyDescriptionSchema.fields));
        payload = {
          propertyConfiguration: [
            {
              description: getValues().description,
            },
          ],
        };
        break;
      case "section6":
        isValid = await trigger(Object.keys(propertyPriceSchema.fields));
        payload = {
          reraId: getValues().reraId,
          propertyConfiguration: [
            {
              cost: getValues().totalPrice,
              price: getValues().pricePerSqFt,
            },
          ],
        };
        break;
      default:
        break;
    }

    console.log(`--- Before moving from ${activeTab} ---`);
    console.log("Current Form Values:", getValues());
    console.log("Payload for this section:", payload);
    console.log("---------------------------------------");

    if (isValid) {
      let success = false;
      if (activeTab === "section1") {
        success = await handleCreateOrUpdate({
          ...payload,
          builderId: userid || "",
          status: -2,
        });
      } else if (activeTab !== "section7") {
        success = await handleTabUpdate(payload);
      } else {
        success = true; // Allow moving to uploads
      }

      if (success && activeTab in tabMapping) {
        setActiveTab(tabMapping[activeTab]);
      }
    } else {
      toast.error("Please fill in all the required fields in this section.");
    }
  };

  const goToPrevTab = () => {
    const tabMapping = {
      section2: "section1",
      section3: "section2",
      section4: "section3",
      section5: "section4",
      section6: "section5",
      section7: "section6",
    };

    console.log(`--- Before moving back from ${activeTab} ---`);
    console.log("Current Form Values:", getValues());
    console.log("------------------------------------------");

    if (activeTab in tabMapping) {
      setActiveTab(tabMapping[activeTab]);
    }
  };

  const onSubmit = async (values) => {
    console.log("--- Final Form Values (onSubmit) ---");
    console.log("All Form Values:", values);
    console.log("Photos:", photos);
    console.log("Documents:", documents);
    console.log("Property Data ID:", propertyData?._id);
    console.log("------------------------------------");

    if (propertyData?._id) {
      const finalUpdatePayload = {
        photos,
        documents,
      };
      const response = await updatePropertyData({
        id: propertyData._id,
        ...finalUpdatePayload,
      });
      if (response?.data?.data) {
        toast.success("Property updated successfully!");
        router.push("/properties");
      } else {
        toast.error("Failed to update uploads.");
      }
    } else {
      toast.error("Please complete the Property Details section first.");
    }
  };

  return (
    <div className="space-y-6 py-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Add New Property
          </h1>
          <p className="text-muted-foreground mt-1">
            Create a new property listing with detailed information.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/properties")}>
          <X className="mr-2 h-4 w-4" /> Cancel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-7 mb-8">
          <TabsTrigger value="section1">Property Details</TabsTrigger>
          <TabsTrigger value="section2">Features</TabsTrigger>
          <TabsTrigger value="section3">Area</TabsTrigger>
          <TabsTrigger value="section4">Transaction</TabsTrigger>
          <TabsTrigger value="section5">Description</TabsTrigger>
          <TabsTrigger value="section6">Price</TabsTrigger>
          <TabsTrigger value="section7">Uploads</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TabsContent value="section1">
              <PropertyDetailsSection
                form={form}
                goToNextTab={goToNextTab}
                onLocationSelect={handleLocationSelected}
              />
              {Object.keys(formState.errors)
                .filter((key) =>
                  Object.keys(propertyDetailsSchema.fields).includes(key)
                )
                .map((key) => (
                  <p key={key} className="text-red-500 text-sm mt-1">
                    {formState.errors[key]?.message}
                  </p>
                ))}
            </TabsContent>

            <TabsContent value="section2">
              <PropertyFeaturesSection
                form={form}
                goToPrevTab={goToPrevTab}
                goToNextTab={goToNextTab}
              />
              {Object.keys(formState.errors)
                .filter((key) =>
                  Object.keys(propertyFeaturesSchema.fields).includes(key)
                )
                .map((key) => (
                  <p key={key} className="text-red-500 text-sm mt-1">
                    {formState.errors[key]?.message}
                  </p>
                ))}
            </TabsContent>

            <TabsContent value="section3">
              <PropertyAreaSection
                form={form}
                goToPrevTab={goToPrevTab}
                goToNextTab={goToNextTab}
              />
              {Object.keys(formState.errors)
                .filter((key) =>
                  Object.keys(propertyAreaSchema.fields).includes(key)
                )
                .map((key) => (
                  <p key={key} className="text-red-500 text-sm mt-1">
                    {formState.errors[key]?.message}
                  </p>
                ))}
            </TabsContent>

            <TabsContent value="section4">
              <PropertyTransactionSection
                form={form}
                goToPrevTab={goToPrevTab}
                goToNextTab={goToNextTab}
              />
              {Object.keys(formState.errors)
                .filter((key) =>
                  Object.keys(propertyTransactionSchema.fields).includes(key)
                )
                .map((key) => (
                  <p key={key} className="text-red-500 text-sm mt-1">
                    {formState.errors[key]?.message}
                  </p>
                ))}
            </TabsContent>

            <TabsContent value="section5">
              <PropertyDescriptionSection
                form={form}
                goToPrevTab={goToPrevTab}
                goToNextTab={goToNextTab}
              />
              {Object.keys(formState.errors)
                .filter((key) =>
                  Object.keys(propertyDescriptionSchema.fields).includes(key)
                )
                .map((key) => (
                  <p key={key} className="text-red-500 text-sm mt-1">
                    {formState.errors[key]?.message}
                  </p>
                ))}
            </TabsContent>

            <TabsContent value="section6">
              <PropertyPriceSection
                form={form}
                goToPrevTab={goToPrevTab}
                goToNextTab={goToNextTab}
              />
              {Object.keys(formState.errors)
                .filter((key) =>
                  Object.keys(propertyPriceSchema.fields).includes(key)
                )
                .map((key) => (
                  <p key={key} className="text-red-500 text-sm mt-1">
                    {formState.errors[key]?.message}
                  </p>
                ))}
            </TabsContent>

            <TabsContent value="section7">
              <PropertyUploadsSection
                photos={photos}
                setPhotos={setPhotos}
                documents={documents}
                setDocuments={setDocuments}
                goToPrevTab={goToPrevTab}
              />
              <div className="flex justify-end mt-4">
                <Button type="submit">Submit Property</Button>
              </div>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default PropertyFormLayout;
