"use client";

import { ElementRef, useRef, useState } from "react";

import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Image, Smile, X } from "lucide-react";
import TextareaAutoSize from "react-textarea-autosize";

import { useCoverImage } from "@/hooks/use-cover-image";
import IconPicker from "./icon-picker";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ToolbarProps{
    initialData:Doc<"documents">;
    preview?:boolean;
}

const Toolbar=({
    initialData,
    preview,
}:ToolbarProps)=>{
    const inputRef=useRef<ElementRef<"textarea">>(null);
    const [isEditing,setIsEditing]=useState(false);
    const [value,setValue]=useState(initialData.title);

    const coverImage=useCoverImage();
    const update=useMutation(api.documents.update);
    const removeIcon=useMutation(api.documents.removeIcon);

    const enableInput=()=>{
        if(preview) return;

        setIsEditing(true);
        setTimeout(()=>{
            setValue(initialData.title);
            inputRef.current?.focus();
        },0);
    }
    const disableInput=()=>setIsEditing(false);

    const onKeyDown=(event:React.KeyboardEvent<HTMLTextAreaElement>)=>{
        if(event.key==="Enter"){
            event.preventDefault();
            disableInput();
        }
    }
    const onChange=(value:string)=>{
            setValue(value);
            update({id:initialData._id,title:value || "Untitle"});
    }
    const onIconSelect=(icon:string)=>{
        update({id:initialData._id,icon:icon})
    }
    const onRemoveIcon=()=>{
        removeIcon({id:initialData._id});
    }

    return(
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className=" flex items-center group/icon gap-x-2 pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-3xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                    <Button 
                    onClick={onRemoveIcon}
                    className="
                    opacity-0 
                    group-hover/icon:opacity-100
                    rounded-full
                    transition
                    text-muted-foreground
                    text-xs
                    "
                    variant="outline"
                    size="icon"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">{initialData.icon}</p>
            )}
            <div className="
            flex 
            items-center 
            opacity-0
            group-hover:opacity-100
            gap-x-1
            py-4
            ">
                {!initialData.icon && !preview && (
                    <IconPicker onChange={onIconSelect} asChild>
                        <Button className="
                        text-muted-foreground text-xs
                        "
                        variant="outline"
                        size="sm"
                        >
                            <Smile className="h-4 w-4 mr-2"/>
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {!initialData.coverImage && !preview && (
                    <Button onClick={coverImage.onOpen}
                    className="
                    text-muted-foreground text-xs
                    "
                    variant="outline"
                    size="sm"
                    >
                        <Image className="h-4 w-4 mr-2"/>
                        Add cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutoSize
                ref={inputRef}
                onBlur={disableInput}
                onKeyDown={onKeyDown}
                onChange={(event)=>onChange(event.target.value)}
                value={value}
                className="
                text-5xl
                font-bold
                bg-transparent 
                outline-none 
                break-words 
                text-[#3F3F3F]
                dark:text-[#CFCFCF]
                resize-none
                "
                />
            ):(
                <Button
                onClick={enableInput}
                variant="ghost"
                size="lg"
                className="
                pb-[11.5px]
                text-5xl 
                font-bold 
                break-words 
                outline-none
                text-[#3F3F3F]
                dark:text-[#CFCFCF]
                "
                >
                    {initialData.title}
                </Button>
            )}
        </div>
    )
}

export default Toolbar;