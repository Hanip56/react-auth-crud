import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "@/pages/Product/data";
import axios from "axios";
import { useAuth } from "@/hooks/use-auth";

const SeeDetail = ({ id }: { id: number }) => {
  const { user } = useAuth();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://test.employee.tokoweb.xyz/api/product/show?product_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${user!.token}`,
        },
      }
    );

    if ("data" in res && res.data.status) {
      setProduct(res.data.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (product) return;
    getProduct();
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setProduct(undefined);
    } else {
      getProduct();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Product</DialogTitle>
        </DialogHeader>
        <div className="w-full py-6 text-lg">
          {isLoading && <p>Loading...</p>}
          {product &&
            !isLoading &&
            Object.entries(product).map(([key, value]) => (
              <div
                key={key}
                className="w-full flex items-center justify-between gap-2"
              >
                <div className="basis-[30%] flex justify-between">
                  <span>{key}</span>
                  <span>:</span>
                </div>
                <div className="flex-1">
                  {typeof value === "string" || typeof value === "number"
                    ? value
                    : "null"}
                </div>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SeeDetail;
