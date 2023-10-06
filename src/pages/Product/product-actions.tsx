import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Product } from "@/pages/Product/data";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { useProducts } from "@/hooks/use-products";
import { useAuth } from "@/hooks/use-auth";
import toast from "react-hot-toast";
import UpdateProductForm from "@/components/UpdateProductForm";
import SeeDetail from "@/components/SeeDetail";

interface DataTableViewActionsProps<TData> {
  row: Row<TData>;
}

export function ProductActions<TData>({
  row,
}: DataTableViewActionsProps<TData>) {
  const OriginalRow = row.original as Product;
  const { onDelete } = useProducts();
  const { user } = useAuth();

  const handleDelete = async () => {
    const res = await axios.delete(
      `https://test.employee.tokoweb.xyz/api/product/${OriginalRow.id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if ("data" in res && res.data.status) {
      onDelete(OriginalRow.id);
      toast.success("Produt deleted");
    }
  };

  return (
    <div className="flex items-center gap-1">
      <SeeDetail id={OriginalRow.id} />
      <AlertDialog>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DialogTrigger className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <AlertDialogTrigger className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <UpdateProductForm
              id={OriginalRow.id}
              name={OriginalRow.name}
              price={OriginalRow.price.toString()}
            />
          </DialogContent>
        </Dialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/80 dark:text-white"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
