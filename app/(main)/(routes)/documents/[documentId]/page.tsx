"use client";

import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
interface DocumentIdPageProps{
    params:{
        documentId:Id<"documents">;
    }
}

const DocumentIdPage=({params}:DocumentIdPageProps)=>{
    const document=useQuery(api.documents.getById,{documentId:params.documentId})
    const update=useMutation(api.documents.update);
    const onChange=(value:string)=>{
        update({
            id:params.documentId as Id<"documents">,
            content:value,
        })
    }
    if(document===undefined){
        return(
            <div>
                <Cover.Skelaton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <Skeleton className="h-14 w-[50%]"/>
                    <Skeleton className="h-4 w-[80%]"/>
                    <Skeleton className="h-4 w-[40%]"/>
                    <Skeleton className="h-4 w-[60%]"/>
                </div>
            </div>
        );
    }
    if(document===null){
        return null;
    }
    return(
        <div className="pb-40">
            <Cover url={document.coverImage}/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
            <Toolbar initialData={document} />
            </div>
            <Editor onChange={onChange} initialContent={document.content}/>
        </div>
    );
}

export default DocumentIdPage;