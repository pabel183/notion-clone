"use client";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";

import { Dialog,DialogContent,DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import {SingleImageDropzone} from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const CoverImageModal=()=>{
    const params=useParams();
    const update=useMutation(api.documents.update);
    const coverImage=useCoverImage();
    const [file,setFile]=useState<File>();
    const [isEditing,setIsEditing]=useState(false);
    const {edgestore}=useEdgeStore();

    const onClose=()=>{
        setFile(undefined);
        setIsEditing(false);
        coverImage.onClose();
    }

    const onChange=async(file?:File)=>{
        if(file){
            setIsEditing(true);
            setFile(file);      
            const res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                      replaceTargetUrl: coverImage.url,
                    },
                  });
           
            await update({
                id:params.documentId as Id<"documents">,
                coverImage:res.url,
            })
            onClose();
        }
    }
    
    return(
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2>
                        Cover Image
                    </h2>
                </DialogHeader>
                <div>
                    <SingleImageDropzone 
                    disabled={isEditing}
                    value={file}
                    onChange={onChange}
                    className="w-full outline-none"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default CoverImageModal;