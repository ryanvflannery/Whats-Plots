import React, { useState, ChangeEvent, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import RemoveGroupMember from "./components/RemoveGroupMember";
import AddGroupMember from "./components/AddGroupMember";
import AddGroup from "./components/AddGroup";
import Events from "../event/Events";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
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
import { set } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShiftingCountdown from "./components/ShiftingCountdown";

export default function GroupComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [group, setGroup] = useState<any>(null);
  const [editingGroup, setEditingGroup] = useState<any>(null); //Delete group and edit group
  const [groupName, setGroupName] = useState("");
  const allGroups = useQuery(api.group.getAllGroupsForUser) || [];
  const deleteGroupMutation = useMutation(api.group.deleteGroup); // Assuming this is your delete group mutation

  const handleRowClick = (group: any) => {
    setGroup(group);
    setIsOpen(true);
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroupMutation({ groupID: String(groupId) });
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGroupNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setGroupName(event.target.value);
  };

  return (
    <>
      {/* grid-cols-1 lg:grid-cols-5 gap-4 */}
      <div className="">
        <div>
          <div className="flex justify-between">
            <div className="m-5">
              <h1 className="m-2.5 text-2xl font-medium text-white">
                Upcoming Events
              </h1>
            </div>
            <div className="m-10">
              <Button>Settings</Button>
            </div>
          </div>
          <div className="justify-center">
            <Separator className="w-90" orientation="horizontal" />
          </div>
        </div>
        <div
          className="grid m-5 grid-cols-5 overflow-x-auto gap-4 border-gray-50 border-opacity-50 h-screen"
          style={{ height: "30vh" }}
        >
          <Card className="mt-2.5 mb-2.5 bg-blue-50"></Card>
          <Card className="mt-2.5 mb-2.5 bg-green-100"></Card>
          <Card className="mt-2.5 mb-2.5 bg-yellow-200"></Card>
          <Card className="mt-2.5 mb-2.5 bg-red-200 "></Card>
          <Card className="mt-2.5 mb-2.5 bg-purple-200"></Card>
        </div>
      </div>
      <div className="m-10 border border-gray-50 border-opacity-25">
        <div>
          <h1 className="grid grid-row ml-10 m-5 text-2xl font-medium text-white">
            Groups
          </h1>
        </div>
        <div className="justify-center">
          <Separator className="w-90 mr-10 ml-10" orientation="horizontal" />
        </div>{" "}
        <Tabs className="flex ml-5 m-10" defaultValue="account">
          <div>
            <TabsList className="grid mt-5 mb-5 bg-transparent ">
              <TabsTrigger
                className="text-md hover:bg-transparent hover:underline "
                value="account"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                className="text-md mt-5 hover:bg-transparent hover:underline"
                value="a"
              >
                Group1
              </TabsTrigger>
              <TabsTrigger
                className="text-md mt-5 hover:bg-transparent hover:underline"
                value="d"
              >
                Group2
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="account" className="w-screen ml-10">
            <div>
              <CardHeader>
                <CardTitle>Group</CardTitle>
                <CardDescription>
                  abc@gmail.com, hi@gmail.com, test@gmail.com
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Events></Events>
                {/* <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="@peduarte" />
                    </div> */}
              </CardContent>
              <CardFooter></CardFooter>
            </div>
          </TabsContent>
          {/* <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent> */}
        </Tabs>
      </div>
      <ShiftingCountdown />
    </>
  );
}
// <div className="justify-center">
//   <div className="m-5 px-6">
//     <AddGroup />
//   </div>
//   <Card>
//     <Table>
//       <TableHeader>
//         <TableRow className="justify-between">
//           <TableHead className="w-[400px]">Groups</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {allGroups.map((group) => (
//           <TableRow className="h-[75px]">
//             <TableCell
//               onClick={() => handleRowClick(group)}
//               className="text-lg"
//             >
//               {group.name}
//             </TableCell>
//             {group.groupMembers.map((item: any, index: any) => (
//               <>
//                 <TableCell
//                   key={index}
//                   className="align-middle justify-end"
//                 >
//                   <p className="text-xs">{item}</p>
//                 </TableCell>
//               </>
//             ))}
//             <TableCell className="text-right">
//               {editingGroup === group ? (
//                 <Input
//                   defaultValue={group.name}
//                   onChange={(e) => handleGroupNameChange(e, group)} // You'll need to implement the handleGroupNameChange function
//                 />
//               ) : (
//                 <Fragment>
//                   {/* <Button onClick={() => handleEditGroup(group)}>Edit</Button> */}
//                   <Button
//                     onClick={() => handleDeleteGroup(group._id)}
//                   >
//                     Delete
//                   </Button>
//                 </Fragment>
//               )}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </Card>
// </div>
