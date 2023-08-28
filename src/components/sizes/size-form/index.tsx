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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDeleteImage, useUploadImage } from "../../../services/image";
import { usePostSize, useUpdateSize } from "../../../services/size";
import { SizeType } from "../../../types/size";
import ImageUpload from "../../common/ImageUpload";

const formSchema = z.object({
  name: z.string().min(1, "Please enter a size name"),
  value: z.string().min(1, "Please enter a size value"),
});
// .refine((schema) => schema.billboard.length > 1 && !!schema.billboardLabel, {
//   message: "Please",
// });

interface SizeFormProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData?: SizeType;
}

export function SizeForm({ className, initialData, ...props }: SizeFormProps) {
  //api
  const {
    mutate: create,
    isLoading: createLoading,
    isError: createIsError,
    error: createError,
  } = usePostSize();
  const {
    mutate: update,
    isLoading: updateLoading,
    isError: updateIsError,
    error: updateError,
  } = useUpdateSize();

  console.log(initialData, "data");

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
      name: initialData?.name,
      // billboard: initialData?.billboard,
      value: initialData?.value,
    } || {
      name: "",
      value: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // mutate(values);
    console.log(values, "val");
    if (initialData) {
      update(
        {
          ...values,
          id: initialData?.id,
        },
        {
          onSuccess: (res) => {
            toast.success(res.data?.message);
          },
        }
      );
    } else {
      create(values, {
        onSuccess: async (res) => {
          await queryClient.invalidateQueries(["size"]);
          toast.success(res.data?.message);
          router.replace("/size");
        },
      });
    }
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
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Size name" type="text" {...field} />
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
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard Label</FormLabel>
                <FormControl>
                  <Input placeholder="Size value" type="text" {...field} />
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
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full" />
        </div>
      </div>

      {/* <Button onClick={() => setImage(true)}>open dialog</Button> */}
    </div>
  );
}
