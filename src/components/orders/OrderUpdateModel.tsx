"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "../ui/button";
import { Icons } from "../../utils/icons";
import OrderForm from "./order-form";
import { useGetSingleUser } from "../../services/user";
import { useGetSingleOrder } from "../../services/order";
import OrderItem from "./order-item";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const OrderUpdateModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  const { data } = useGetSingleOrder(id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order details</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete this{" "}
            {text ? text : "data"}.
          </DialogDescription> */}
        </DialogHeader>
        <div className="w-full h-[10rem] overflow-y-auto divide divide-y">
          {data?.data?.order?.products?.map((product: any) => {
            return <OrderItem key={product?.id} data={product} />;
          })}
        </div>
        <OrderForm initialData={data?.data?.order} onClose={onClose} />
        {/* <DialogFooter>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            {loading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              ""
            )}{" "}
            Continue
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default OrderUpdateModal;
