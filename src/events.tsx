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

//Edit Event
export const EditEvent = mutation({
    args: { id: v.id("edit") },
    handler: async (ctx, args) => {
      const { id } = args;
      console.log(await ctx.db.get(id));
      // { text: "foo", status: { done: true }, _id: ... }
  
      // Add `tag` and overwrite `status`:
      await ctx.db.patch(id, { tag: "bar", status: { archived: true } });
      console.log(await ctx.db.get(id));
      // { text: "foo", tag: "bar", status: { archived: true }, _id: ... }
  
      // Unset `tag` by setting it to `undefined`
      await ctx.db.patch(id, { tag: undefined });
      console.log(await ctx.db.get(id));
      // { text: "foo", status: { archived: true }, _id: ... }
    },
  });

  //Removing Event
export const DeleteEvents = mutation({
    args: { id: v.id("events") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
  });

