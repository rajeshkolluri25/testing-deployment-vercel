import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Search } from "lucide-react";

export const PropertyFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  propertyTypeFilter,
  setPropertyTypeFilter,
  statusCounts,
}) => {
  const [inputValue, setInputValue] = useState(searchTerm); // local input state

  const propertyTypes = [
    // { value: "propertytype", label: "Property Type" },
    { value: "all", label: "All Types" },
    { value: "Residential Apartment", label: "Apartment" },
    { value: "Independent House", label: "Independent House" },
    { value: "Villa", label: "Villa" },
  ];

  // Debounce input before updating searchTerm (used by parent/API)
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(inputValue); // trigger parent update after debounce
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, setSearchTerm]);

  // You can trigger API based on searchTerm in parent or here
  useEffect(() => {
    if (searchTerm) {
      console.log("Bangtan-Searching for:", searchTerm);
      // Call API here if needed
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-9 w-full md:w-60"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="1">
                Active ({statusCounts.active || 0})
              </SelectItem>
              <SelectItem value="2">
                Completed ({statusCounts.expired || 0})
              </SelectItem>
              <SelectItem value="-5">
                Deactivated ({statusCounts.expired || 0})
              </SelectItem>
              <SelectItem value="-4">
                Expired ({statusCounts.expired || 0})
              </SelectItem>
              <SelectItem value="-2">
                Incomplete ({statusCounts.pending || 0})
              </SelectItem>
              <SelectItem value="0">
                Pending ({statusCounts.pending || 0})
              </SelectItem>
              <SelectItem value="-1">
                Rejected ({statusCounts.rejected || 0})
              </SelectItem>
              <SelectItem value="3">Sold ({statusCounts.sold || 0})</SelectItem>
              <SelectItem value="-3">
                Spam ({statusCounts.sold || 0})
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={propertyTypeFilter}
            onValueChange={setPropertyTypeFilter}
          >
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="all">All Types</SelectItem> */}
              {propertyTypes.map((property, index) => (
                <SelectItem key={index} value={property?.value}>
                  {property?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
