"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { User } from "./columns";
import {
  EditIcon,
  MoreHorizontal,
  PlusIcon,
  TrashIcon,
  User2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: User;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>User Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <PlusIcon className="mr-2 h-4 w-4" />
            <span>Add New Post</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/users/${data.id}`)}
            className="cursor-pointer"
          >
            <User2Icon className="mr-2 h-4 w-4" />
            <span>View User</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/users/${data.id}/edit`)}
            className="cursor-pointer"
          >
            <EditIcon className="mr-2 h-4 w-4" />
            <span>Update User</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon className="mr-2 h-4 w-4" />
            <span>Update User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellAction;
