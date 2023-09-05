"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { userType } from "../../../types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { getInitials } from "../../../utils/getInitials";
import { Edit2, ImagePlus, Trash } from "lucide-react";
import { Label } from "../../ui/label";
import toast from "react-hot-toast";
import { useDeleteImage, useUploadImage } from "../../../services/image";
import { useEffect, useState } from "react";
import { useUpdateLoggedUser } from "../../../services/user";
import { Icons } from "../../../utils/icons";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  photo: z.string().optional(),
  //   urls: z
  //     .array(
  //       z.object({
  //         value: z.string().url({ message: "Please enter a valid URL." }),
  //       })
  //     )
  //     .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//   bio: "I own a computer.",
//   urls: [
//     { value: "https://shadcn.com" },
//     { value: "http://twitter.com/shadcn" },
//   ],
// };

export function ProfileForm({ initialData }: { initialData: userType }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData || { email: "", name: "", photo: "" },
  });

  //api
  const { mutate: update, isLoading: updateLoader } = useUpdateLoggedUser();

  //images
  const { mutate: uploadImage, isLoading: uploadLoader } = useUploadImage();
  const { mutate: deleteImage, isLoading: deleteLoader } = useDeleteImage();
  const [image, setImage] = useState("");

  const initial = getInitials(initialData?.name!);

  const isLoading = uploadLoader || deleteLoader || updateLoader;

  function onSubmit(data: ProfileFormValues) {
    console.log(data, "formdsta");

    // Object.keys(data).forEach(
    //   (key) => (data as any)[key] === "" && delete (data as any)[key]
    // );
    update(data, {
      onSuccess: (res) => {
        console.log(res, "res");

        toast.success(res?.message);
      },
    });
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  useEffect(() => {
    if (initialData?.photo) {
      setImage(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/img/users/${initialData?.photo}`
      );
      form.setValue("photo", initialData?.photo!);
    } else {
      setImage("");
    }
  }, [form, initialData?.photo]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const file = (e.target as HTMLInputElement).files?.[0];

    const formData = new FormData();
    formData.append("image", file!);
    formData.set("type", "users");

    uploadImage(formData, {
      onSuccess: (res) => {
        toast.success(res.data?.message);
        console.log(res, "res");
        setImage(URL.createObjectURL(file!));
        form.setValue("photo", res?.data?.data);
      },
    });
  };

  const onRemove = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const val = {
      type: "users",
      image: form.getValues("photo")!,
    };
    deleteImage(val, {
      onSuccess: (res) => {
        console.log(res, "res");
        if (res.status === 204) {
          setImage("");
          form.setValue("photo", "");
        }
      },
    });
  };
  console.log(image, "image");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Photo</FormLabel>

              <Avatar className="h-32 w-32">
                {image?.length != 0 ? (
                  <div className="relative rounded-md">
                    <AvatarImage
                      src={image}
                      alt="Profile picture"
                      className="aspect-square object-cover"
                    />
                  </div>
                ) : (
                  <AvatarFallback className="border-slate-300 bg-gray-200">
                    <div className="!text-3xl">{initial}</div>
                  </AvatarFallback>
                )}
              </Avatar>

              <Input
                {...field}
                // value={""}
                value={""}
                placeholder="Product name"
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onChangeHandler}
              />

              {image?.length === 0 ? (
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer border rounded-xl p-2 font-medium outline-neutral-100 flex items-center gap-2 w-[11rem] mt-10"
                >
                  <ImagePlus className="h-6 w-6" />
                  Upload a image
                </Label>
              ) : (
                <Button
                  className="flex gap-2"
                  variant={"destructive"}
                  onClick={onRemove}
                >
                  Delete <Trash className="w-4 h-4" />
                </Button>
              )}

              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>

              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...field} />
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            ""
          )}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
