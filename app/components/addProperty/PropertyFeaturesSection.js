
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Home } from "lucide-react";
import { PropertyFormValues, amenitiesOptions } from "./propertyFormSchema";

import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../ui/card";



const PropertyFeaturesSection = ({ form, goToPrevTab, goToNextTab }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Home className="mr-2 h-5 w-5" />
          Property Features
        </CardTitle>
        <CardDescription>
          Provide details about the property features and amenities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="bhk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BHK Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select BHK type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1 BHK">1 BHK</SelectItem>
                  <SelectItem value="2 BHK">2 BHK</SelectItem>
                  <SelectItem value="3 BHK">3 BHK</SelectItem>
                  <SelectItem value="4 BHK">4 BHK</SelectItem>
                  <SelectItem value="5+ BHK">5+ BHK</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="totalFloors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Floors</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter total floors" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="floorNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor Number</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter floor number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="furnishedStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Furnished Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select furnished status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Fully furnished">Fully Furnished</SelectItem>
                  <SelectItem value="Semi-furnished">Semi-Furnished</SelectItem>
                  <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amenities"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Amenities</FormLabel>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {amenitiesOptions.map((amenity) => (
                  <FormField
                    key={amenity}
                    control={form.control}
                    name="amenities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={amenity}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(amenity)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                return checked
                                  ? field.onChange([...currentValues, amenity])
                                  : field.onChange(
                                      currentValues.filter(
                                        (value) => value !== amenity
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {amenity}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-between mt-4">
          <Button type="button" variant="outline" onClick={goToPrevTab}>Previous</Button>
          <Button type="button" onClick={goToNextTab}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFeaturesSection;
