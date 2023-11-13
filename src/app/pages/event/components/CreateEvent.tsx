import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import { add } from "date-fns";
import { start } from "repl";

export default function CreateEvent(props: { groupID: string }) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState("");
  const saveEvent = useMutation(api.event.createNewEvent);
  const addEventToGroup = useMutation(api.group.addEventToGroup);

  const handleCreateEvent = async () => {
    try {
      if (startDate) {
        const savedEvent = await saveEvent({
          name: newEvent.trim(),
          groupID: props.groupID,
          date: startDate.getTime(),
        });

        console.log("Event saved: ", savedEvent);
        // if (savedEvent) {
        //   console.log("props.groupID", props.groupID);
        //   console.log("eventID", savedEvent);
        //   const addEventToGroupResult = await addEventToGroup({
        //     groupID: props.groupID,
        //     eventID: savedEvent,
        //   });

        //   console.log("addEventToGroupResult", addEventToGroupResult);
        // }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
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
          className="min-w-fit"
          onClick={handleCreateEvent}
        >
          Save the Event
        </Button>
        <div style={{ color: "black" }}>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date as Date)}
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
