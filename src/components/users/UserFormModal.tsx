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
import { UserForm } from "./user-form";
import { useGetSingleUser } from "../../services/user";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const UserFormModal: React.FC<UserModalProps> = ({ isOpen, onClose, id }) => {
  const { data } = useGetSingleUser(id);

  console.log(data, "test");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update user role</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete this{" "}
            {text ? text : "data"}.
          </DialogDescription> */}
        </DialogHeader>
        <UserForm initialData={data?.data?.user} onClose={onClose} />
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

export default UserFormModal;
