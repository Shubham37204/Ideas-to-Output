import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    }, 
    handler: async (ctx, args) => {
        // Check if user already exists
        const existingUser = await ctx.db
            .query('userTable')
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existingUser) {
            return existingUser;
        }

        // Create new user
        const userData = {
            name: args.name,
            email: args.email,
            imageUrl: args.imageUrl
        }
        
        const userId = await ctx.db.insert("userTable", userData);
        
        // Return the newly created user
        return {
            _id: userId,
            ...userData
        };
    }
})
