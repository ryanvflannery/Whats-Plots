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
import { useEffect, useState, ChangeEvent } from "react";
import { getAllGroupsForUser } from "convex/myFunctions";

export default function App() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [groupName, setGroupName] = useState("");
  const allGroups = useQuery(api.myFunctions.getAllGroupsForUser) || [];

  // const [groupMemberEmail, setGroupMemberEmail] = useState("");
  // const [groupMembersAdded, setGroupMembersAdded] = useState<string[]>([]);
  const createGroup = useMutation(api.myFunctions.createNewGroup);
  const addMemberToGroup = useMutation(api.myFunctions.addMemberToGroup);

  const handleGroupNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setGroupName(event.target.value);
  };

  // const handleGroupMemberChange = (
  //   event: ChangeEvent<HTMLInputElement>
  // ): void => {
  //   setGroupMemberEmail(event.target.value);
  // };

  const handleCreateGroup = () => {
    void createGroup({
      name: groupName,
      id: 12341241231231,
      groupMembers: [1, 2, 4],
    });
  };

  const handleAddMemberToGroup = () => {
    void addMemberToGroup({
      groupID: "45xxzkj37860r6mpwsy3cakq9k5dv6g",
      userID: 1283612783,
    });
  };

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Welcome to Plots
      </h1>
      <Authenticated>
        <SignedIn />
        {/* <div>
          Hello, {userId} your current active session is {sessionId}
        </div> */}
        <Input
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="Group Name"
        ></Input>

        <Button onClick={handleCreateGroup}>create new group</Button>
        <h1>All Groups</h1>
        <ul>
          {allGroups.map((group, index) => (
            <li key={index}>
              {/* Display the group details here */}
              Group Name: {group.name}
            </li>
          ))}
        </ul>
        <Button onClick={handleAddMemberToGroup}>Add member to group</Button>

        <p>Space for Create Event</p>
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

        {/* <div className="">
        {events?.map(({ _id, name }) => (
        <div key={_id}>{name}</div>
        ))}
        </div> */}
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
        {events?.map(({ _id, name }) => (
          <div key={_id}>{name}</div>
        ))}
      </div>
    </>
  );
}
