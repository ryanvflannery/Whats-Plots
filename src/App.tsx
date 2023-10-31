import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import GroupComponent from "./app/group/GroupComponent";
import LandingPage from "./app/landingpage/LandingPage";

export default function App() {
  return (
    <>
      <Authenticated>
        <NavBar />
        <GroupComponent></GroupComponent>
      </Authenticated>
      <Unauthenticated>
        <SignInButton></SignInButton>
        <LandingPage></LandingPage>
      </Unauthenticated>
    </>
  );
}

function NavBar() {
  return (
    <div className="p-10 mb-5">
      <UserButton afterSignOutUrl="#" />
    </div>
  );
}
