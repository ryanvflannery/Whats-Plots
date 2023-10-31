import { useState, ChangeEvent } from "react";
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
      {isOpen ? (
        <>
          {" "}
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create a new group</CardTitle>
              <CardDescription>Make a new group in one click</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={groupName}
                      onChange={handleGroupNameChange}
                      placeholder="Group Name"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => setIsOpen(!isOpen)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleCreateGroup}>Create</Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <>
          <Button onClick={() => setIsOpen(!isOpen)}>Create Group</Button>
        </>
      )}
    </>
  );
}
