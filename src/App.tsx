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
import { useEffect, useState, ChangeEvent, SetStateAction } from "react";

export default function App() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [groupName, setGroupName] = useState("");
  const allGroups = useQuery(api.myFunctions.getAllGroupsForUser) || [];
  const [emailAddressAddUser, setEmailAddressAddUser] = useState("");
  const [emailAddressRemoveUser, setEmailAddressRemoveUser] = useState("");

  const createGroup = useMutation(api.myFunctions.createNewGroup);
  const addMemberToGroup = useMutation(api.myFunctions.addMemberToGroup);
  const removeMemberFromGroup = useMutation(
    api.myFunctions.removeUserFromGroup
  );

  const handleGroupNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setGroupName(event.target.value);
  };

  const handleEmailAddChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    // Assuming this function is handling the change of the email input
    setEmailAddressAddUser(e.target.value);
  };

  const handleEmailRemoveChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    // Assuming this function is handling the change of the email input
    setEmailAddressRemoveUser(e.target.value);
  };

  const handleCreateGroup = () => {
    void createGroup({
      name: groupName,
      groupMembers: [],
    });
  };

  const handleAddMemberToGroup = () => {
    void addMemberToGroup({
      groupID: "457dhkw7rbdmabkgdbjnxyhp9k510f8",
      userID: emailAddressAddUser,
    });
  };

  const handleRemoveMemberGroup = () => {
    void removeMemberFromGroup({
      groupID: "457dhkw7rbdmabkgdbjnxyhp9k510f8",
      userID: emailAddressRemoveUser,
    });
  };

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Welcome to Plots
      </h1>
      <Authenticated>
        <SignedIn />
        <div>
          Hello, {userId} your current active session is {sessionId}
        </div>
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
        <Input
          value={emailAddressAddUser}
          onChange={handleEmailAddChange}
          placeholder="Enter Email Address To Add To Group"
        ></Input>
        <Button onClick={handleAddMemberToGroup}>Add member to group</Button>
        <Input
          value={emailAddressRemoveUser}
          onChange={handleEmailRemoveChange}
          placeholder="Enter Email Address To Remove From Group"
        ></Input>
        <Button onClick={handleRemoveMemberGroup}>
          Remove Member From Group
        </Button>
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
