"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Icon, LucideIcon } from "lucide-react";

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
    const ChevronIcon=expanded?ChevronDown:ChevronRight;

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
                onClick={()=>{}}
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
        </div>
    )
}

export default Item;