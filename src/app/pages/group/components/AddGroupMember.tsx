import { useEffect, useState, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
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

import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import { Label } from "@/components/ui/label";

export default function AddGroupMember({ data }: React.PropsWithChildren<any>) {
  const [emailAddressAddUser, setEmailAddressAddUser] = useState("");
  const [group, setGroup] = useState<any>(null);

  useEffect(() => {
    setGroup(data);
  });

  const addMemberToGroup = useMutation(api.group.addMemberToGroup);

  const handleEmailAddChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmailAddressAddUser(e.target.value);
  };

  const handleAddMemberToGroup = () => {
    void addMemberToGroup({
      groupID: group,
      userID: emailAddressAddUser,
    });
    window.location.reload();
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Add</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Group Member</SheetTitle>
            <SheetDescription>
              Add A New Group Member Here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="name"
                value={emailAddressAddUser}
                onChange={handleEmailAddChange}
                placeholder="Enter Email Address"
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={handleAddMemberToGroup} type="submit">
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
