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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

function formatDateFromMillis(milliseconds: number): string {
  const date = new Date(milliseconds);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true,
  };
  return date.toLocaleDateString(undefined, options);
}

export default function App() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [groupName, setGroupName] = useState("");
  const [allGroups, setAllGroups] = useState<any[]>([]);
  const createGroup = useMutation(api.myFunctions.createNewGroup);
  const getAllGroupsForUser = useMutation(api.myFunctions.getAllGroupsForUser);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await getAllGroupsForUser();
      setAllGroups(groups);
    };
    fetchGroups();
  }, []);

  const handleGroupNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setGroupName(event.target.value);
  };

  const handleCreateGroup = () => {
    void createGroup({
      name: groupName,
      id: 12341241231231,
      groupMembers: [1, 2, 4],
    });
  };

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Welcome to Plots
      </h1>
      <Authenticated>
        <SignedIn />
        <Input
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="Group Name"
        ></Input>
        <Button onClick={handleCreateGroup}>Create new group</Button>
        <h1>All Groups</h1>
        <ul>
          {allGroups.map((group, index) => (
            <li key={index}>Group Name: {group.name}</li>
          ))}
        </ul>
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

  function CreateEvent() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [newEvent, setNewEvent] = useState("");
  
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
              if(startDate) {
                await saveEvent({ name: newEvent.trim(), id: 0, date: startDate.getTime() });
                setNewEvent("");
              }
            }}
            className="min-w-fit"
          >
            Save the Event
          </Button>
          <div style={{color: "black"}}>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date as Date)}
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
        {!isOpen ? (<></>) : (<><CreateEvent/></>)}
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