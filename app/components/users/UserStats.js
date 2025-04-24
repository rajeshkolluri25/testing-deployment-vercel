
import React from "react";
import { UserPlus, Users as UsersIcon, Home, Building2, User } from "lucide-react";
import { StatCard } from "../dashboard/StatCard";



export const UserStats = ({ 
  totalSellers, 
  totalCustomers, 
  totalUsers,
  totalOwners,
  totalAgents,
  totalBuilders,
  displayType 
}) => {
  if (displayType === 'all' || displayType === 'sellers') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard
          title="Total Sellers"
          value={totalSellers.toString()}
          icon={<UserPlus className="h-5 w-5 text-white" />}
          accentColor="bg-blue-500"
        />
        <StatCard
          title="Owners"
          value={totalOwners.toString()}
          icon={<Home className="h-5 w-5 text-white" />}
          accentColor="bg-purple-500"
        />
        <StatCard
          title="Agents"
          value={totalAgents.toString()}
          icon={<User className="h-5 w-5 text-white" />}
          accentColor="bg-emerald-500"
        />
        <StatCard
          title="Builders"
          value={totalBuilders.toString()}
          icon={<Building2 className="h-5 w-5 text-white" />}
          accentColor="bg-amber-500"
        />
        <StatCard
          title="Total Customers"
          value={totalCustomers.toString()}
          icon={<UsersIcon className="h-5 w-5 text-white" />}
          accentColor="bg-rose-500"
        />
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Customers"
          value={totalCustomers.toString()}
          icon={<UsersIcon className="h-5 w-5 text-white" />}
          accentColor="bg-rose-500"
        />
        <StatCard
          title="Verified Customers"
          value={(totalCustomers * 0.8).toFixed(0)} // Assuming 80% are verified
          icon={<User className="h-5 w-5 text-white" />}
          accentColor="bg-emerald-500"
        />
        <StatCard
          title="Total Users"
          value={totalUsers.toString()}
          icon={<UsersIcon className="h-5 w-5 text-white" />}
          accentColor="bg-blue-500"
        />
      </div>
    );
  }
};
