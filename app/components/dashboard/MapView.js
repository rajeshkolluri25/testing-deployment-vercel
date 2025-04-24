
"use client"
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";



// Sample data for major US real estate markets
const locationData = [
  { id: "nyc", name: "New York", value: 256, coordinates: [40.7128, -74.0060], color: "#3B82F6" },
  { id: "la", name: "Los Angeles", value: 198, coordinates: [34.0522, -118.2437], color: "#8B5CF6" },
  { id: "chi", name: "Chicago", value: 142, coordinates: [41.8781, -87.6298], color: "#10B981" },
  { id: "mia", name: "Miami", value: 173, coordinates: [25.7617, -80.1918], color: "#F59E0B" },
  { id: "sf", name: "San Francisco", value: 187, coordinates: [37.7749, -122.4194], color: "#EF4444" },
  { id: "hou", name: "Houston", value: 125, coordinates: [29.7604, -95.3698], color: "#06B6D4" },
];



export const MapView = ({ className }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Property Distribution</CardTitle>
        <CardDescription>Geographical distribution of listed properties</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] w-full rounded-md bg-neutral-50 dark:bg-neutral-900">
          {/* This is a mockup map - in a real application, we would implement something
              like Google Maps, Mapbox, or react-simple-maps here */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="relative w-full h-full overflow-hidden">
              {/* Simple background image for the map */}
              <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-[url('https://i.imgur.com/jzn3QxI.png')] bg-no-repeat bg-center bg-contain"></div>
              
              {/* Plot markers on the map */}
              {locationData.map((location) => (
                <div 
                  key={location.id}
                  className={cn(
                    "absolute transform -translate-x-1/2 -translate-y-1/2",
                    "cursor-pointer",
                    "transition-all duration-300 ease-in-out",
                    selectedLocation?.id === location.id ? "z-10 scale-125" : "hover:scale-110"
                  )}
                  style={{
                    left: `${((location.coordinates[1] + 125) / 250) * 100}%`,
                    top: `${((location.coordinates[0] - 25) / -50) * 100}%`,
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div 
                    className={cn(
                      "relative w-4 h-4 rounded-full animate-float",
                      selectedLocation?.id === location.id ? "shadow-glow" : ""
                    )}
                    style={{ backgroundColor: location.color }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full opacity-50 animate-ping"
                      style={{ backgroundColor: location.color, animationDuration: '1.5s' }}
                    ></div>
                  </div>
                  
                  {/* Label for the location */}
                  <div 
                    className={cn(
                      "absolute top-5 left-0 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-sm",
                      "text-xs font-medium text-center",
                      "border border-gray-100 dark:border-gray-700",
                      "opacity-0 transition-opacity duration-300 pointer-events-none",
                      (selectedLocation?.id === location.id) && "opacity-100"
                    )}
                  >
                    <p>{location.name}</p>
                    <p><span style={{ color: location.color }}>{location.value}</span> properties</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-xs font-medium mb-2">Top Markets</p>
            <div className="space-y-1">
              {locationData.slice(0, 3).map((location) => (
                <div key={location.id} className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: location.color }}
                  ></div>
                  <span className="text-xs">{location.name}: {location.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
