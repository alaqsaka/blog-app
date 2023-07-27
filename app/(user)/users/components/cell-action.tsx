"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { User } from "./columns";
import {
  CreditCard,
  EditIcon,
  MoreHorizontal,
  PlusIcon,
  TrashIcon,
  User2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CellActionProps {
  data: User;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

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
          <DropdownMenuItem>
            <User2Icon className="mr-2 h-4 w-4" />
            <span>View User</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
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
