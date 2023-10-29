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

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function App() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <>
      <NavBar />
      <main className="container  flex flex-col gap-1">
        <Authenticated>
          <GroupComponent></GroupComponent>
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

// add group, remove group member, addgroupmember
function GroupComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [group, setGroup] = useState<any>(null);

  const allGroups = useQuery(api.myFunctions.getAllGroupsForUser) || [];

  useEffect(() => {
    setGroup(group);
  });

  const handleRowClick = (group: any) => {
    // Perform an action when a row is clicked, for example, navigate to a specific group or perform an action with the groupId
    setGroup(group);
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
            <Card className="w-[800px] h-[700px]">
              <CardHeader>
                <CardTitle>Group</CardTitle>
                <CardDescription>
                  <div>
                    <p>members</p>
                    <ul>
                      {group.groupMembers.map((item: any, index: any) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <AddGroupMember data={group._id} />{" "}
                    {/* <RemoveGroupMember></RemoveGroupMember> */}
                    <h1>Events</h1>
                    <SignedIn></SignedIn>
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
          <div className="justify-center">
            <AddGroup />

            <Card>
              <Table>
                {/* <TableCaption></TableCaption> */}

                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Groups</TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allGroups.map((group, index) => (
                    <TableRow
                      className="h-[75px]"
                      onClick={() => handleRowClick(group)}
                    >
                      <TableCell className="font-medium">
                        {group.name}
                      </TableCell>
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

function RemoveGroupMember() {
  const [emailAddressRemoveUser, setEmailAddressRemoveUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

function AddGroupMember({ data }: React.PropsWithChildren<any>) {
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

function NavBar() {
  return (
    <>
      <nav className="bg-white-800 text-white p-10">
        <ul className="flex justify-right">
          <UserButton afterSignOutUrl="#" />
        </ul>
      </nav>
    </>
  );
}

function AddGroup() {
  const [groupName, setGroupName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

function CreateEvent() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState("");
  const saveEvent = useMutation(api.myFunctions.createNewEvent);

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

function SignedIn() {
  const addUser = useMutation(api.myFunctions.addUser);
  const [isOpen, setIsOpen] = useState(false);
  const events = useQuery(api.myFunctions.getEvents);

  useEffect(() => {
    void addUser();
  }, []);

  //function that creates a new even

  return (
    <>
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
