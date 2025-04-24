import React from "react";
import { TableBody, TableCell, TableRow } from "../../ui/table";
import { PropertyStatusBadge } from "./PropertyStatusBadge";
import { PropertyActions } from "./PropertyActions";
import { format } from "date-fns";

export const PropertyTableBody = ({ properties, isLoading }) => {
  return (
    <TableBody>
      {isLoading && (
        <TableRow>
          <TableCell colSpan={8} className="h-32 text-center">
            Loading...
          </TableCell>
        </TableRow>
      )}
      {!isLoading && properties?.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} className="h-32 text-center">
            No properties found matching your filters.
          </TableCell>
        </TableRow>
      ) : (
        !isLoading &&
        properties?.map((property, index) => (
          <TableRow key={index} className="animate-fade-in">
            <TableCell colSpan={2} className="font-medium">
              {format(new Date(property?.createdAt), "dd-MMM-yyyy, hh:mm a")}
            </TableCell>
            <TableCell colSpan={2} className="font-medium">
              {" "}
              {format(new Date(property?.updatedAt), "dd-MMM-yyyy, hh:mm a")}
            </TableCell>
            <TableCell className="font-medium">
              {property?.propertyName}
            </TableCell>
            <TableCell>
              {property?.propertyConfiguration?.[0]?.propertyType}
            </TableCell>
            <TableCell>
              {property.builderId?.builderName
                ? property.builderId.builderName
                : `${property.createdUserId?.name?.first_name || ""} ${
                    property.createdUserId?.name?.middle_name || ""
                  } ${property.createdUserId?.name?.last_name || ""}`.trim()}
            </TableCell>

            <TableCell>
              {property?.address
                ? [property.address.city, property.address.country]
                    .filter(Boolean)
                    .join(", ")
                : "Not Available"}
            </TableCell>
            <TableCell className="text-right">
              {property?.propertyConfiguration?.[0]?.cost}
            </TableCell>
            <TableCell>
              <PropertyStatusBadge status={property.status} />
            </TableCell>
            <TableCell>
              <PropertyActions property={property} />
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
};
