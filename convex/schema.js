import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    userTable: defineTable({
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    }).index("by_email", ["email"]) 
})
