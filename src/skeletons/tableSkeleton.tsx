import React from "react";
import { Skeleton } from "@components/ui/skeleton";
import { MoreHorizontal } from "lucide-react";

const TableSkeleton = () => {
  return (
    <div>
      <Skeleton
        className="max-w-sm h-[40px] rounded-md border border-neutral-200 ring-offset-white 
      dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 mb-5"
      />
      <div className="rounded-md border border-slate-200">
        <div className="flex items-center w-full justify-between pl-4 pr-16 border-b border-slate-200 py-4">
          <div className="flex items-center gap-16">
            <Skeleton className="w-[55px] h-[13px] rounded-full" />
            <Skeleton className="w-[75px] h-[13px] rounded-full" />
          </div>
          <div className="flex items-center gap-20 ">
            <Skeleton className="w-[55px] h-[13px] rounded-full" />
            <Skeleton className="w-[55px] h-[13px] rounded-full" />
          </div>
        </div>
        <div className="flex items-center w-full justify-between pl-4 pr-[12.3rem] border-b border-slate-200 py-6">
          <div className="flex items-center gap-16">
            <Skeleton className="w-[55px] h-[13px] rounded-full" />
            <Skeleton className="w-[305px] h-[13px] rounded-full" />
          </div>
          <div className="flex items-center gap-24">
            <Skeleton className="w-[55px] h-[13px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
