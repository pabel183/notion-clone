import { title } from "process";
import { Doc, Id } from "./_generated/dataModel";
import {query,mutation} from "./_generated/server";
import {v} from "convex/values";

export const archive=mutation({
    args:{ id:v.id("documents")},
    handler:async(ctx, args)=>{
        const identity=await ctx.auth.getUserIdentity();

        if(!identity) throw new Error("Not authenticated");

        const userId=identity.subject;

        const existingDocument=await ctx.db.get(args.id);
        if(!existingDocument){
            throw new Error("Not found");
        }
        if(existingDocument.userId!==userId){
            throw new Error("Unauthenticated!")
        }
        
        const recursiveArchive=async(documentId:Id<"documents">)=>{
            const children=await ctx.db
            .query("documents")
            .withIndex("by_user_parent",(q)=>(
            q
            .eq("userId",userId)
            .eq("parentDocument",documentId)
            ))
            .collect();

            for(const child of children){
                await ctx.db.patch(child._id,{
                    isArchived:true
                })
                await recursiveArchive(child._id);
            }
        }
        
        const document=await ctx.db.patch(args.id,{isArchived:true});
        recursiveArchive(args.id);
        return document;
    }
})

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
            isPublished:false,
        })

        return document;
    }
});
export const getTrash=query({
    handler:async(ctx)=>{
        const identity=await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }

        const userId=identity.subject;

        const document=await ctx.db.query("documents")
        .withIndex("by_user",(q)=>(
            q.eq("userId",userId)
        )
        )
        .filter((q)=>(
            q.eq(q.field("isArchived"),true)
        ))
        .order("desc")
        .collect();

        return document;
    }
})
export const restore=mutation({
    args:{id:v.id("documents")},
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }
        const userId=identity.subject;

        const existingDocument=await ctx.db.get(args.id);

        if(!existingDocument){
            throw new Error("Not found");
        }

        if(existingDocument.userId!==userId){
            throw new Error("Unauthorized");
        }

        const option:Partial<Doc<"documents">>={
            isArchived:false
        }

        const recusiveRestore=async(documentId:Id<"documents">)=>{
            const children=await ctx.db.query("documents")
            .withIndex("by_user_parent", (q)=>(
                q
                .eq("userId",userId)
                .eq("parentDocument",documentId)
            ))
            .filter((q)=>(q.eq(q.field("isArchived"),true)))
            .collect();
            for(const child of children){
                await ctx.db.patch(child._id,{
                    isArchived:false
                });
                await recusiveRestore(child._id);
            }
        }

        if(existingDocument.parentDocument){
            const parent=await ctx.db.get(existingDocument.parentDocument);
            if(parent?.isArchived){
            option.parentDocument=undefined;
            }
        }

        const document=await ctx.db.patch(args.id,option);
        recusiveRestore(args.id);
        return document;
    }
})
export const rmove=mutation({
    args:{id:v.id("documents")},
    handler:async(ctx, args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }
        const userId=identity.subject;
        const existingDocument=await ctx.db.get(args.id);

        if(!existingDocument){
            throw new Error("Not found");
        }
        if(existingDocument.userId!==userId){
            throw new Error("Unauthorized");
        }
        const document=await ctx.db.delete(args.id);

        return document;
    }
})

export const getSearch=query({
    handler:async(ctx)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("no authenticated");
        
        const userId=identity.subject;

        const documents=await ctx.db.query("documents")
        .withIndex("by_user",(q)=>(
            q.eq("userId",userId)
        ))
        .filter((q)=> q.eq(q.field("isArchived"),false ))
        .order("desc")
        .collect();
        
        return documents;
    }
});

export const getById=query({
    args:{documentId:v.id("documents")},
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        
        const document=await ctx.db.get(args.documentId);
        
        if(!document){
            throw new Error("Not found");
        }
        if(document.isPublished && !document.isArchived){
            return document;
        }
        if(!identity) {
            throw new Error("Not authenticated");
        }

        const userId=identity.subject;
        if(document.userId!==userId){
            throw new Error("Unauthorized");
        }
        return document;
    }
})

export const update=mutation({
    args:{id:v.id("documents"),
        title:v.optional(v.string()),
        content:v.optional(v.string()),
        coverImage:v.optional(v.string()),
        icon:v.optional(v.string()),
        isPublished:v.optional(v.boolean()),
    },
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }
        const {id,...rest}=args;
        const existingDocument=await ctx.db.get(id);
        if(!existingDocument){
            throw new Error("Not found");
        }
        const userId=identity.subject;
        if(existingDocument.userId!==userId){
            throw new Error("Unauthenticated");
        }
        const document=await ctx.db.patch(args.id,{...rest});

        return document;
    }
});

export const removeIcon=mutation({
    args:{id:v.id("documents")},
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated.");
        }
        const userId=identity.subject;

        const existingDocument=await ctx.db.get(args.id);
        if(!existingDocument){
            throw new Error("Not found");
        }
        if(existingDocument.userId!==userId){
            throw new Error("Unauthenticated");
        }
        const document=await ctx.db.patch(args.id,{
            icon:undefined,
        })

        return document;
    }
});

export const removeCoverImage=mutation({
    args:{
        id:v.id("documents"),
    },
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        } 
        const existingDocument=await ctx.db.get(args.id)
        if(!existingDocument){
            throw new Error("Not found");
        }
        const userId=identity.subject;
        if(existingDocument.userId!==userId){
            throw new Error("Unauthenticated");
        }
        const document=await ctx.db.patch(args.id,{
            coverImage:undefined
        });
        return document;
    }
});