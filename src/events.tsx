import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, ChangeEvent } from "react";


function CreateEvent() {
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
            disabled={!newEvent}
            title={
              newEvent
                ? "Save your event to the database"
                : "You must enter an event first"
            }
            onClick={async () => {
              await saveEvent({ name: newEvent.trim(), id: 0, date: Date.now() });
              setNewEvent("");
            }}
            className="min-w-fit"
          >
            Save the Event
          </Button>
        </div>
      </>
    );
  }

  function EditEvent(){

    
  }


