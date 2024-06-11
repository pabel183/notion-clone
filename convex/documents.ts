import { error } from "console";
import {query,mutation} from "./_generated/server";
import {v} from "convex/values";


export const getSidebar=query({
    args:{
        parentDocument:v.optional(v.id("documents"))
    },

    handler:async(ctx,arg)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Not authenticated");
        const userId=identity.subject;

        const documents=await ctx.db.query("documents")
        .withIndex("by_user_parent", (q)=>
            q
                .eq("userId",userId)
                .eq("parentDocument",arg.parentDocument)
        )
        .filter((q)=>
        q.eq(q.field("isArchived"),false)
        )
        .order("desc")
        .collect();
        return documents;
    }
})

export const create=mutation({
    args:{
        title:v.string(),
        parentDcoument:v.optional(v.id("documents"))
    },

    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }
        const userId=identity.subject;

        const document=await ctx.db.insert("documents",{
            title:args.title,
            userId,
            parentDocument:args.parentDcoument,
            isArchived:false,
            isPublised:false,
        })

        return document;
    }
})