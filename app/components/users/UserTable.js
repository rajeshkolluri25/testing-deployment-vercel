"use client"
import { useState } from 'react';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import * as Dialog from '@radix-ui/react-dialog';





export const UserTable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5); // Default limit

  const totalPages = Math.ceil(users.length / limit);

  // Get paginated users based on currentPage and limit
  const paginatedUsers = users.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );
  const [open, setOpen] = useState(false);
  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
  };

  const handleDelete = (userId) => {
    console.log("Delete user:", userId);
    setOpen(true);
  };

  

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Listed Properties</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {user.type === 'seller' ? `Seller (${user.role})` : 'Customer'}
                  </Badge>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  {user.type === 'seller' ? (user.listedProperties || 0) : '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={user.verified ? "default" : "secondary"}>
                    {user.verified ? 'Verified' : 'Pending'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(user.id)} className=' cursor-pointer'>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-red-600 cursor-pointer">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         {/* Dialog outside of the DropdownMenu */}
         <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg w-1/3">
                    <Dialog.Title className="text-lg font-bold">Are You Sure?</Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-500 mt-3 mb-6">
                      You want to delete this user
                    </Dialog.Description>
                    <div className="flex gap-2 mt-4 justify-end">
                    <Dialog.Close asChild>
                        <Button className="px-4 py-2 bg-gray-200 rounded-md font-medium text-black hover:bg-gray-200">Cancel</Button>
                      </Dialog.Close>
                      <Button
                        
                        className="px-4 py-2 bg-red-600 text-white rounded-md font-medium"
                      >
                        Confirm
                      </Button>
                      
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
      </div>

      {/* Pagination and Limit */}
      <div className="flex items-center justify-between py-4">
        {/* Limit Dropdown */}
        <div className="flex items-center gap-2">
          <span>Show:</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
            }}
            className="border rounded-md px-2 py-1"
          >
            {[5, 10, 15, 20].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span>users per page</span>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
