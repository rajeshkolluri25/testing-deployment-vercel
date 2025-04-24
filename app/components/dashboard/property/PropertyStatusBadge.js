import React from "react";
import { Badge } from "../../ui/badge";

export const PropertyStatusBadge = ({ status }) => {
  const statusConfig = {
    3: {
      label: "Sold",
      className: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0",
    },
    2: {
      label: "Completed",
      className: "bg-green-100 text-green-700 hover:bg-green-200 border-0",
    },
    1: {
      label: "Active",
      className:
        "bg-emerald-200 text-emerald-700 hover:bg-emerald-300 border-0",
    },
    0: {
      label: "Pending",
      className: "bg-yellow-200 text-yellow-700 hover:bg-yellow-300 border-0",
    },
    "-1": {
      label: "Rejected",
      className: "bg-rose-200 text-rose-700 hover:bg-rose-200 border-0",
    },
    "-2": {
      label: "Incomplete",
      className: "bg-orange-200 text-orange-700 hover:bg-orange-300 border-0",
    },
    "-3": {
      label: "Spam",
      className: "bg-red-200 text-red-700 hover:bg-red-300 border-0",
    },
    "-4": {
      label: "Expired",
      className: "bg-gray-200 text-gray-700 hover:bg-gray-300 border-0",
    },
    "-5": {
      label: "Deactivated",
      className:
        "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 border-0",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};
