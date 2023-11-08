import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import Group from "./app/pages/group/Group";
import LandingPage from "./app/pages/landingpage/LandingPage";

export default function App() {
  return (
    <>
      <Authenticated>
        <NavBar />
        <Group></Group>
      </Authenticated>
      <Unauthenticated>
        <LandingPage></LandingPage>
      </Unauthenticated>
    </>
  );
}

function NavBar() {
  return (
    <div className="m-10">
      <UserButton afterSignOutUrl="#" />
    </div>
  );
}
