"use client";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, Trash, Trash2 } from "lucide-react";
import AlertModal from "./AlertModal";

interface HeadingProps {
  title: string;
  description: string;
  deleteButton?: boolean;
  onConfirm?: () => void;
  loading?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  description,
  title,
  deleteButton = false,
  onConfirm,
  loading,
}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  return (
    <Fragment>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        text="category"
        onConfirm={onConfirm}
        loading={loading}
      />
      <div className="flex gap-1">
        <Button
          className="flex items-center justify-start px-1"
          variant="ghost"
          onClick={() => router.back()}
        >
          <ChevronLeft className="!w-6 !h-6" />
        </Button>
        <div className="space-y-2">
          <h1>{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-200 font-medium">
            {description}
          </p>
          {/* <div className="font-semibold text-xs text-neutral-800 dark:text-neutral-100">
        <span className="text-neutral-400 dark:text-neutral-50">ACTIVE</span>: 5
      </div> */}
        </div>
        {deleteButton && (
          <Button
            onClick={() => setOpen(true)}
            className="ml-auto"
            variant={"destructive"}
            size={"icon"}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default Heading;
