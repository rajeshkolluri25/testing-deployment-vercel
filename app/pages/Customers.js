
import React from "react";
import { Button } from "../components/ui/button"; 
import { Input } from "../components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Search, Filter } from "lucide-react";
import "../index.css";

// Sample customer data
const customers = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john.doe@example.com", 
    phone: "+1 (555) 123-4567", 
    signupDate: "Jan 15, 2023",
    status: "active",
    savedProperties: 5
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane.smith@example.com", 
    phone: "+1 (555) 987-6543", 
    signupDate: "Feb 3, 2023",
    status: "active",
    savedProperties: 12
  },
  { 
    id: "3", 
    name: "Robert Johnson", 
    email: "robert.j@example.com", 
    phone: "+1 (555) 456-7890", 
    signupDate: "Mar 22, 2023",
    status: "inactive",
    savedProperties: 0
  },
  { 
    id: "4", 
    name: "Emily Wilson", 
    email: "emily.w@example.com", 
    phone: "+1 (555) 234-5678", 
    signupDate: "Apr 8, 2023",
    status: "active",
    savedProperties: 3
  },
  { 
    id: "5", 
    name: "Michael Brown", 
    email: "michael.b@example.com", 
    phone: "+1 (555) 876-5432", 
    signupDate: "May 19, 2023",
    status: "active",
    savedProperties: 7
  }
];

const Customers = () => {
  return (
    <div className="space-y-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor customer accounts.</p>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-6">
          <div className="relative w-full sm:w-auto flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8 w-full sm:w-[300px]"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Filters
          </Button>
        </div>
        
        <div className="border-t overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Signup Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Saved Properties</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.signupDate}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.savedProperties}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
