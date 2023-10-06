import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { ErrorType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { useProducts } from "@/hooks/use-products";

const createProductSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  price: z.string().min(1, {
    message: "Price is required",
  }),
});

const CreateProductForm = () => {
  const { user } = useAuth();
  const { onAdd } = useProducts();
  const [isLoading, setIsLoading] = useState(false);

  const closeRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: "0",
    },
  });

  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://test.employee.tokoweb.xyz/api/product/store",
        values,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if ("data" in res && res.data) {
        // this condition is because the api still error even tho the status 200
        if (!res.data.status) throw new Error(res.data.message);

        onAdd(res.data.data);
        toast.success("Product created");
      }
    } catch (error) {
      console.log((error as ErrorType).message);
      toast.error((error as ErrorType).message);
    }
    setIsLoading(false);
    closeRef.current?.click();
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
    }
  };

  return (
    <Dialog onOpenChange={handleDialogChange}>
      <DialogTrigger className="w-full" asChild>
        <Button
          disabled={isLoading}
          type="button"
          className="w-full sm:w-fit"
          variant="green"
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>Create Product</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 px-2 max-h-[26rem] overflow-y-auto">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter price"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button ref={closeRef} type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit" variant="green">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductForm;
