import { IconName } from "react-icons/bi";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { EditEvent, deleteEvents } from "convex/myFunctions";
import { set } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

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
      <main className="container  flex flex-col gap-1">
        <Authenticated>
          <NavBar />
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
          <div className="flex items-center justify-center h-screen">
            <Card className="w-[800px] h-[700px]">
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
                      <p>{item}</p>
                    ))}
                  </div>
                  <AddGroupMember data={group._id} />{" "}
                  {/* <RemoveGroupMember></RemoveGroupMember> */}
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
  const { toast } = useToast();

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
        <ul className="flex justify-between">
          <UserButton afterSignOutUrl="#" />
          <div className="ml-auto">
            <AddGroup />
          </div>
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
      <Tabs defaultValue="Upcoming Events" className="w-[100%]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming </CardTitle>
              <CardDescription>
                Upcoming Events Will Appear Here. Click on an event to confirm
                or deny attendance.{" "}
                <div className="mt-5">
                  {events?.map(({ _id, name, date }) => (
                    <div key={_id}>
                      <div className="flex flex-row items-start justify-start pb-5">
                        <Card className="p-2">
                          <button>Attending</button>
                          <button>Not Attending</button>
                          <div className="flex flex-col">
                            <p>Name: {name}</p>
                            <p>Date: {formatDateFromMillis(date)}</p>
                          </div>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="confirmed">
          <Card>
            <CardHeader>
              <CardTitle>Confirmed</CardTitle>
              <CardDescription>
                Confirmed Events Will Appear Here. View Upcoming Events You Are
                Attending.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div> */}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past Events</CardTitle>
              <CardDescription>
                Past Events You Have Attended Will Appear Here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div> */}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-2">
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
    </>
  );
}
