import { v } from "convex/values";
import { query, mutation, action, internalAction } from "./_generated/server";
import { api } from "./_generated/api";
import { sendExpiringMessage } from "./messages";

//query for events in a group
export const getEventsInGroup = query({
  args: {
    groupID: v.string(),
  },
  handler: async (ctx, args: { groupID: string }) => {
    if (args.groupID) {
      const events = await ctx.db
        .query("events")
        .filter((q) => q.eq(q.field("groupID"), args.groupID))
        .collect();
      return events;
    }
  },
});

//Removing Event
export const DeleteEvents = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

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

// Define a function to mark the event as "Can attend"
export const markEventAsCanAttend = mutation({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    // Set the CanAttend column to true for the specified event
    const test = await ctx.db.patch(args.eventId, { canAttend: true });

    console.log("markeventasCanAttend", test);
  },
});

export const markEventAsCantAttend = mutation({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    // Set the CantAttend column to true for the specified event
    const test = await ctx.db.patch(args.eventId, { canAttend: false });
  },
});

export const getConfirmedEvents = query({
  args: {},
  handler: async (ctx, args) => {
    try {
      const events = await ctx.db.query("events").collect();

      const eventsByAttend = events.filter((event) => {
        return event.CanAttend == true;
      });

      console.log("events:", eventsByAttend);

      return eventsByAttend;
    } catch (error) {
      console.error("Error in getUpcomingEvents:", error);
      return []; // Return an empty array or handle the error as needed
    }
  },
});

export const getUpcomingEvents = query({
  args: {},
  handler: async (ctx, args) => {
    try {
      const events = await ctx.db.query("groups").collect();

      const eventsByAttend = events.filter((event) => {
        return event;
      });

      console.log("events:", eventsByAttend);

      return eventsByAttend;
    } catch (error) {
      console.error("Error in getUpcomingEvents:", error);
      return []; // Return an empty array or handle the error as needed
    }
  },
});

//Probably not working yet:
//creating a new event
export const createNewEvent = mutation({
  args: {
    name: v.string(),
    groupID: v.string(),
    date: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (user) {
      // const randomID = generateRandomID();
      const taskId = await ctx.db.insert("events", {
        name: args.name,
        canAttend: null,
        groupID: args.groupID,
        // id: randomID,
        //the value args.date is def wrong
        date: args.date,
      });
      return taskId;
    }
  },
});
