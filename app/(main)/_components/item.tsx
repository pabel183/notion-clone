"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, Icon, LucideIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ItemProps{
    id?:Id<"documents">;
    documentIcon?:string;
    active?:boolean;
    expanded?:boolean;
    isSearch?:boolean;
    level?:number;
    onExpand?:()=>void;
    onClick:()=>void;
    label:string;
    icon:LucideIcon
}
const Item=({
        id,
        documentIcon,
        active,
        expanded,
        isSearch,
        level=0,
        onExpand,
        onClick,
        label,
        icon:Icon
    }:ItemProps)=>{
    const router=useRouter();
    const creat=useMutation(api.documents.create);

    const ChevronIcon=expanded?ChevronDown:ChevronRight;

    const handleExapand=(
        event:React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate=(
        event:React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation();

        if(!id) return;

        const promise=creat({title:"untitile",parentDcoument:id})
        .then((documentId)=>{
            if(!expanded){
                onExpand?.();
            }
        //    router.push(`/documents/${documentId}`) 
        }
        )
        toast.promise(promise,{
            loading:"Creating new note...",
            success:"New note is created",
            error:"Failed to create a new note!"
        });
    }

    return(
        <div 
        onClick={onClick} 
        style={{paddingLeft:level?`${(12*level)+12}px`:"12px"}}
        className={cn(`
        group 
        flex 
        min-h-[27px] 
        hover:bg-primary/5 
        items-center 
        text-sm 
        text-muted-foreground
        font-medium
        w-full
        py-1
        pr-3
        `,
        active && "bg-primary/5 text-primary"
        )}
        >
            {!!id && (
                <div
                role="button"
                onClick={handleExapand}
                className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1 ">
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50"/>
                </div>
            )}
            {documentIcon?(
                <div className="text-[18px] shrink-0 mr-2">
                    {documentIcon}
                </div>
            ):(
                <Icon className="h-[18px] text-muted-foreground shrink-0 mr-2"/>
            )
            }
            <span className="truncate">{label}</span>
            {
                isSearch && (
                    <kbd className="
                    ml-auto 
                    text-muted-foreground 
                    inline-flex 
                    select-none
                    h-5
                    px-1.5
                    font-medium
                    pointer-events-none
                    gap-1
                    rounded
                    border
                    bg-muted
                    text-[10px]
                    opacity-100
                    ">
                        <span className="text-xs">x</span>K
                    </kbd>
                )
            }
            {!!id && 
                <div className="flex gap-x-2 ml-auto">
                    <div 
                    role="button"
                    onClick={onCreate}
                    className="
                    opacity-0 group-hover:opacity-100 ml-auto h-full
                    bg-neutral-300 dark:bg-neutral-600 rounded-sm
                    ">
                        <Plus className="h-4 w-4 text-muted-foreground"/>
                    </div>
                </div>
            }
        </div>
    )
}

export default Item;

Item.Skeleton= function ItemSkeleton({level}:{level?:number}){
    return(
        <div
        style={{paddingLeft:level?`${(level*12)+25}px`:"12px"}}
        className="flex gap-x-2 py-[3px]"
        >
        <Skeleton className="h-4 w-4"/>
        <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}