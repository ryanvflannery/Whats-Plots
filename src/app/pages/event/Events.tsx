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
import { getGroupByID } from "convex/group";
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

export default function Events(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const events = useQuery(api.event.getEvents);
  const addUser = useMutation(api.group.addUser);
  const markEventAsCanAttend = useMutation(api.event.markEventAsCanAttend);
  const markEventAsCantAttend = useMutation(api.event.markEventAsCantAttend);

  // const UpcomingEvents = useQuery(api.event.getUpcomingEvents) || [];
  const [confirmedEvents, setConfirmedEvents] = useState<any>(null);

  const confirmedEventsQuery = useQuery(api.event.getConfirmedEvents);

  useEffect(() => {
    // const g = await getGroupByID({ groupID: props.group_id });
  });
  // useEffect(() => {
  //   setConfirmedEvents(confirmedEventsQuery || []);
  // }, [confirmedEventsQuery]);

  // const handleNotAttend = (props: any) => {
  //   // console.log("props, ", props);
  //   void markEventAsCantAttend({
  //     eventId: props,
  //   });
  // };

  useEffect(() => {
    void addUser();
  }, []);

  //function that creates a new even

  return (
    <>
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
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
                          {/* <div className="bg-gray-50 h-10 w-10 flex items-center justify-center">
                            <p>d</p>
                          </div>
                          <div className="bg-white h-10 w-10 flex items-center justify-center">
                            <p>d</p>
                          </div>
                          <div className="bg-white h-10 w-10 flex items-center justify-center">
                            <p>d</p>
                          </div>
                          <div className="bg-white h-10 w-10 flex items-center justify-center">
                            <p>d</p>
                          </div> */}
                        </div>

                        {/* <div
                          className="w-full bg-cover bg-center opacity-50"
                          style={{
                            backgroundImage: `url(https://randompicturegenerator.com/img/national-park-generator/gafcf50a35932f2f891a05a6ab56b9d2f9604880cb201c8e34222d6afdc01ba0483c80fa80a805cfe779c84f8d2d71002_640.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div> */}
                      </Card>
                    ))}
                  {/* <Card className="h-40 rounded-md">Box 1</Card>
                  <Card className=" h-40 rounded-md">Box 1</Card>
                  <Card className=" h-40 rounded-md">Box 1</Card>
                  <Card className=" h-40 rounded-md">Box 1</Card>
                  <Card className=" h-40 rounded-md">Box 1</Card> */}
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

                        {/* <div
                          className="w-full bg-cover bg-center opacity-50"
                          style={{
                            backgroundImage: `url(https://randompicturegenerator.com/img/national-park-generator/gafcf50a35932f2f891a05a6ab56b9d2f9604880cb201c8e34222d6afdc01ba0483c80fa80a805cfe779c84f8d2d71002_640.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div> */}
                      </Card>
                    ))}
                  {/* <Card className="h-40 rounded-md">Box 1</Card>
                  <Card className=" h-40 rounded-md">Box 1</Card>
                  <Card className=" h-40 rounded-md">Box 1</Card>
                  <Card className=" h-40 rounded-md">Box 1</Card>
                  <Card className=" h-40 rounded-md">Box 1</Card> */}
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
              {/* <div className="mt-5">
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
              </div> */}
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

// Upcoming Events
// <div className="mt-5">
// {events?.map(({ _id, name, date }) => (
//   <div key={_id}>
//     <div className="flex flex-row items-start justify-start pb-5">
//       <Card className="p-2">
//         <div className="flex items-center">
//           <div className="m-1">
//             <AiFillCheckCircle
//               onClick={() => handleAttend(_id)}
//               size="25"
//             />
//           </div>
//           {/* <div className="m-1">
//               <AiFillCloseCircle
//                 onClick={() => handleNotAttend(_id)}
//                 size="25"
//               />
//             </div> */}
//         </div>

//         <div className="flex flex-col">
//           <p>{name}</p>
//           <p>{formatDateFromMillis(date)}</p>
//         </div>
//       </Card>
//     </div>
//   </div>
// ))}
// </div>
