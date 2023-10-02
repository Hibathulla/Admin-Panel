"use client";

import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { usePostCoupon, useUpdateCoupon } from "../../../services/coupon";
import { couponType } from "../../../types/coupon";
import { getGeocodeAddress } from "../../../lib/geocode";

const formSchema = z.object({
  address: z.string().min(1, "required"),
  name: z.string().min(1, "required"),
});
// .refine((schema) => schema.billboard.length > 1 && !!schema.billboardLabel, {
//   message: "Please",
// });

interface LocationFormProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData?: couponType;
}

export function LocationForm({
  className,
  initialData,
  ...props
}: LocationFormProps) {
  //api
  const {
    mutate: create,
    isLoading: createLoading,
    isError: createIsError,
    error: createError,
  } = usePostCoupon();
  const {
    mutate: update,
    isLoading: updateLoading,
    isError: updateIsError,
    error: updateError,
  } = useUpdateCoupon();

  const router = useRouter();
  const queryClient = useQueryClient();

  const err: any = ((createError || updateError) as any)?.response?.data!;
  const isLoading = createLoading || updateLoading;
  const isError = createIsError || updateIsError;
  const errMessage = err?.message;

  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // mutate(values);
    // if (initialData) {
    //   update(
    //     {
    //       ...values,
    //       id: initialData?._id,
    //     },
    //     {
    //       onSuccess: (res) => {
    //         toast.success(res.data?.message);
    //       },
    //     }
    //   );
    // }
    //   create(values, {
    //     onSuccess: async (res) => {
    //       await queryClient.invalidateQueries(["coupon"]);
    //       toast.success(res.data?.message);
    //       router.replace("/coupons");
    //     },
    //   });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" type="text" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      //   const { err, loc } = getGeocodeAddress(e.target.value);
                      if (e.target.value === "help") {
                        return form.setError("address", {
                          message: "cannot write help",
                        });
                      }
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormDescription>Please select a address.</FormDescription>
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
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              ""
            )}
            {action}
          </Button>
        </form>
      </Form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full" />
        </div>
      </div> */}

      {/* <Button onClick={() => setImage(true)}>open dialog</Button> */}
    </div>
  );
}
