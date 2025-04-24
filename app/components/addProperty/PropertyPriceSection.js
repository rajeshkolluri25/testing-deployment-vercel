
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Tag } from "lucide-react";

import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../ui/card";



const PropertyPriceSection = ({ form, goToPrevTab, goToNextTab }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Tag className="mr-2 h-5 w-5" />
          Price Details
        </CardTitle>
        <CardDescription>
          Enter pricing information for the property.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="totalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Price ($)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter total price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="pricePerSqFt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per sq ft ($)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter price per sq ft" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="reraId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RERA ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter RERA ID" {...field} />
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

export default PropertyPriceSection;
