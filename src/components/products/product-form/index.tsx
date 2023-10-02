"use client";

import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

import { Checkbox } from "@components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@utils/icons";
import { cn } from "@utils/utils";
import { useTheme } from "next-themes";
import * as React from "react";

import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useGetCategory } from "../../../services/category";
import { usePostProduct, useUpdateProduct } from "../../../services/product";
import { useGetSize } from "../../../services/size";
import { productType } from "../../../types/product";
import { Textarea } from "../../ui/textarea";
import toast from "react-hot-toast";
import ImageUpload from "../../common/ImageUpload";
import MultiImagesUpload from "../../common/MultiImagesUpload";
import { Category } from "../../../types/category";
import {
  useDeleteImage,
  useMultiUploadImage,
  useUploadImage,
} from "../../../services/image";

const formSchema = z.object({
  name: z.string().min(1, "Please enter a product name"),
  price: z.coerce.number({
    required_error: "Please enter a price for product",
  }),
  discountPrice: z.coerce.number().optional(),
  description: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  size: z
    .object({ id: z.string().min(1) })
    .array()
    .min(1, { message: "Please select atleast 1 size" }),
  isFeatured: z.boolean().optional(),
  outOfStock: z.boolean().optional(),
  images: z.string().array().optional(),
});

interface ProductsFormProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData?: productType;
}

// const colourStyles = {
//   control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     const color = chroma(data.color);
//     return {
//       ...styles,
//       backgroundColor: isDisabled ? 'red' : blue,
//       color: '#FFF',
//       cursor: isDisabled ? 'not-allowed' : 'default',

//     };
//   },

// };

export function ProductsForm({
  className,
  initialData,
  ...props
}: ProductsFormProps) {
  const { theme } = useTheme();
  //get category
  const { data: categoryList } = useGetCategory();
  // (data, "data");

  //get suzes
  const { data: sizeList } = useGetSize();

  const {
    mutate: create,
    isLoading: createLoading,
    isError: createIsError,
    error: createError,
  } = usePostProduct();
  const {
    mutate: update,
    isLoading: updateLoading,
    isError: updateIsError,
    error: updateError,
  } = useUpdateProduct();

  //images
  const { mutate: uploadImage, isLoading: uploadLoader } =
    useMultiUploadImage();
  const { mutate: deleteImage, isLoading: deleteLoader } = useDeleteImage();
  const [images, setImages] = React.useState<string[]>([]);

  const router = useRouter();
  const queryClient = useQueryClient();

  const err: any = ((createError || updateError) as any)?.response?.data!;
  const isLoading = createLoading || updateLoading;
  const isError = createIsError || updateIsError;
  const errMessage = err?.message;

  const action = initialData ? "Save changes" : "Create";

  //default
  const currentCategory = categoryList?.category?.find(
    (el) => el.category === initialData?.category
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          category: initialData?.category,
          size: initialData?.size,
        }
      : {
          name: "",
          price: undefined,
          discountPrice: undefined,
          description: "",
          category: "",
          size: [],
          isFeatured: false,
          outOfStock: false,
          images: [],
        },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    Object.keys(values).forEach(
      (key) => (values as any)[key] === "" && delete (values as any)[key]
    );
    const sizeIds = values?.size?.map((size) => {
      return size?.id;
    });

    if (initialData) {
      update(
        {
          ...values,
          id: initialData?.id,
          size: sizeIds,
          price: values?.price,
          category: values?.category,
        },
        {
          onSuccess: (res) => {
            toast.success(res?.data?.message);
            // router.replace("/products");
          },
        }
      );
    } else {
      create(
        {
          ...values,
          size: sizeIds,
          price: values?.price,
        },
        {
          onSuccess: (res) => {
            toast.success(res?.data?.message);
            router.replace("/products");
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
    if (initialData?.images?.length != 0) {
      let array: string[] = [];
      initialData?.images?.map((image) => {
        array.push(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/img/products/${image}`
        );
      });
      setImages(array);
      form.setValue("images", initialData?.images!);
    } else {
      setImages([]);
    }
  }, [form, initialData?.images]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fileList: FileList = (e.target as HTMLInputElement)?.files!;

    //preview
    let selectedFiles: string[] = [];
    const newFileList = [...(fileList as any)];

    const formData = new FormData();

    for (let index = 0; index < fileList!.length; index++) {
      const file = fileList?.[index];
      formData.append("image", file!);
    }

    // formData.append("images", file!);
    formData.set("type", "products");

    uploadImage(formData, {
      onSuccess: (res) => {
        toast.success(res.data?.message);

        newFileList.map((file: File) => {
          return selectedFiles.push(URL.createObjectURL(file));
        });
        setImages(selectedFiles as string[]);

        form.setValue("images", [...res?.data?.data]);
        // field.onChange(res?.data?.data);
      },
    });
  };

  const onRemove = (e: React.SyntheticEvent, index: number) => {
    e.preventDefault();
    const uploadedImages = form.getValues("images");
    const deleteImaged = uploadedImages?.[index];

    const newPreviewImages = images?.filter((val, ind) => ind != index);
    const newValImages = uploadedImages?.filter(
      (val, ind) => val != deleteImaged
    );

    const val = {
      type: "products",
      image: deleteImaged!,
    };
    deleteImage(val, {
      onSuccess: (res) => {
        if (res.status === 204) {
          setImages(newPreviewImages);
          form.setValue("images", newValImages);
          return;
        }
      },
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <MultiImagesUpload
                      field={field}
                      onChange={onChangeHandler}
                      loading={uploadLoader || deleteLoader}
                      images={images}
                      setImages={setImages}
                      type="product"
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
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name*</FormLabel>
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product price*</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="number" {...field} />
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
              name="discountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>discount</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="number" {...field} />
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" rows={2} {...field} />
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
                <FormItem className="flex flex-col">
                  <FormLabel>Select product category*</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger
                      // className="w-[220px]"
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectLabel>Fruits</SelectLabel> */}
                        {categoryList?.category?.map((category: Category) => {
                          return (
                            <SelectItem
                              key={category?.id}
                              value={category?.slug?.toString()}
                              className="cursor-pointer"
                            >
                              {category?.category}
                            </SelectItem>
                          );
                        })}

                        {/* <SelectItem value={"flat"}>{"Flat"}</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Please select a category type.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {sizeList && (
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => {
                  field.value, "value";

                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Select sizes*</FormLabel>
                      <FormControl>
                        <ReactSelect
                          isMulti={true}
                          options={sizeList?.size}
                          value={field.value}
                          onChange={field.onChange}
                          className="!bg-black text-black"
                          getOptionValue={(val: any) => val?.id}
                          getOptionLabel={(val: any) => val?.name}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor:
                                theme === "light" ? "#FFFFDD" : "#222222",
                              background:
                                theme === "light" ? "#F4F4FF" : "black",
                            }),
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Please select a category type.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on home page in featured section.
                      {/* <Link href="/examples/forms">mobile settings</Link> page. */}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="outOfStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Out of stock</FormLabel>
                    <FormDescription>
                      This product will mark as out of stock and will not
                      display anywhere in shop.
                      {/* <Link href="/examples/forms">mobile settings</Link> page. */}
                    </FormDescription>
                  </div>
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
          </div>
          <Button type="submit" disabled={isLoading}>
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
