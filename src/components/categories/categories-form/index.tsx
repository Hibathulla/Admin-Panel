"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@utils/icons";
import { cn } from "@utils/utils";
import * as React from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useLogin } from "@services/login-api";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { AxiosError } from "axios";
import AlertModal from "@components/common/AlertModal";

const formSchema = z.object({
  storeName: z.string().min(1, "Please enter a store name"),
});

interface CategoryFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CategoryForm({ className, ...props }: CategoryFormProps) {
  const { mutate, isLoading, isError, error } = useLogin();
  const [open, setOpen] = React.useState(false);
  const err: any = (error as any)?.response?.data!;
  const errMessage = err?.message;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
    },
  });

  console.log(isError, error, "login");

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // mutate(values);
    console.log(values);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name</FormLabel>
                <FormControl>
                  <Input placeholder="" type="email" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          {isError && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errMessage}</AlertDescription>
            </Alert>
          )}
          <Button type="submit">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              ""
            )}
            Submit
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full" />
        </div>
      </div>

      {/* <Button onClick={() => setOpen(true)}>open dialog</Button> */}
    </div>
  );
}
