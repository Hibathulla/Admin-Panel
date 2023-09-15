import React, { useEffect } from "react";
import { orderType } from "../../../types/order";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdateOrder } from "../../../services/order";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "../../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Icons } from "../../../utils/icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface OrderUpdateProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData?: orderType;
  onClose: () => void;
}

const userFormSchema = z.object({
  status: z.string().min(1, "Please select a status"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const OrderForm: React.FC<OrderUpdateProps> = ({ initialData, onClose }) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
  });

  useEffect(() => {
    form.setValue("status", "success");
  }, [form, initialData?.status]);

  const {
    mutate: update,
    isLoading: updateLoading,
    isError: updateIsError,
    error: updateError,
  } = useUpdateOrder();

  console.log(initialData, "data");

  const router = useRouter();
  const queryClient = useQueryClient();

  const err: any = (updateError as any)?.response?.data!;
  const isLoading = updateLoading;
  const isError = updateIsError;
  const errMessage = err?.message;

  function onSubmit(data: UserFormValues) {
    console.log(data);
    update(
      { ...data, id: initialData?._id },
      {
        onSuccess: (res) => {
          toast.success(res.data?.message);
          queryClient.invalidateQueries(["order"]);
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
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Change order status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select order status" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectLabel>Fruits</SelectLabel> */}

                    <SelectItem value={"success"}>{"Success"}</SelectItem>
                    <SelectItem value={"shipped"}>{"Shipped"}</SelectItem>
                    <SelectItem value={"delivered"}>{"Delivered"}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is order status.</FormDescription>
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
};

export default OrderForm;
