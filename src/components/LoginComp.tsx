import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { ErrorType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginComp = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { onSet } = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    if (error) {
      setError("");
    }
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://test.employee.tokoweb.xyz/api/login",
        values
      );

      if ("data" in res && res.data) {
        // this condition is because the api still error even tho the status 200
        if (!res.data.status) throw new Error(res.data.message);

        onSet(res.data.data);
      }
    } catch (error) {
      console.log((error as ErrorType).message);
      setError((error as ErrorType).message);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-xl font-bold">LOGIN</CardTitle>
            <CardDescription>Login to enter application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {error && (
              <div className="bg-destructive/20 p-2 px-4 rounded-md">
                <p className="text-sm text-red-500 font-semibold">{error}</p>
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginComp;
