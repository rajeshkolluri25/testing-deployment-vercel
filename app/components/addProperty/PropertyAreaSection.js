
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Ruler } from "lucide-react";
import { PropertyFormValues } from "./propertyFormSchema";

import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";


const PropertyAreaSection = ({ form, goToPrevTab, goToNextTab }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Ruler className="mr-2 h-5 w-5" />
          Property Area
        </CardTitle>
        <CardDescription>
          Enter the area details for the property.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="builtUpArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Built-up Area (sq ft)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter built-up area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="carpetArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carpet Area (sq ft)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter carpet area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-between mt-4">
          <Button type="button" variant="outline" onClick={goToPrevTab}>Previous</Button>
          <Button type="button" onClick={goToNextTab}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyAreaSection;
