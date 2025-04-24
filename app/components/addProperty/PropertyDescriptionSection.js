
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Pen } from "lucide-react";
import { PropertyFormValues } from "./propertyFormSchema";

import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";



const PropertyDescriptionSection = ({ form, goToPrevTab, goToNextTab }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Pen className="mr-2 h-5 w-5" />
          Property Description
        </CardTitle>
        <CardDescription>
          Provide a detailed description of the property.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter a detailed description of the property..." 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
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

export default PropertyDescriptionSection;
