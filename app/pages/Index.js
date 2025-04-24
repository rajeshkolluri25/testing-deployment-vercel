"use client"
import React from "react";
import { 
  Building, 
  Users, 
  UserPlus, 
  DollarSign,
  BarChart3,
  PieChart,
  Map,
  Home
} from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";
import { PropertyTable } from "../components/dashboard/PropertyTable";
import { AreaChart } from "../components/dashboard/AreaChart";
import { MapView } from "../components/dashboard/MapView";
import { CardHoverEffect } from "../components/ui/card-hover-effect";
import { cn } from "../lib/utils";
import { useIsMobile } from "../hooks/use-mobile";
import "../index.css";
import { DashboardPropertyTable } from "../components/dashboard/DashboardPropertyTable";

// Feature card items for the dashboard
const featureItems = [
  {
    icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
    title: "Analytics Dashboard",
    description: "Real-time insights on property listings, user activity, and market trends."
  },
  {
    icon: <Building className="h-5 w-5 text-purple-500" />,
    title: "Property Management",
    description: "Easily add, edit, and manage all property listings from one place."
  },
  {
    icon: <UserPlus className="h-5 w-5 text-emerald-500" />,
    title: "User Administration",
    description: "Manage sellers, agents, and customers with advanced filtering."
  },
  {
    icon: <Map className="h-5 w-5 text-amber-500" />,
    title: "Location Insights",
    description: "Visualize property distribution across different locations."
  },
  {
    icon: <PieChart className="h-5 w-5 text-red-500" />,
    title: "Performance Reports",
    description: "Generate custom reports for business performance analysis."
  },
  {
    icon: <Home className="h-5 w-5 text-cyan-500" />,
    title: "Listing Approval",
    description: "Review and approve new property listings with ease."
  }
];

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="py-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to your real estate admin dashboard.</p>
      </div>
      <div className="grid grid-cols-1  mt-6 mb-3 ">
      <h3 className="text-xl font-semibold">Properties</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
       
        <StatCard
          title="Total Properties"
          value="1,234"
          icon={<Building className="h-5 w-5 text-white" />}
          change={{ value: 12.5, isPositive: true }}
          accentColor="bg-blue-500"
          className="animate-slide-in-left delay-100"
        />
        <StatCard
          title="Total Users"
          value="5,678"
          icon={<Users className="h-5 w-5 text-white" />}
          change={{ value: 8.3, isPositive: true }}
          accentColor="bg-emerald-500"
          className="animate-slide-in-left delay-200"
        />
        <StatCard
          title="Total Agents"
          value="246"
          icon={<UserPlus className="h-5 w-5 text-white" />}
          change={{ value: 4.2, isPositive: false }}
          accentColor="bg-purple-500"
          className="animate-slide-in-left delay-300"
        />
        <StatCard
          title="Monthly Revenue"
          value="$45.2k"
          icon={<DollarSign className="h-5 w-5 text-white" />}
          change={{ value: 18.7, isPositive: true }}
          accentColor="bg-amber-500"
          className="animate-slide-in-left delay-400"
        />
      </div>
      
      {/* <div className="grid grid-cols-1  mt-6 mb-3 ">
      <h3 className="text-xl font-semibold">Customers</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
       
        <StatCard
          title="Total Customers"
          value="1,234"
          icon={<Building className="h-5 w-5 text-white" />}
          change={{ value: 12.5, isPositive: true }}
          accentColor="bg-blue-500"
          className="animate-slide-in-left delay-100"
        />
        <StatCard
          title="Active Customers"
          value="5,678"
          icon={<Users className="h-5 w-5 text-white" />}
          change={{ value: 8.3, isPositive: true }}
          accentColor="bg-emerald-500"
          className="animate-slide-in-left delay-200"
        />
        <StatCard
          title="Inactive Customers"
          value="246"
          icon={<UserPlus className="h-5 w-5 text-white" />}
          change={{ value: 4.2, isPositive: false }}
          accentColor="bg-purple-500"
          className="animate-slide-in-left delay-300"
        />
         
      </div> */}
      {/* <div className="grid grid-cols-1  mt-6 mb-3 ">
      <h3 className="text-xl font-semibold">Sellers</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
       
        <StatCard
          title="Total Sellers"
          value="1,234"
          icon={<Building className="h-5 w-5 text-white" />}
          change={{ value: 12.5, isPositive: true }}
          accentColor="bg-blue-500"
          className="animate-slide-in-left delay-100"
        />
        <StatCard
          title="Agents"
          value="5,678"
          icon={<Users className="h-5 w-5 text-white" />}
          change={{ value: 8.3, isPositive: true }}
          accentColor="bg-emerald-500"
          className="animate-slide-in-left delay-200"
        />
        <StatCard
          title="Builders"
          value="246"
          icon={<UserPlus className="h-5 w-5 text-white" />}
          change={{ value: 4.2, isPositive: false }}
          accentColor="bg-purple-500"
          className="animate-slide-in-left delay-300"
        />
        <StatCard
          title="Owners"
          value="$45.2k"
          icon={<DollarSign className="h-5 w-5 text-white" />}
          change={{ value: 18.7, isPositive: true }}
          accentColor="bg-amber-500"
          className="animate-slide-in-left delay-400"
        />
      </div> */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recent Properties</h2>
          <p className="text-muted-foreground mt-1">Manage your property listings or review pending approvals.</p>
        </div>
        {/* <PropertyTable className="animate-fade-in delay-200" /> */}
        <DashboardPropertyTable className="animate-fade-in delay-200"/>
      </div>
      
      {/* <div className="space-y-6 mt-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Platform Features</h2>
          <p className="text-muted-foreground mt-1">Explore the powerful tools and features available to you.</p>
        </div>
        <CardHoverEffect items={featureItems} className="animate-fade-in delay-300" />
      </div> */}
    </div>
  );
};

export default Index;
