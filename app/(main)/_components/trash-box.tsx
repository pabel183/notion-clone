"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Spinner } from "@/components/spinner";
import ConfirmModel from "@/components/model/confirm-model";

const TrashBox=()=>{
    const params=useParams();
    const router=useRouter();
    const documents=useQuery(api.documents.getTrash);
    const restore=useMutation(api.documents.restore);
    const remove=useMutation(api.documents.rmove);
    const [search,setSearch]=useState("");

    const filterDocuments=documents?.filter((document)=>{
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick=(documentId:Id<"documents">)=>{
        router.push(`/documents/${documentId}`)
    }

    const onRestore=(
        event:React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId:Id<"documents">
    )=>{
        event.stopPropagation();
        const promise=restore({id:documentId});
        toast.promise(promise,{
            loading:"Restoring note...",
            success:"Note restored.",
            error:"Failed to restore note."
        })    
    }

    const onRemove=(
        documentId:Id<"documents">
    )=>{
        const promise=remove({id:documentId});
        toast.promise(promise,{
            loading:"Removing note...",
            success:"Note removed.",
            error:"Failed to remove note."
        })    
        
        if(params.documentId===documentId){
            router.push("/documents")
        }
    }

    if(documents===undefined){
        return(
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg"/>
            </div>
        )
    }

    return(
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
            <Search className="h-4 w-4"/>
            <Input 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
            placeholder="Filter by page title..."
            />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="
                hidden last:block text-xs text-center text-muted-foreground pb-2
                ">No document found</p>
                {filterDocuments?.map((document)=>(
                    <div 
                    key={document._id}
                    role="button"
                    onClick={()=>onClick(document._id)}
                    className="
                    text-sm rounded-sm flex items-center 
                    hover:bg-primary/5 text-primary
                    w-full justify-between
                    ">
                        <span className="truncate pl-2">{document.title}</span>
                        <div className="flex items-center">
                            <div
                            onClick={(e)=>onRestore(e,document._id)}
                            role="button"
                            className="
                            rounded-sm
                            p-2
                            hover:bg-neutral-200
                            dark:hover:bg-neutral-600
                            ">
                                <Undo className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            <ConfirmModel onConfirm={()=>onRemove(document._id)}>
                            <div className="
                            rounded-sm
                            p-2 
                            hover:bg-neutral-200
                            dark:hover:bg-neutral-600
                             ">
                                <Trash className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            </ConfirmModel>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrashBox;