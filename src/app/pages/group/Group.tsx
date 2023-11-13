import { useState, ChangeEvent } from "react";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import RemoveGroupMember from "./components/RemoveGroupMember";
import AddGroupMember from "./components/AddGroupMember";
import AddGroup from "./components/AddGroup";
import Events from "../event/Events";
import { Separator } from "@/components/ui/separator";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import Friends from "../friends/Friends";
import AITable from "./AI/AITable";
import { BsFillGearFill } from "react-icons/bs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShiftingCountdown from "./components/ShiftingCountdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Settings from "../settings/settings";

export default function GroupComponent() {
  const allGroups = useQuery(api.group.getAllGroupsForUser) || [];
  const deleteGroupMutation = useMutation(api.group.deleteGroup); // Assuming this is your delete group mutation

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroupMutation({ groupID: String(groupId) });
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };

  return (
    <>
      {/* grid-cols-1 lg:grid-cols-5 gap-4 */}
      <div className="pb-5">
        <div>
          <div className="flex justify-between m-5 ">
            <h1 className="text-left text-2xl font-medium text-white">
              Dashboard
            </h1>

            <div className="text-right">
              <UserButton />
            </div>
          </div>

          <div className="justify-center">
            <Separator className="w-90" orientation="horizontal" />
          </div>
        </div>
        <div
          className="grid mt-5 mr-5 ml-5 grid-cols-6 gap-4 border-gray-50 border-opacity-50 "
          style={{ height: "20vh" }}
        >
          <Card className="mt-2.5  bg-blue-50"></Card>
          <Card className="mt-2.5  bg-green-100"></Card>
          <Card className="mt-2.5  bg-yellow-200"></Card>
          <Card className="mt-2.5  bg-red-200 "></Card>
          <Card className="mt-2.5  bg-purple-200"></Card>
          <Card className="mt-2.5  bg-purple-200"></Card>
        </div>
      </div>
      <Tabs
        className="flex m-5 bg-dark-foreground border border-gray-50 border-opacity-25"
        style={{ height: "100vh" }}
        defaultValue="Friends"
      >
        <TabsList className="flex  flex-col items-start justify-start h-100 gap-2">
          <ContextMenu>
            <TabsTrigger
              className="text-md hover:bg-transparent hover:underline "
              value="Friends"
            >
              <HoverCard>
                <ContextMenuTrigger>
                  <HoverCardTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/benriekes.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                </ContextMenuTrigger>

                <ContextMenuContent>
                  <ContextMenuItem inset>
                    <button>Hello Friends</button>
                  </ContextMenuItem>
                </ContextMenuContent>
                <HoverCardContent>
                  <div className="flex justify-center text-center pl-5 pr-5">
                    <h4 className="text-sm font-semibold">Friends</h4>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </TabsTrigger>
          </ContextMenu>
          <TabsTrigger className="text-md " value="Settings">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar>
                  <BsFillGearFill size={40} />
                  {/* <AvatarFallback>ST</AvatarFallback> */}
                </Avatar>
              </HoverCardTrigger>

              <HoverCardContent>
                <div className="flex justify-center text-center pl-5 pr-5">
                  <h4 className="text-sm font-semibold">Settings</h4>
                </div>
              </HoverCardContent>
            </HoverCard>
          </TabsTrigger>
          <TabsTrigger
            className="text-md hover:bg-transparent hover:underline "
            value=""
          >
            <HoverCard>
              <HoverCardTrigger>
                <AddGroup></AddGroup>
              </HoverCardTrigger>

              <HoverCardContent>
                <div className="flex justify-center text-center pl-5 pr-5">
                  <h4 className="text-sm font-semibold">Create Group</h4>
                </div>
              </HoverCardContent>
            </HoverCard>
          </TabsTrigger>
          <Separator className="bg-white" orientation="horizontal" />
          {allGroups.map(
            (group, index) => (
              console.log("group", group._id),
              (
                <TabsTrigger
                  key={index}
                  className="text-md hover:bg-transparent hover:underline "
                  value={group._id}
                >
                  <ContextMenu>
                    <HoverCard>
                      <ContextMenuTrigger>
                        <HoverCardTrigger asChild>
                          <Avatar>
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </HoverCardTrigger>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem inset>
                          <button
                            onClick={() => {
                              handleDeleteGroup(group._id);
                            }}
                          >
                            Delete Group
                          </button>
                        </ContextMenuItem>
                      </ContextMenuContent>
                      <HoverCardContent>
                        <div className="flex justify-center pl-5 pr-5">
                          <h4 className="text-sm font-semibold">
                            {group.name}
                          </h4>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </ContextMenu>
                </TabsTrigger>
              )
            )
          )}
        </TabsList>
        <TabsContent value="Friends" className="w-screen">
          <div className="flex flex-row gap-4 w-full h-10 ">
            <p>Friends</p>
          </div>
          <div>
            <Friends />
          </div>
        </TabsContent>
        <TabsContent value="Settings" className="w-screen">
          <div className="flex flex-row gap-4 w-full h-10 ">
            <p>Settings</p>
          </div>
          <div>
            <Settings />
          </div>
        </TabsContent>
        {allGroups.map((group, index) => (
          // console.log(group.id), // Log group ID
          <TabsContent key={index} value={group._id} className="w-screen">
            <Events group={group}></Events>
          </TabsContent>
        ))}
      </Tabs>

      {/* <div className="m-5 bg-dark-foreground border border-gray-50 border-opacity-25">
        <div className="justify-center flex">
          <h1 className="m-2.5 text-2xl font-medium text-white">Your Tools</h1>
        </div>
        <AITable></AITable>
      </div> */}

      {/* <Accordion type="single" collapsible className="m-10">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
      {/* <div>
        <Card className="m-10 justify-center flex">
          <h1 className="m-2.5 text-2xl font-medium text-white">Your Tools</h1>
        </Card>
      </div> */}
    </>
  );
}
// <div className="justify-center">
//   <div className="m-5 px-6">
{
  /* <AddGroup />; */
}
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
