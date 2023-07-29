"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { User } from "./columns";
import { toast } from "react-hot-toast";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CellActionProps {
  data: User;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onDelete = async (userId: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://gorest.co.in/public/v2/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          },
        }
      );

      if (res.ok) {
        setLoading(false);
        setOpen(false);
        toast.success("Success Delete User");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

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
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/users/${data.id}/create-blog`)}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            <span>Add New Blog</span>
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
          <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
              <div
                onClick={() => setOpen(true)}
                className="cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                <span>Delete User</span>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  user and remove data from our the server.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={loading}
                  onClick={() => onDelete(data.id)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellAction;
