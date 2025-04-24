import React from "react";
import { PropertyTable } from "../components/dashboard/PropertyTable";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import "../index.css";

const Properties = () => {
  return (
    <div className="space-y-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground mt-1">
            Manage all property listings in your platform.
          </p>
        </div>
        <Link href="/add-property">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      <PropertyTable />
    </div>
  );
};

export default Properties;
