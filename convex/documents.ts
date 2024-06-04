import { error } from "console";
import {query,mutation} from "./_generated/server";
import {v} from "convex/values";


export const get=query({
    handler:async (ctx)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }
        const document=await ctx.db.query("documents").collect();

        return document;
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