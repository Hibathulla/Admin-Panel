"use client";
import AlertModal from "@components/common/AlertModal";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Clipboard, MoreHorizontal, PencilRuler, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useDeleteSize } from "@services/size";
import { useDeleteCoupon } from "../../../services/coupon";

export const CouponCellAction: React.FC<{
  data: any;
}> = ({ data }) => {
  console.log(data, "data");

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { mutate, isLoading } = useDeleteCoupon();

  const onDelete = () => {
    mutate(data?._id, {
      onSuccess: (res) => {
        setOpen(false);
        toast.error("Coupon deleted successfully");
      },
    });
  };

  return (
    <Fragment>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(data.id);
            }}
          >
            <Clipboard className="h-4 w-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/coupons/${data?._id}`)}
            className="cursor-pointer"
          >
            <PencilRuler className="h-4 w-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2 fill-red-400" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
};
