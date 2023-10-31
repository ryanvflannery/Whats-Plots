import { useEffect, useState, ChangeEvent, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import RemoveGroupMember from "./components/RemoveGroupMember";
import AddGroupMember from "./components/AddGroupMember";
import AddGroup from "./components/AddGroup";
import SignedIn from "../event/SignedIn";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function GroupComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [group, setGroup] = useState<any>(null);
  const [editingGroup, setEditingGroup] = useState<any>(null); //Delete group and edit group
  const [groupName, setGroupName] = useState("");

  const allGroups = useQuery(api.myFunctions.getAllGroupsForUser) || [];
  const deleteGroupMutation = useMutation(api.myFunctions.deleteGroup); // Assuming this is your delete group mutation

  useEffect(() => {
    setGroup(group);
  });

  const handleRowClick = (group: any) => {
    // Perform an action when a row is clicked, for example, navigate to a specific group or perform an action with the groupId
    setGroup(group);
    setIsOpen(true);

    // Add your logic here, like navigating to a group page or performing an action with the group ID
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroupMutation({ groupID: String(groupId) });
      // Here, after successful deletion, update the local state:
      // setGroups((prevGroups: any[]) => prevGroups.filter((group: any) => group._id !== groupId));
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  // useEffect(() => {
  //   setIsOpen(true);
  // }, []);

  const handleGroupNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setGroupName(event.target.value);
  };

  return (
    <>
      {isOpen ? (
        <>
          <div className="flex items-center justify-center ">
            <Card className="w-[800px]">
              <CardHeader>
                <CardTitle
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: "1.5rem", margin: 0 }}>{group.name}</p>
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="w-[50px]"
                  >
                    Exit
                  </Button>
                </CardTitle>

                <CardDescription>
                  <div className="flex flex-row items-start justify-start pb-5">
                    {group.groupMembers.map((item: any) => (
                      <p>{item},</p>
                    ))}
                  </div>
                  <AddGroupMember data={group._id} />{" "}
                  <RemoveGroupMember></RemoveGroupMember>
                  <SignedIn></SignedIn>
                </CardDescription>

                <CardContent>
                  {/* <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Name of your project" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="framework">Framework</Label>
                    </div>
                  </div>
                </form> */}
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
              </CardHeader>
            </Card>
          </div>
        </>
      ) : (
        <>
          <div className="justify-center">
            <div className="m-5 px-6">
              <AddGroup />
            </div>
            <Card>
              <Table>
                {/* <TableCaption></TableCaption> */}

                <TableHeader>
                  <TableRow className="justify-between">
                    <TableHead className="w-[400px]">Groups</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allGroups.map((group) => (
                    <TableRow className="h-[75px]">
                      <TableCell
                        onClick={() => handleRowClick(group)}
                        className="text-lg"
                      >
                        {group.name}
                      </TableCell>
                      {group.groupMembers.map((item: any, index: any) => (
                        <>
                          <TableCell
                            key={index}
                            className="align-middle justify-end"
                          >
                            <p className="text-xs">{item}</p>
                          </TableCell>
                        </>
                      ))}
                      <TableCell className="text-right">
                        {editingGroup === group ? (
                          <Input
                            defaultValue={group.name}
                            onChange={(e) => handleGroupNameChange(e, group)} // You'll need to implement the handleGroupNameChange function
                          />
                        ) : (
                          <Fragment>
                            {/* <Button onClick={() => handleEditGroup(group)}>Edit</Button> */}
                            <Button
                              onClick={() => handleDeleteGroup(group._id)}
                            >
                              Delete
                            </Button>
                          </Fragment>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </>
      )}
    </>

    // <>
    //   <h1>Groups:</h1>
    //   <Table>
    //     <TableHeader>
    //       <TableRow>
    //         <TableHead className="w-[100px]">Name</TableHead>
    //         <TableHead>d</TableHead>
    //         <TableHead>d</TableHead>
    //         <TableHead className="text-right">Members</TableHead>
    //       </TableRow>
    //     </TableHeader>

    //     <TableBody>
    //       {allGroups.map((group, index) => (
    //         <a key={index} onClick={() => handleRowClick(group.id)}>
    //           <TableRow className="hoverRow">
    //             {" "}
    //             {/* Apply the hoverRow class here */}
    //             <TableCell className="font-medium">{group.name}</TableCell>
    //             <TableCell>d</TableCell>
    //             <TableCell>d</TableCell>
    //             <TableCell className="text-right">hi</TableCell>
    //           </TableRow>
    //         </a>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </>
  );
}
