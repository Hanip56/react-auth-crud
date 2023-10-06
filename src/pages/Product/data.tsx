import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { ProductActions } from "./product-actions";

type Editable = {
  key: string;
  label: string;
  selections?: string[];
};

// for edit dialog
export const editable: Editable[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "price",
    label: "Price",
  },
];

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string | null;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  [key: string]: any;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="flex justify-end items-center">
        <DataTableColumnHeader column={column} title="ID" />
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAME" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md overflow-hidden">
          {row.original.image_url ? (
            <img
              src={row.original.image_url}
              alt={row.getValue("name")}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-slate-400" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold">{row.getValue("name")}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PRICE" />
    ),
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CREATED AT" />
    ),
    cell: ({ row }) => {
      let publishTime = new Date(row.getValue("created_at"));
      publishTime = new Date(
        publishTime.getTime() + publishTime.getTimezoneOffset() * 60000
      );
      return (
        <div>{`${publishTime.getDate()}-${
          publishTime.getMonth() + 1
        }-${publishTime.getFullYear()}`}</div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UPDATED AT" />
    ),
    cell: ({ row }) => {
      let publishTime = new Date(row.getValue("updated_at"));
      publishTime = new Date(
        publishTime.getTime() + publishTime.getTimezoneOffset() * 60000
      );
      return (
        <div>{`${publishTime.getDate()}-${
          publishTime.getMonth() + 1
        }-${publishTime.getFullYear()}`}</div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ProductActions row={row} />,
  },
];
