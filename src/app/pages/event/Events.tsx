import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateEvent from "./components/CreateEvent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

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

export default function Events(props: { group: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const events = useQuery(api.event.getEventsInGroup, {
    groupID: props.group._id,
  });
  const addUser = useMutation(api.group.addUser);
  const markEventAsCanAttend = useMutation(api.event.markEventAsCanAttend);
  const markEventAsCantAttend = useMutation(api.event.markEventAsCantAttend);
  // const UpcomingEvents = useQuery(api.event.getUpcomingEvents) || [];

  useEffect(() => {
    void addUser();
  }, []);

  //function that creates a new even

  return (
    <>
      {/* <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-4 gap-4 ">
          <h1>{props.group.name}</>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed </TabsTrigger>
          <TabsTrigger value="past">Past </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>
                Upcoming Events Will Appear Here. Click on an event to confirm
                attendance.{" "}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 p-2.5">
                  {events
                    ?.filter((event) => event.canAttend === null)
                    .map(({ _id, name, date }) => (
                      <Card
                        key={_id}
                        className="flex flex-col text-center rounded-md"
                      >
                        <div className="flex gap-4 m-2.5">
                          <Avatar className="w-5 h-5">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                        <h1 className="text-lg">{name}</h1>
                        <p className="flex text-left text-md text-muted-foreground m-2.5">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.Lorem ipsum dolor sit amet consectetur
                          adipisicing elit.Lorem ipsum dolor sit amet
                          consectetur adipisicing elit.
                        </p>
                        <p className="mb-5 mt-5 text-md">
                          {formatDateFromMillis(date)}
                        </p>
                        <div className="m-5 grid grid-cols-2 lg:grid-cols-2 gap-5">
                          <Button
                            onClick={() =>
                              void markEventAsCanAttend({
                                eventId: _id,
                              })
                            }
                          >
                            Confirm
                          </Button>
                          <Button
                            onClick={() =>
                              void markEventAsCantAttend({
                                eventId: _id,
                              })
                            }
                          >
                            Deny
                          </Button>
                        </div>
                      </Card>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 p-2.5">
                  {events
                    ?.filter((event) => event.canAttend == true)
                    .map(({ _id, name, date }) => (
                      <Card
                        key={_id}
                        className="flex flex-col text-center rounded-md"
                      >
                        <div className="flex gap-4 m-2.5">
                          <Avatar className="w-5 h-5">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                        <h1 className="text-lg">{name}</h1>
                        <p className="flex text-left text-md text-muted-foreground m-2.5">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.Lorem ipsum dolor sit amet consectetur
                          adipisicing elit.Lorem ipsum dolor sit amet
                          consectetur adipisicing elit.
                        </p>
                        <p className="mb-5 mt-5 text-md">
                          {formatDateFromMillis(date)}
                        </p>
                      </Card>
                    ))}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
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
            <CardContent className="space-y-2"></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs> */}

      {/* CREATE EVENT */}
      {/* <div className="mt-2">
        {!isOpen ? (
          <></>
        ) : (
          <>
            <CreateEvent groupID={props.group._id} />
          </>
        )}
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Create Event"}
        </Button>
      </div> */}
    </>
  );
}
