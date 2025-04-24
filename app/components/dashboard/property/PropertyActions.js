
"use client"
import { useState } from 'react';
import { Button } from '../../ui/button'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Check, X, MoreVertical, Pencil, Trash2 } from "lucide-react";
import * as Dialog from '@radix-ui/react-dialog';



export const PropertyActions = ({ property }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-end gap-2">
      {property.status === "pending" && (
        <>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50">
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
            <X className="h-4 w-4" />
          </Button>
        </>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 flex items-center justify-center">
            <MoreVertical className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <Pencil className="h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex gap-2 cursor-pointer text-red-600"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog outside of the DropdownMenu */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg w-1/3">
            <Dialog.Title className="text-lg font-bold">Are You Sure?</Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mt-3 mb-6">
              You want to delete this property
            </Dialog.Description>
            <div className="flex gap-2 mt-4 justify-end">
            <Dialog.Close asChild>
                <Button className="px-4 py-2 bg-gray-200 rounded-md font-medium text-black hover:bg-gray-200">Cancel</Button>
              </Dialog.Close>
              <Button
                onClick={() => {
                  console.log('Action performed');
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
  );
};
