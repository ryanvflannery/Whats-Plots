import {
  useEffect,
  useState,
  ChangeEvent,
  SetStateAction,
  Fragment,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@clerk/clerk-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

function formatDateFromMillis(milliseconds: number): string {
  const date = new Date(milliseconds);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  return date.toLocaleDateString(undefined, options);
}
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { EditEvent, deleteEvents } from "convex/myFunctions";
import { set } from "date-fns";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function App() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <>
      <NavBar />
      <main className="container  flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold my-8 text-center">
          Whats The Plots
        </h1>

        <Authenticated>
          <GroupComponent></GroupComponent>
          {/* <SignedIn /> */}
          {/* <AddGroup></AddGroup>
          <RemoveGroupMember></RemoveGroupMember>
          <AddGroupMember></AddGroupMember> */}
        </Authenticated>

        <Unauthenticated>
          <div className="flex justify-center">
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
          </div>
        </Unauthenticated>
      </main>
    </>
  );
}

function RemoveGroupMember() {
  const [emailAddressRemoveUser, setEmailAddressRemoveUser] = useState("");
  const removeMemberFromGroup = useMutation(
    api.myFunctions.removeUserFromGroup
  );

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
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Remove A Group Member</CardTitle>
          <CardDescription>Input An Email Address To Remove</CardDescription>
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
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleRemoveMemberGroup}>Remove</Button>
        </CardFooter>
      </Card>
    </>
  );
}

function AddGroupMember() {
  const [emailAddressAddUser, setEmailAddressAddUser] = useState("");

  const addMemberToGroup = useMutation(api.myFunctions.addMemberToGroup);

  const handleEmailAddChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    // Assuming this function is handling the change of the email input
    setEmailAddressAddUser(e.target.value);
  };

  const handleAddMemberToGroup = () => {
    void addMemberToGroup({
      groupID: "457dhkw7rbdmabkgdbjnxyhp9k510f8",
      userID: emailAddressAddUser,
    });
  };

  return (
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
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleAddMemberToGroup}>Add</Button>
        </CardFooter>
      </Card>
    </>
  );
}

function NavBar() {
  return (
    <>
      <nav className="bg-white-800 text-white p-4">
        <ul className="flex justify-right">
          <UserButton afterSignOutUrl="#" />
        </ul>
      </nav>
    </>
  );
}

function GroupComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [group, setGroup] = useState<any>(null);

  const allGroups = useQuery(api.myFunctions.getAllGroupsForUser) || [];

  const handleRowClick = (group: any) => {
    // Perform an action when a row is clicked, for example, navigate to a specific group or perform an action with the groupId
    console.log(`Clicked group ID: ${group}`);
    setGroup(group);
    console.log("GROUP: ", group.groupMembers);
    setIsOpen(true);

    // Add your logic here, like navigating to a group page or performing an action with the group ID
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  // useEffect(() => {
  //   setIsOpen(true);
  // }, []);

  return (
    <>
      {isOpen ? (
        <>
          <div className="flex items-center justify-center h-screen">
            <Card className="w-[1000px] h-[700px]">
              <CardHeader>
                <CardTitle>Group</CardTitle>
                <CardDescription>
                  <div>
                    <p>members</p>
                    <ul>
                      {group.groupMembers.map(
                        (
                          item:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | null
                            | undefined,
                          index: Key | null | undefined
                        ) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                    <p>events</p>
                  </div>
                </CardDescription>
              </CardHeader>
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
              <CardFooter className="flex justify-between">
                <Button onClick={handleClose} variant="outline">
                  Exit
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      ) : (
        <>
          <>
            <Table>
              {/* <TableCaption></TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead className="text-right">Next Event</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allGroups.map((group, index) => (
                  <TableRow key={index} onClick={() => handleRowClick(group)}>
                    <TableCell className="font-medium">{group.name}</TableCell>
                    <TableCell>
                      <ul>
                        {group.groupMembers.map(
                          (member: { name: string }, memberIndex: number) => (
                            <li key={memberIndex}>{member.name}</li>
                          )
                        )}
                      </ul>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* Add next event details */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
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

function AddGroup() {
  const [groupName, setGroupName] = useState("");
  const createGroup = useMutation(api.myFunctions.createNewGroup);

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
  };

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create A New Group</CardTitle>
          <CardDescription>Make A New Group In One Click</CardDescription>
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
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleCreateGroup}>Create</Button>
        </CardFooter>
      </Card>
    </>
  );
}

function SignedIn() {
  const saveEvent = useMutation(api.myFunctions.createNewEvent);
  const addUser = useMutation(api.myFunctions.addUser);
  const [isOpen, setIsOpen] = useState(false);
  const events = useQuery(api.myFunctions.getEvents);

  useEffect(() => {
    void addUser();
  }, []);

  //function that creates a new event
  function CreateEvent() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [newEvent, setNewEvent] = useState("");
    console.log(events);

    return (
      <>
        <div className="flex gap-2">
          <Input
            type="text"
            value={newEvent}
            onChange={(event) => setNewEvent(event.target.value)}
            placeholder="Type your event here"
          />
          <Button
            disabled={!newEvent || !startDate}
            title={
              newEvent
                ? "Save your event to the database"
                : "You must enter an event first"
            }
            onClick={async () => {
              if (startDate) {
                await saveEvent({
                  name: newEvent.trim(),
                  id: 0,
                  date: startDate.getTime(),
                });
                setNewEvent("");
              }
            }}
            className="min-w-fit"
          >
            Save the Event
          </Button>
          <div style={{ color: "black" }}>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date as Date)}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="flex gap-4 items-center">
        This is you:
        <UserButton afterSignOutUrl="#" />
      </p>
      <div>
        {!isOpen ? (
          <></>
        ) : (
          <>
            <CreateEvent />
          </>
        )}
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Create Event"}
        </Button>
      </div>
      <div className="">
        {events?.map(({ _id, name, date }) => (
          <div key={_id}>
            {name} - {formatDateFromMillis(date)}
          </div>
        ))}
      </div>
    </>
  );
}
