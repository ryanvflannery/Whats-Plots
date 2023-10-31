import { useState, SetStateAction } from "react";
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

export default function RemoveGroupMember() {
  const [emailAddressRemoveUser, setEmailAddressRemoveUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const removeMemberFromGroup = useMutation(api.group.removeUserFromGroup);

  const handleEmailRemoveChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    // Assuming this function is handling the change of the email input
    setEmailAddressRemoveUser(e.target.value);
  };

  const handleRemoveMemberGroup = () => {
    void removeMemberFromGroup({
      groupID: "457dhkw7rbdmabkgdbjnxyhp9k510f8",
      userID: emailAddressRemoveUser,
    });
  };

  return (
    <>
      {isOpen ? (
        <>
          {" "}
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Remove A Group Member</CardTitle>
              <CardDescription>
                Input An Email Address To Remove
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="name"
                      value={emailAddressRemoveUser}
                      onChange={handleEmailRemoveChange}
                      placeholder="Enter Email Address To Remove From Group"
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
              <Button onClick={handleRemoveMemberGroup}>Remove</Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <>
          {" "}
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Remove Group Member
          </Button>
        </>
      )}
    </>
  );
}
