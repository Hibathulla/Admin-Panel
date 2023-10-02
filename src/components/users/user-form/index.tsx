"use client";

import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUpdateUser } from "../../../services/user";
import { userType } from "../../../types/user";
import { Icons } from "../../../utils/icons";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

const roles = [
  { label: "Administrater", value: "admin" },
  { label: "User", value: "user" },
] as const;

const userFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.string().min(1, "Please select a role"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData?: userType;
  onClose: () => void;
}

// This can come from your database or API.
const defaultValues: Partial<UserFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export function UserForm({
  className,
  initialData,
  onClose,
  ...props
}: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData,
  });

  const {
    mutate: update,
    isLoading: updateLoading,
    isError: updateIsError,
    error: updateError,
  } = useUpdateUser();

  const router = useRouter();
  const queryClient = useQueryClient();

  const err: any = (updateError as any)?.response?.data!;
  const isLoading = updateLoading;
  const isError = updateIsError;
  const errMessage = err?.message;

  function onSubmit(data: UserFormValues) {
    data;
    update(
      { ...data, id: initialData?._id },
      {
        onSuccess: (res) => {
          toast.success(res.data?.message);
          queryClient.invalidateQueries(["user"]);
          queryClient.invalidateQueries(["userId", initialData?._id]);
          onClose();
        },
      }
    );
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled placeholder="name" {...field} />
              </FormControl>
              <FormDescription>Your account name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled placeholder="email" {...field} />
              </FormControl>
              <FormDescription>Your account email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Change user role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    {roles?.map((role, index) => {
                      return (
                        <SelectItem key={index} value={role?.value}>
                          {role?.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is your user role.</FormDescription>
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
        <div className="text-right">
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              ""
            )}
            {"Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
