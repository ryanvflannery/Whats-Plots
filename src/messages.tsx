// import { mutation, internalMutation } from "./_generated/server";
// import { internal } from "./_generated/api";
// import { v } from "convex/values";

// export const sendExpiringMessage = mutation({
//   args: { body: v.string(), author: v.string() },
//   handler: async (ctx, args) => {
//     const { body, author } = args;
//     const id = await ctx.db.insert("messages", { body, author });
//     await ctx.scheduler.runAfter(5000, internal.messages.destruct, {
//       messageId: id,
//     });
//   },
// });

// export const destruct = internalMutation({
//   args: {
//     messageId: v.id("messages"),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.delete(args.messageId);
//   },
// });
