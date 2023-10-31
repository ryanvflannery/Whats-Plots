import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import GroupComponent from "./app/group/GroupComponent";

export default function App() {
  return (
    <>
      <Authenticated>
        <NavBar />
        <GroupComponent></GroupComponent>
      </Authenticated>

      <Unauthenticated>
        <SignInButton></SignInButton>
      </Unauthenticated>
    </>
  );
}

function NavBar() {
  return (
    <>
      <div className="mb-5">
        <nav className="bg-white-800 text-white p-10">
          <ul className="flex justify-between">
            <UserButton afterSignOutUrl="#" />
            <div className="ml-auto"></div>
          </ul>
        </nav>
      </div>
    </>
  );
}
