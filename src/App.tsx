import { useEffect, useState, ChangeEvent, SetStateAction } from "react";
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
import { EditEvent, deleteEvents } from "convex/myFunctions";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function App() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Welcome to Plots
      </h1>
      <UserButton afterSignOutUrl="#" />
      <Authenticated>
        <SignedIn />
        <div>Hello, {userId}</div>
        <AddGroup></AddGroup>
        <RemoveGroupMember></RemoveGroupMember>
        <AddGroupMember></AddGroupMember>
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

function GroupComponent() {
  const allGroups = useQuery(api.myFunctions.getAllGroupsForUser) || [];

  return (
    <>
      <h1>Groups:</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead></TableHead>

            <TableHead>Members</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allGroups.map((group, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{group.name}</TableCell>
              <TableCell>{}</TableCell>

              <TableCell>{group.groupMembers.length}</TableCell>
              <TableCell className="text-right">{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Groups</h4>
          {allGroups.map((group, index) => (
            <>
              <li key={index}>
                {" "}
                <Card className="w-[100px] h-[100px]">
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              </li>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea> */}
      {/* <form>
        <div className="grid w-full items-center gap-4">
          <Label className="items-center" htmlFor="name">
            Name
          </Label>
        </div>
        <h1>All Groups</h1>
        <></>
        <ul>
          {allGroups.map((group, index) => (
            <li key={index}>
              {" "}
              <Card className="w-[150px] h-[150px]">
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </form> */}
    </>
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
            disabled={!newEvent}
            title={
              newEvent
                ? "Save your event to the database"
                : "You must enter an event first"
            }
            onClick={async () => {
              //you may want to change type name to event
              await saveEvent({
                name: newEvent.trim(),
                id: 0,
                date: Date.now(),
              });
              setNewEvent("");
            }}
            className="min-w-fit"
          >
            Save the Event
          </Button>
        </div>
      </>
    );
  }

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
        {events?.map(({ _id, name }) => (
  
            <div key={_id}>{name}
            <Card></Card>
            <button onClick={() => EditEvent(_id,name)}>Edit</button>
            <button onClick={() => deleteEvents(_id, name)}>Delete</button>
            </div>


        ))}
      </div>
    </>
  );
}
