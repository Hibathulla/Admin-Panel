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
import { useDeleteImage, useUploadImage } from "../../services/image";
import { useUpdateSettings } from "../../services/settings";
import ImageUpload from "../common/ImageUpload";

const formSchema = z.object({
  storeName: z.string().min(1, "Please enter a store name"),
  billboard: z.string().optional(),
  billboardLabel: z.string().optional(),
});

interface SettingsFormProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData: any;
}

export function SettingsForm({
  className,
  initialData,
  ...props
}: SettingsFormProps) {
  //states
  const router = useRouter();
  const queryClient = useQueryClient();
  //api

  const {
    mutate: update,
    isLoading: updateLoading,
    isError: updateIsError,
    error: updateError,
  } = useUpdateSettings(initialData?.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          storeName: "",
          billboard: "",
          billboardLabel: "",
        },
  });

  //images
  const { mutate: uploadImage, isLoading: uploadLoader } = useUploadImage();
  const { mutate: deleteImage, isLoading: deleteLoader } = useDeleteImage();
  const [image, setImage] = React.useState("");

  //datas
  const err: any = (updateError as any)?.response?.data!;
  const isLoading = updateLoading;
  const isError = updateIsError;
  const errMessage = err?.message;

  const action = initialData ? "Save changes" : "Create";

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (initialData) {
      update(
        { ...values, id: initialData?.id },
        {
          onSuccess: (res) => {
            toast.success(res?.data?.message);
          },
        }
      );
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // mutate(values);
    values;
  }

  React.useEffect(() => {
    if (initialData?.billboard) {
      setImage(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/img/settings/${initialData?.billboard}`
      );
      form.setValue("billboard", initialData?.billboard!);
    } else {
      setImage("");
    }
  }, [form, initialData?.billboard]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const file = (e.target as HTMLInputElement).files?.[0];

    const formData = new FormData();
    formData.append("image", file!);
    formData.set("type", "settings");

    uploadImage(formData, {
      onSuccess: (res) => {
        toast.success(res.data?.message);

        setImage(URL.createObjectURL(file!));
        form.setValue("billboard", res?.data?.data);
        // field.onChange(res?.data?.data);
      },
    });
  };

  const onRemove = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const val = {
      type: "settings",
      image: form.getValues("billboard")!,
    };
    deleteImage(val, {
      onSuccess: (res) => {
        if (res.status === 204) {
          setImage("");
          form.setValue("billboard", "");
          return;
        }
      },
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="billboard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    field={field}
                    onChange={onChangeHandler}
                    loading={uploadLoader || deleteLoader}
                    image={image}
                    setImage={setImage}
                    type="settings"
                    onRemove={onRemove}
                  />
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
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
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
            name="billboardLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard Label</FormLabel>
                <FormControl>
                  <Input placeholder="Billboard label" type="text" {...field} />
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
            {action}
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
