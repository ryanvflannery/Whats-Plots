import { v } from "convex/values";
import { query, mutation, action, internalAction } from "./_generated/server";
import { api } from "./_generated/api";
import { sendExpiringMessage } from "./messages";

// add a new user to convex database once logged in
export const addUser = mutation({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (user) {
      const userQuery = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("id"), user.subject))
        .take(1);

      const taskId = await ctx.db.insert("users", {
        name: user.name,
        email: user.email,
        id: user.subject,
      });
    }
  },
});

// create a new group, add an array of user ids to the group
export const createNewGroup = mutation({
  args: {
    name: v.string(),
    groupMembers: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    // const userQuery = await ctx.db
    //   .query("users")
    //   .filter((q) => q.eq(q.field("id"), user?.subject))
    //   .take(1);

    if (user) {
      const taskId = await ctx.db.insert("groups", {
        name: args.name,
        groupMembers: [user.email],
      });
    }
  },
});

// not working yet:
// create a new group, add an array of user ids to the group
export const getAllGroupsForUser = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    // const userQuery = await ctx.db
    //   .query("users")
    //   .filter((q) => q.eq(q.field("id"), user?.subject))
    //   .take(1);
    const groups = await ctx.db.query("groups").collect();

    const groupsUserIsIn = groups.filter((group) => {
      return group.groupMembers.includes(user?.email);
    });

    // console.log("Groups: ", groups);

    return groupsUserIsIn;
  },
});

export const getEventsInGroupByID = query({
  args: {
    groupID: v.string(),
  },
  handler: async (ctx, args: { groupID: string }) => {
    if (args.groupID) {
      const groups = await ctx.db
        .query("groups")
        .filter((q) => q.eq(q.field("_id"), args.groupID))
        .collect();

      if (groups.length > 0) {
        return groups[0].events;
      }
    }
  },
});

//adding member to existing group
export const addMemberToGroup = mutation({
  args: {
    groupID: v.string(),
    userID: v.string(),
  },
  handler: async (ctx, args) => {
    const groupSelection = await ctx.db
      .query("groups")
      .filter((q) => q.eq(q.field("_id"), args.groupID))
      .first();

    // console.log("group Selection: ", groupSelection);
    groupSelection.groupMembers.push(args.userID);
    ctx.db.replace(groupSelection._id, groupSelection);
  },
});

export const removeUserFromGroup = mutation({
  args: {
    groupID: v.string(),
    userID: v.string(),
  },
  handler: async (ctx, args) => {
    const groupSelection = await ctx.db
      .query("groups")
      .filter((q) => q.eq(q.field("_id"), args.groupID))
      .first();

    // console.log("group Selection BEFORE: ", groupSelection);

    groupSelection.groupMembers = groupSelection.groupMembers.filter(
      (element: string) => element !== args.userID
    );

    ctx.db.replace(groupSelection._id, groupSelection);

    // console.log("After Remove: ", groupSelection);
  },
});

//send Reminder Function
export const SendReminder = internalAction({
  args: {},
  handler: async (ctx) => {
    // Call the sendExpiringMessage function here
    await sendExpiringMessage();
  },
});

export const deleteGroup = mutation({
  args: {
    groupID: v.string(), // the ID of the group to delete
  },
  handler: async (ctx, args) => {
    // Fetch the group by ID
    console.log("group ID: " + args.groupID);
    const groupSelection = await ctx.db
      .query("groups")
      .filter((q) => q.eq(q.field("_id"), args.groupID))
      .first();

    // Check if the group exists
    console.log("group Selection: " + groupSelection);

    if (groupSelection) {
      // Delete the group from the database
      await ctx.db.delete(groupSelection._id);
      console.log("Group deleted:", groupSelection._id);
    } else {
      console.log("Group not found:", args.groupID);
    }
  },
});

export const addEventToGroup = mutation({
  args: {
    groupID: v.string(),
    eventID: v.string(),
  },
  handler: async (ctx, args) => {
    const groupSelection = await ctx.db
      .query("groups")
      .filter((q) => q.eq(q.field("_id"), args.groupID))
      .first();

    // console.log("group Selection: ", groupSelection);
    groupSelection.events.push(args.eventID);
    ctx.db.replace(groupSelection._id, groupSelection);
  },
});

export const getGroupByID = query({
  args: {
    groupID: v.string(),
  },
  handler: async (ctx, args: { groupID: string }) => {
    if (args.groupID) {
      const groups = await ctx.db
        .query("groups")
        .filter((q) => q.eq(q.field("_id"), args.groupID))
        .collect();

      return groups;
    }
  },
});
