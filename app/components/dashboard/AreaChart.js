"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "../../lib/utils";

// Sample data for charts
const monthlyData = [
  { name: "Jan", properties: 65, users: 30, engagement: 48 },
  { name: "Feb", properties: 59, users: 40, engagement: 42 },
  { name: "Mar", properties: 80, users: 45, engagement: 60 },
  { name: "Apr", properties: 81, users: 52, engagement: 75 },
  { name: "May", properties: 56, users: 48, engagement: 62 },
  { name: "Jun", properties: 55, users: 65, engagement: 85 },
  { name: "Jul", properties: 40, users: 70, engagement: 68 },
  { name: "Aug", properties: 90, users: 85, engagement: 97 },
  { name: "Sep", properties: 89, users: 78, engagement: 85 },
  { name: "Oct", properties: 100, users: 90, engagement: 75 },
  { name: "Nov", properties: 93, users: 80, engagement: 88 },
  { name: "Dec", properties: 103, users: 95, engagement: 95 },
];

export const AreaChart = ({ className }) => {
  const [activeMetric, setActiveMetric] = useState("all");

  const handleLegendClick = (metric) => {
    setActiveMetric((prevMetric) => {
      if (prevMetric === "all") return metric;
      if (prevMetric === metric) return "all";
      return metric;
    });
  };

  const shouldShowMetric = (metric) => {
    return activeMetric === "all" || activeMetric === metric;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>
          Monthly property, user, and engagement trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4 md:justify-end">
          <div
            className={cn(
              "flex items-center cursor-pointer select-none",
              activeMetric === "properties" || activeMetric === "all"
                ? "opacity-100"
                : "opacity-50"
            )}
            onClick={() => handleLegendClick("properties")}
          >
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            <span className="text-sm font-medium">Properties</span>
          </div>
          <div
            className={cn(
              "flex items-center cursor-pointer select-none",
              activeMetric === "users" || activeMetric === "all"
                ? "opacity-100"
                : "opacity-50"
            )}
            onClick={() => handleLegendClick("users")}
          >
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
            <span className="text-sm font-medium">Users</span>
          </div>
          <div
            className={cn(
              "flex items-center cursor-pointer select-none",
              activeMetric === "engagement" || activeMetric === "all"
                ? "opacity-100"
                : "opacity-50"
            )}
            onClick={() => handleLegendClick("engagement")}
          >
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
            <span className="text-sm font-medium">Engagement</span>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart
              data={monthlyData}
              margin={{
                top: 10,
                right: 0,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="colorProperties"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="colorEngagement"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                style={{
                  fontSize: "12px",
                  fontFamily: "system-ui",
                  color: "var(--muted-foreground)",
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                style={{
                  fontSize: "12px",
                  fontFamily: "system-ui",
                  color: "var(--muted-foreground)",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  fontFamily: "system-ui",
                  padding: "10px",
                }}
                labelStyle={{
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "var(--foreground)",
                }}
                itemStyle={{
                  padding: "2px 0",
                  fontSize: "12px",
                  color: "var(--foreground)",
                }}
              />
              {shouldShowMetric("properties") && (
                <Area
                  type="monotone"
                  dataKey="properties"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorProperties)"
                  activeDot={{ r: 6 }}
                />
              )}
              {shouldShowMetric("users") && (
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  activeDot={{ r: 6 }}
                />
              )}
              {shouldShowMetric("engagement") && (
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEngagement)"
                  activeDot={{ r: 6 }}
                />
              )}
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
