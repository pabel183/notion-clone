"use client";

import ConfirmModel from "@/components/model/confirm-model";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps{
    documentId:Id<"documents">;
}
const Banner=({documentId}:BannerProps)=>{
    const router=useRouter();
    const restore=useMutation(api.documents.restore);
    const remove=useMutation(api.documents.rmove);

    const onRestore=()=>{
        const promise=restore({id:documentId});
        toast.promise(promise,{
            loading:"Restoring note...",
            success:"Note restored!",
            error:"Failed to restore note.",
        })
    }
    const onRemove=()=>{
        const promise=remove({id:documentId});
        toast.promise(promise,{
            loading:"Deleting note...",
            success:"Note deleted!",
            error:"Failed to delete note.",
        })
        router.push("/documents");
    }
    return(
        <div className="
        w-full
        flex 
        bg-rose-500 
        items-center 
        gap-x-2 
        text-center 
        text-white
        hover:text-white
        justify-center
        text-sm
        p-2
        height-auto
        ">
            <p>
                This page is in the Trash.
            </p>
            <Button onClick={onRestore} size="sm" variant="outline" className="
            border-white 
            bg-transparent
            hover:text-white
            hover:bg-primary/5
            text-white
            p-1
            px-2
            h-auto
            font-normal
            ">
                Restore page
            </Button>
            <ConfirmModel onConfirm={onRemove}>
            <Button size="sm" variant="outline" className="
            border-white 
            bg-transparent
            hover:text-white
            hover:bg-primary/5
            text-white
            p-1
            px-2
            h-auto
            font-normal
            ">
                Delete forever
            </Button> 
            </ConfirmModel>
        </div>
    );
}
export default Banner;