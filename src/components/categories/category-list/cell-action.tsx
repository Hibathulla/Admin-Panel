"use client";
import { Button } from "@components/ui/button";
import { MoreHorizontal, Edit, Trash2, Clipboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import AlertModal from "@components/common/AlertModal";
import { useDeleteCategory } from "../../../services/category";
import toast from "react-hot-toast";

export const CategoryCellAction: React.FC<{
  data: any;
}> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { mutate, isLoading } = useDeleteCategory();

  const onDelete = () => {
    mutate(data?.id, {
      onSuccess: (res) => {
        setOpen(false);
        toast.error("category deleted successfully");
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
            onClick={() => router.push(`/category/${data?.id}`)}
            className="cursor-pointer"
          >
            <Edit className="h-4 w-4 mr-2" />
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
