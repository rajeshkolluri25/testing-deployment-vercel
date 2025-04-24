"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Table } from "../ui/table";
import { cn } from "../../lib/utils";
import { PropertyFilters } from "./property/PropertyFilters";
import { PropertyTableHeader, SortField } from "./property/PropertyTableHeader";
import { PropertyTableBody } from "./property/PropertyTableBody";
import { sampleProperties } from "../../data/sampleProperties";
import { useLazyGetPropertiesQuery } from "../../redux/property/index";
import CustomPagination from "../ui/CustomPagination";

export const PropertyTable = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [properitiesList, setProperitiesList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [getProperties] = useLazyGetPropertiesQuery();
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchProperties = useCallback((customFilters) => {
    setIsLoading(true);

    getProperties(customFilters)
      .then((response) => {
        setProperitiesList(response?.data?.data);
        const totalRecords = parseInt(response?.data?.totalCountOfRecords);
        setTotalRecords(totalRecords);
        const totalPages = Math.ceil(totalRecords / 9);
        setPageCount(totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching properties:", error);
        setIsLoading(false);
      });
  }, [getProperties]);
  useEffect(() => {
    const offset = (currentPage - 1) * 9;

    const customFilters = {
      limit: 9,
      offset,
      sortBy: "createdAt",
      sortOrder: -1,
    };

    if (statusFilter !== "all") {
      customFilters.status = statusFilter;
    }
    if (propertyTypeFilter !== "all") {
      customFilters.propertyType = encodeURIComponent(propertyTypeFilter);
    }
    // Uncomment if using searchTerm
    if (searchTerm.trim()) {
      customFilters.keyword = encodeURIComponent(searchTerm);
    }

    fetchProperties(customFilters);
  }, [statusFilter, propertyTypeFilter, searchTerm, currentPage,fetchProperties]);

  console.log("properitiesList", properitiesList);
  console.log("totalRecords", totalRecords);


  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  // Count properties by status
  const statusCounts = sampleProperties.reduce((acc, property) => {
    acc[property.status] = (acc[property.status] || 0) + 1;
    return acc;
  }, {});

  // Get unique categories
  // const categories = Array.from(
  //   new Set(sampleProperties.map((p) => p.category))
  // );

  return (
    <div className={cn("space-y-4", className)}>
      <PropertyFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        propertyTypeFilter={propertyTypeFilter}
        setPropertyTypeFilter={setPropertyTypeFilter}
        statusCounts={statusCounts}
        // categories={categories}
      />

      <div className="rounded-md border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <PropertyTableHeader
              sortBy={sortBy}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
            <PropertyTableBody
              properties={properitiesList}
              isLoading={isLoading}
            />
          </Table>
          <CustomPagination
            totalRecords={totalRecords}
            pageSize={9}
            initialPage={1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};