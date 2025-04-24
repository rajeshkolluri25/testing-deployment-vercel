"use client";
import { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import "../index.css";
import { useLazyGetReportedPropertiesListQuery } from "../redux/property";
import CustomPagination from "../components/ui/CustomPagination";
import { getHeaders } from "../redux/configuration/headers";
// import CustomPagination from ;

// Sample reported properties data
const reportedProperties = [
  {
    id: "1",
    property: {
      name: "Fake Luxury Villa",
      image: "",
      address: "123 Nonexistent St, Faketown",
    },
    reportedBy: {
      name: "John Doe",
      image: "",
    },
    reason: "Fake Listing",
    details:
      "This property doesn't exist. I visited the address and found nothing there.",
    status: "pending",
    dateReported: "Apr 15, 2023",
  },
  {
    id: "2",
    property: {
      name: "Misleading Apartment",
      image: "",
      address: "456 Mislead Ave, Wrongcity",
    },
    reportedBy: {
      name: "Emily Wilson",
      image: "",
    },
    reason: "Misleading Information",
    details:
      "Photos do not match the actual property. Much smaller than advertised.",
    status: "investigating",
    dateReported: "Apr 12, 2023",
  },
  {
    id: "3",
    property: {
      name: "Scam Office Space",
      image: "",
      address: "789 Scam Blvd, Fraudville",
    },
    reportedBy: {
      name: "Michael Brown",
      image: "",
    },
    reason: "Scam",
    details:
      "Agent asked for a cash deposit to 'hold' the property without providing any documentation.",
    status: "resolved",
    dateReported: "Apr 8, 2023",
  },
  {
    id: "4",
    property: {
      name: "Incorrect Details Home",
      image: "",
      address: "321 Wrong Info St, Errortown",
    },
    reportedBy: {
      name: "Sarah Johnson",
      image: "",
    },
    reason: "Incorrect Details",
    details:
      "Square footage is incorrect. Also listed as having 3 bathrooms but only has 2.",
    status: "dismissed",
    dateReported: "Apr 5, 2023",
  },
  {
    id: "5",
    property: {
      name: "Already Sold Property",
      image: "",
      address: "654 Sold St, Outdatedville",
    },
    reportedBy: {
      name: "Robert Garcia",
      image: "",
    },
    reason: "Already Sold",
    details:
      "This property was sold months ago but is still listed as available.",
    status: "pending",
    dateReported: "Apr 2, 2023",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      );
    case "investigating":
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Investigating
        </Badge>
      );
    case "resolved":
      return (
        <Badge
          variant="default"
          className="flex items-center gap-1 bg-emerald-500"
        >
          <CheckCircle className="h-3 w-3" />
          Resolved
        </Badge>
      );
    case "dismissed":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Dismissed
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Reports = () => {
  const [open, setOpen] = useState(false);
  const [view, setViewOpen] = useState(false);
  const [getReportedPropertiesList] = useLazyGetReportedPropertiesListQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [reportedProperitiesList, setReportedProperitiesList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("headers", getHeaders())

  const fetchReportedProperties = useCallback((customFilters) => {
    setIsLoading(true);

    getReportedPropertiesList(customFilters)
      .then((response) => {
        setReportedProperitiesList(response?.data?.data);
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
  },[getReportedPropertiesList]);
  useEffect(() => {
    const offset = (currentPage - 1) * 9;

    const customFilters = {
      limit: 9,
      offset,
      sortBy: "createdAt",
      sortOrder: -1,
    };

    fetchReportedProperties(customFilters);
  }, [currentPage,fetchReportedProperties]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="space-y-8 py-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Reported Properties
        </h1>
        <p className="text-muted-foreground mt-1">
          Review and manage properties reported by users.
        </p>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Property Reports</CardTitle>
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8 w-full"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date Reported</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportedProperties.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className=" w-[40px] h-[40px] bg-muted rounded-full flex items-center justify-center text-xs font-medium">
                          {report.property.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {report.property.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {report.property.address}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={report.reportedBy.image}
                            alt={report.reportedBy.name}
                          />
                          <AvatarFallback>
                            {report.reportedBy.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {report.reportedBy.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{report.reason}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {report.details}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{report.dateReported}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewOpen(true)}
                        >
                          View
                        </Button>
                        {report.status === "pending" && (
                          <Button size="sm" onClick={() => setOpen(true)}>
                            Take Action
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <CustomPagination
                totalRecords={totalRecords}
                pageSize={9}
                initialPage={1}
                onPageChange={handlePageChange}
              />
            </Table>
            {/* Dialog outside of the DropdownMenu */}
            <Dialog.Root open={view} onOpenChange={setViewOpen}>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg w-1/3">
                  <Dialog.Title className="text-lg font-bold">
                    View
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-gray-500 mt-3 mb-6">
                    You want to delete this property
                  </Dialog.Description>
                  <div className="flex gap-2 mt-4 justify-end">
                    <Dialog.Close asChild>
                      <Button className="px-4 py-2 bg-gray-200 rounded-md font-medium text-black hover:bg-gray-200">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Button
                      onClick={() => {
                        console.log("Action performed");
                        setOpen(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md font-medium"
                    >
                      Confirm
                    </Button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            {/* Dialog outside of the DropdownMenu */}
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg w-1/3">
                  <Dialog.Title className="text-lg font-bold">
                    Are You Sure?
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-gray-500 mt-3 mb-6">
                    You want to delete this property
                  </Dialog.Description>
                  <div className="flex gap-2 mt-4 justify-end">
                    <Dialog.Close asChild>
                      <Button className="px-4 py-2 bg-gray-200 rounded-md font-medium text-black hover:bg-gray-200">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Button
                      onClick={() => {
                        console.log("Action performed");
                        setOpen(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md font-medium"
                    >
                      Confirm
                    </Button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
