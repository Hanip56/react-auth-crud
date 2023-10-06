import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { columns } from "./data";
import { useProducts } from "@/hooks/use-products";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";
import CreateProductForm from "@/components/CreateProductForm";

const Product = () => {
  const { user } = useAuth();
  const { products, onInitial } = useProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(
        "https://test.employee.tokoweb.xyz/api/product",
        {
          headers: {
            Authorization: `Bearer ${user!.token}`,
          },
        }
      );

      if ("data" in res && res.data.status) {
        onInitial(res.data.data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full border border-border rounded-md">
      <div className="bg-background space-y-6 p-4">
        {/* header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h3 className="font-semibold text-xl">Product list</h3>
          <div className="w-full sm:w-fit flex flex-col sm:flex-row gap-2">
            {/* create product */}
            <CreateProductForm />
          </div>
        </div>
        <Separator />
        {/* input */}
        <div>
          <DataTable columns={columns} data={products} inputFilter="name" />
        </div>
      </div>
    </div>
  );
};

export default Product;
