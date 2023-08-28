"use client";
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
import UserFormModal from "../UserFormModal";
import { useGetSingleUser } from "../../../services/user";

export const UserCellAction: React.FC<{
  data: any;
}> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const onDelete = () => {
    toast.error("user deactivated successfully");
    // mutate(data?.id, {
    //   onSuccess: (res) => {
    //     setOpen(false);
    //     toast.error("size deleted successfully");
    //   },
    // });
  };

  return (
    <Fragment>
      <UserFormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        id={data?._id}
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
            onClick={() => setOpen(true)}
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
