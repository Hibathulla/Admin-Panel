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
import { categoryType } from "../../../types/category";
import ImageUpload from "../../common/ImageUpload";
import { ImagePlus, Trash } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { usePostCategory, useUpdateCategory } from "../../../services/category";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { routes } from "../../../services/routes";
import { useRouter } from "next/navigation";
import { useDeleteImage, useUploadImage } from "../../../services/image";

const formSchema = z.object({
  category: z.string().min(1, "Please enter a store name"),
  billboard: z.string().optional(),
  billboardLabel: z.string(),
});
// .refine((schema) => schema.billboard.length > 1 && !!schema.billboardLabel, {
//   message: "Please",
// });

interface CategoryFormProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData?: categoryType;
}

export function CategoryForm({
  className,
  initialData,
  ...props
}: CategoryFormProps) {
  //api
  const {
    mutate: create,
    isLoading: createLoading,
    isError: createIsError,
    error: createError,
  } = usePostCategory();
  const {
    mutate: update,
    isLoading: updateLoading,
    isError: updateIsError,
    error: updateError,
  } = useUpdateCategory();
  const { mutate: uploadImage, isLoading: uploadLoader } = useUploadImage();
  const { mutate: deleteImage, isLoading: deleteLoader } = useDeleteImage();
  const [image, setImage] = React.useState("");

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
      category: initialData?.category,
      // billboard: initialData?.billboard,
      billboardLabel: initialData?.billboardLabel,
    } || {
      category: "",
      billboard: "",
      billboardLabel: "",
    },
  });

  React.useEffect(() => {
    if (initialData?.billboard) {
      setImage(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/img/category/${initialData?.billboard}`
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
    formData.set("type", "category");

    uploadImage(formData, {
      onSuccess: (res) => {
        toast.success(res.data?.message);
        console.log(res, "res");
        setImage(URL.createObjectURL(file!));
        form.setValue("billboard", res?.data?.data);
        // field.onChange(res?.data?.data);
      },
    });
  };

  const onRemove = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const val = {
      type: "category",
      image: form.getValues("billboard")!,
    };
    deleteImage(val, {
      onSuccess: (res) => {
        console.log(res, "res");
        if (res.status === 204) {
          setImage("");
          form.setValue("billboard", "");
          return;
        }
      },
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // mutate(values);
    console.log(values, "val");
    if (initialData) {
      console.log(values?.billboard?.length, "billboard");

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
          await queryClient.invalidateQueries(["category"]);
          toast.success(res.data?.message);
          router.replace("/category");
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
                    type="category"
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" type="text" {...field} />
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
