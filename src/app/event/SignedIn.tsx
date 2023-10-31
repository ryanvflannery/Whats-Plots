import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
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
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export default function SignedIn() {
  const [isOpen, setIsOpen] = useState(false);
  const events = useQuery(api.myFunctions.getEvents);
  const addUser = useMutation(api.myFunctions.addUser);
  const markEventAsCanAttend = useMutation(
    api.myFunctions.markEventAsCanAttend
  );
  // const markEventAsCantAttend = useMutation(
  //   api.myFunctions.markEventAsCantAttend
  // );
  // const UpcomingEvents = useQuery(api.myFunctions.getUpcomingEvents) || [];
  const [confirmedEvents, setConfirmedEvents] = useState<any>(null);

  const confirmedEventsQuery = useQuery(api.myFunctions.getConfirmedEvents);

  useEffect(() => {
    setConfirmedEvents(confirmedEventsQuery || []);
  }, [confirmedEventsQuery]);

  // const handleNotAttend = (props: any) => {
  //   // console.log("props, ", props);
  //   void markEventAsCantAttend({
  //     eventId: props,
  //   });
  // };

  const handleAttend = (props: any) => {
    // console.log("props, ", props);
    void markEventAsCanAttend({
      eventId: props,
    });
  };

  useEffect(() => {
    void addUser();
  }, []);

  //function that creates a new even

  return (
    <>
      <Tabs defaultValue="upcoming" className="w-[100%]">
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
                attendance.{" "}
                <div className="mt-5">
                  {events?.map(({ _id, name, date }) => (
                    <div key={_id}>
                      <div className="flex flex-row items-start justify-start pb-5">
                        <Card className="p-2">
                          <div className="flex items-center">
                            <div className="m-1">
                              <AiFillCheckCircle
                                onClick={() => handleAttend(_id)}
                                size="25"
                              />
                            </div>
                            {/* <div className="m-1">
                                <AiFillCloseCircle
                                  onClick={() => handleNotAttend(_id)}
                                  size="25"
                                />
                              </div> */}
                          </div>

                          <div className="flex flex-col">
                            <p>{name}</p>
                            <p>{formatDateFromMillis(date)}</p>
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
                <div className="mt-5">
                  {confirmedEvents?.map(({ _id, name, date }) => (
                    <div key={_id}>
                      <div className="flex flex-row items-start justify-start pb-5">
                        <Card className="p-2">
                          <div className="flex flex-col">
                            <p>{name}</p>
                            <p>{formatDateFromMillis(date)}</p>
                          </div>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
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
              <div className="mt-5">
                <div>
                  <div className="flex flex-row items-start justify-start pb-5">
                    <Card className="p-2">
                      <div className="flex flex-col">
                        <p>Shopping</p>
                        <p>October 25, 2023 at 5:00:00 PM</p>
                      </div>
                    </Card>
                  </div>
                  <div>
                    <div className="flex flex-row items-start justify-start pb-5">
                      <Card className="p-2">
                        <div className="flex flex-col">
                          <p>Picnic</p>
                          <p>October 15, 2023 at 8:00:00 PM</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row items-start justify-start pb-5">
                      <Card className="p-2">
                        <div className="flex flex-col">
                          <p>Franks Birthday</p>
                          <p>October 6, 2023 at 9:00:00 AM</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row items-start justify-start pb-5">
                      <Card className="p-2">
                        <div className="flex flex-col">
                          <p>Picnic</p>
                          <p>August 26, 2023 at 11:00:00 AM</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
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
