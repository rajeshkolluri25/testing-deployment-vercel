"use client"
import React, { useState } from "react";
import { Plus, UsersIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { UserStats } from "../components/users/UserStats";
import { UserTabs } from "../components/users/UserTabs";
import { UserTable } from "../components/users/UserTable";
import { userData } from "../components/users/UserData";
import "../index.css";

const ITEMS_PER_PAGE = 10;

const Users = () => {
  const [mainTab, setMainTab] = useState("sellers")
  const [sellerTab, setSellerTab] = useState("all");
  const [customerTab, setCustomerTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Get the active tab based on the main tab
  const getActiveTab = () => {
    return mainTab === "sellers" ? sellerTab : customerTab;
  };

  // Set the active tab based on the main tab
  const handleTabChange = (value) => {
    if (mainTab === "sellers") {
      setSellerTab(value);
    } else {
      setCustomerTab(value);
    }
    setCurrentPage(1); // Reset page when changing tabs
  };

  // Filter users based on tabs and search
  const filteredUsers = userData.filter((user) => {
    // First, filter by main tab (sellers or customers)
    if (mainTab === "sellers" && user.type !== "seller") return false;
    if (mainTab === "customers" && user.type !== "customer") return false;

    // Then filter by sub-tab
    if (mainTab === "sellers") {
      if (sellerTab === "agents" && user.role !== "agent") return false;
      if (sellerTab === "owners" && user.role !== "owner") return false;
      if (sellerTab === "builders" && user.role !== "builder") return false;
    } else {
      if (customerTab === "verified" && !user.verified) return false;
      if (customerTab === "pending" && user.verified) return false;
    }

    // Then filter by search term
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Stats calculations
  const stats = {
    totalSellers: userData.filter((u) => u.type === "seller").length,
    totalCustomers: userData.filter((u) => u.type === "customer").length,
    totalUsers: userData.length,
    totalOwners: userData.filter(
      (u) => u.type === "seller" && u.role === "owner"
    ).length,
    totalAgents: userData.filter(
      (u) => u.type === "seller" && u.role === "agent"
    ).length,
    totalBuilders: userData.filter(
      (u) => u.type === "seller" && u.role === "builder"
    ).length,
  };

  return (
    <div className="space-y-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage all users including sellers and customers.
          </p>
        </div>
      </div>

      {/* Main Tabs - Sellers and Customers */}
      <Tabs
        defaultValue="sellers"
        value={mainTab}
        onValueChange={(v) => setMainTab(v)}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="sellers">Sellers</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="sellers" className="mt-0">
          {/* Stats Cards for Sellers */}
          <UserStats
            totalSellers={stats.totalSellers}
            totalCustomers={stats.totalCustomers}
            totalUsers={stats.totalUsers}
            totalOwners={stats.totalOwners}
            totalAgents={stats.totalAgents}
            totalBuilders={stats.totalBuilders}
            displayType="sellers"
          />

          {/* Sub-tabs and content for Sellers */}
          <div className="mt-8">
            <Tabs
              defaultValue="all"
              value={sellerTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <UserTabs
                activeTab={sellerTab}
                onTabChange={handleTabChange}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                mainTab="sellers"
              />

              <TabsContent value="all" className="mt-4">
                <UserTable
                  users={currentUsers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </TabsContent>

              <TabsContent value="agents" className="mt-4">
                <UserTable
                  users={currentUsers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </TabsContent>

              <TabsContent value="owners" className="mt-4">
                <UserTable
                  users={currentUsers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </TabsContent>

              <TabsContent value="builders" className="mt-4">
                <UserTable
                  users={currentUsers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-0">
          {/* Stats Cards for Customers */}
          <UserStats
            totalSellers={stats.totalSellers}
            totalCustomers={stats.totalCustomers}
            totalUsers={stats.totalUsers}
            totalOwners={stats.totalOwners}
            totalAgents={stats.totalAgents}
            totalBuilders={stats.totalBuilders}
            displayType="customers"
          />

          {/* Sub-tabs and content for Customers */}
          <div className="mt-8">
            <Tabs
              defaultValue="all"
              value={customerTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <UserTabs
                activeTab={customerTab}
                onTabChange={handleTabChange}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                mainTab="customers"
              />

              <TabsContent value="all" className="mt-4">
                <UserTable
                  users={currentUsers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </TabsContent>

              <TabsContent value="verified" className="mt-4">
                <UserTable
                  users={currentUsers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </TabsContent>

              <TabsContent value="pending" className="mt-4">
                <UserTable
                  users={currentUsers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
