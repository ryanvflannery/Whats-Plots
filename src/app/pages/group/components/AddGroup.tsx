import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AddGroup() {
  const [groupName, setGroupName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const createGroup = useMutation(api.group.createNewGroup);

  const handleGroupNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setGroupName(event.target.value);
  };

  const handleCreateGroup = () => {
    void createGroup({
      name: groupName,
      groupMembers: [],
    });
    setIsOpen(false);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Create Group</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create A New Group</SheetTitle>
            <SheetDescription>
              Create A New Group Here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={groupName}
                onChange={handleGroupNameChange}
                placeholder="Group Name"
                className="col-span-3"
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div> */}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={handleCreateGroup} type="submit">
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
