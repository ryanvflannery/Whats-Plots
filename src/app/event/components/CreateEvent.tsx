import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

export default function CreateEvent() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState("");
  const saveEvent = useMutation(api.event.createNewEvent);

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
            if (startDate) {
              await saveEvent({
                name: newEvent.trim(),
                id: 0,
                date: startDate.getTime(),
              });
              setNewEvent("");
            }
          }}
          className="min-w-fit"
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
