import { useEffect, useState, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AddGroupMember({ data }: React.PropsWithChildren<any>) {
  const [emailAddressAddUser, setEmailAddressAddUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [group, setGroup] = useState<any>(null);

  useEffect(() => {
    setGroup(data);
  }, [data]);

  const addMemberToGroup = useMutation(api.myFunctions.addMemberToGroup);

  const handleEmailAddChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    // Assuming this function is handling the change of the email input
    setEmailAddressAddUser(e.target.value);
  };

  const handleAddMemberToGroup = () => {
    void addMemberToGroup({
      groupID: group,
      userID: emailAddressAddUser,
    });
    setIsOpen(false);
    alert(`${emailAddressAddUser}, has been added to the group`);
  };

  return (
    <>
      {isOpen ? (
        <>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Add A Group Member</CardTitle>
              <CardDescription>Input An Email Address To Add</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={emailAddressAddUser}
                      onChange={handleEmailAddChange}
                      placeholder="Enter Email Address To Add To Group"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={handleAddMemberToGroup}>Add</Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Add Group Member
          </Button>
        </>
      )}
    </>
  );
}
