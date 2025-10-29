import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
interface TableSkeletonProps {
  length?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ length = 16 }) => {
  return (
    <TableBody className="px-5">
      {[...Array(length)].map((_, i) => (
        <TableRow key={`skeleton-${i}`}>
          <TableCell className="px-5 w-[5%] border-r text-center">
            <Skeleton className="h-4 w-4 mx-auto" />
          </TableCell>
          <TableCell className="px-2 w-[15%] border-r py-0 text-center">
            <Skeleton className="h-4 w-full mx-auto" />
          </TableCell>
          <TableCell className="w-[10%] border-r text-center">
            <Skeleton className="h-4 w-full mx-auto" />
          </TableCell>
          <TableCell className="w-[10%] border-r text-center">
            <Skeleton className="h-4 w-full mx-auto" />
          </TableCell>
          <TableCell className="w-[12%] max-w-[200px] border-r text-center">
            <Skeleton className="h-4 w-full mx-auto" />
          </TableCell>
          <TableCell className="w-[13%] border-r text-center">
            <Skeleton className="h-4 w-full mx-auto" />
          </TableCell>
          <TableCell className="w-[10%] border-r text-center">
            <Skeleton className="h-4 w-full mx-auto" />
          </TableCell>
          <TableCell className="w-[10%] border-r text-center">
            <Skeleton className="h-4 w-full mx-auto" />
          </TableCell>
          <TableCell className="w-[10%] border-r text-center">
            <Skeleton className="h-4 w-full mx-auto" />
          </TableCell>
          <TableCell className="w-[5%] text-center">
            <Skeleton className="h-4 w-full mx-auto" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableSkeleton;
