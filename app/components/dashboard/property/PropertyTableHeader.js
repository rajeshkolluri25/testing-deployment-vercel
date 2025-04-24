import React from "react";
import { TableHead, TableHeader, TableRow } from "../../ui/table";
import { ChevronUp, ChevronDown } from "lucide-react";

export const PropertyTableHeader = ({ sortBy, sortDirection, handleSort }) => {
  const SortIcon = ({ field }) => {
    if (sortBy !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead colSpan={2} className="w-[80px]">
          Created Date
        </TableHead>
        <TableHead colSpan={2} className="w-[80px]">
          Updated Date
        </TableHead>
        <TableHead
          // className="cursor-pointer"
          onClick={() => handleSort("name")}
        >
          <div className="flex items-center gap-1">
            Property Name
            {/* <SortIcon field="name" /> */}
          </div>
        </TableHead>
        <TableHead
          // className="cursor-pointer"
          onClick={() => handleSort("category")}
        >
          <div className="flex items-center gap-1">
            Property Type
            {/* <SortIcon field="category" /> */}
          </div>
        </TableHead>
        <TableHead>Created By</TableHead>
        <TableHead
          // className="cursor-pointer"
          onClick={() => handleSort("location")}
        >
          <div className="flex items-center gap-1">
            Location
            {/* <SortIcon field="location" /> */}
          </div>
        </TableHead>
        <TableHead
          // className="cursor-pointer text-right"
          onClick={() => handleSort("price")}
        >
          <div className="flex items-center justify-end gap-1">
            Price
            {/* <SortIcon field="price" /> */}
          </div>
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
