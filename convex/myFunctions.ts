import { v } from "convex/values";
import { query, mutation, action, internalAction } from "./_generated/server";
import { api } from "./_generated/api";
import { sendExpiringMessage } from "./messages";

//send Reminder Function
export const SendReminder = internalAction({
  args: {},
  handler: async (ctx) => {
    // Call the sendExpiringMessage function here
    await sendExpiringMessage();
  },
});
