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

export default function App() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [groupName, setGroupName] = useState("");

  // const [groupMemberEmail, setGroupMemberEmail] = useState("");
  // const [groupMembersAdded, setGroupMembersAdded] = useState<string[]>([]);

  const createGroup = useMutation(api.myFunctions.createNewGroup);
  const GetAllGroupsForUser = useMutation(api.myFunctions.getAllGroupsForUser);

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

  const handleGetAllGroupsForUser = () => {
    void GetAllGroupsForUser();
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
        {/* <Input
          value={groupMemberEmail}
          onChange={handleGroupMemberChange}
          placeholder="Add group member by email"
        ></Input>
        <Button
          onClick={() => {
            setGroupMembersAdded([...groupMembersAdded, groupMemberEmail]);
          }}
        >
          Add Group Member
        </Button>
        <p>Group Members Added:</p> */}

        <Button onClick={handleCreateGroup}>create new group</Button>
        <h1>groups</h1>
        <Button onClick={handleGetAllGroupsForUser}>
          Get all groups for user call
        </Button>
      </Authenticated>
      2
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

// Hello, user_2XN7QfLhJ59BwroHaq7PLzEpGsd your current active session is sess_2XNJ9gUkNTM3wocshpzyEtbT685

function SignedIn() {
  const addUser = useMutation(api.myFunctions.addUser);

  useEffect(() => {
    void addUser();
  }, []);

  const { numbers, viewer } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};

  const addNumber = useMutation(api.myFunctions.addNumber);

  return (
    <>
      <p className="flex gap-4 items-center">
        This is you:
        <UserButton afterSignOutUrl="#" />
      </p>

      <p>Add a random number</p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : numbers?.join(", ") ?? "..."}
      </p>
    </>
  );
}
