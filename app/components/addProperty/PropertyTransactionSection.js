
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Key } from "lucide-react";

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


const PropertyTransactionSection = ({ form, goToPrevTab, goToNextTab }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="mr-2 h-5 w-5" />
          Transaction Type
        </CardTitle>
        <CardDescription>
          Provide details about possession and property age.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="possessionStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Possession Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select possession status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ready to move">Ready to Move</SelectItem>
                  <SelectItem value="Under construction">Under Construction</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="ageOfProperty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age of Property (years)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter property age" {...field} />
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

export default PropertyTransactionSection;
