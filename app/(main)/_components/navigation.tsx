"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import UserItem from "./user-item";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Navigation=()=>{

    const documents=useQuery(api.documents.get);

    const pathname=usePathname();
    const isMobile=useMediaQuery("(max-width:768px)");
    const isResizingRef=useRef(false);
    const sidebarRef=useRef<ElementRef<"aside">>(null);
    const navbarRef=useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting]=useState(false);
    const [isCollapsed, setIsCollapsed]=useState(isMobile);

    useEffect(()=>{
        if(isMobile){
            collapsed();
        }else {
            resetWidth();
        }
    },[isMobile]);

    useEffect(()=>{
        if(isMobile){
            collapsed();
        }
    },[pathname,isMobile]);

    const handleMouseDown=(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current=true;

        document.addEventListener("mousemove",handleMouseMove);
        document.addEventListener("mouseup",handleMouseUp);
    }
    const handleMouseMove=(event:MouseEvent)=>{
        if(!isResizingRef.current) return;

       let newWidth= event.clientX; 
        if(newWidth<240) newWidth=240;
        if(newWidth>480) newWidth=480;

       if(sidebarRef.current && navbarRef.current){
           sidebarRef.current.style.width=`${newWidth}px`;
           navbarRef.current.style.setProperty("left",`${newWidth}`);
           navbarRef.current.style.setProperty("width",`calc(100%-${newWidth}px)`);
       }
    }
    const handleMouseUp=()=>{
        isResizingRef.current=false;
        document.removeEventListener("mousemove",handleMouseMove);
        document.removeEventListener("mouseup",handleMouseUp);
    }
    const resetWidth=()=>{
        if(sidebarRef.current && navbarRef.current){
            setIsResetting(true);
            setIsCollapsed(false);

            sidebarRef.current.style.width=isMobile?"100%":"240px";
            navbarRef.current.style.setProperty("width",isMobile?"0":"calc(100%-240px)");
            navbarRef.current.style.setProperty("left",isMobile?"100%":"240px");

            setTimeout(()=>setIsResetting(false),300);
        }
    }
    const collapsed=()=>{
      if(sidebarRef.current && navbarRef.current){
        setIsResetting(true);
        setIsCollapsed(true);
        
        sidebarRef.current.style.width="0px";
        navbarRef.current.style.setProperty("width","100%");
        navbarRef.current.style.setProperty("left","0px");

        setTimeout(()=>setIsResetting(false),300);
      }  
    }
    return (
        <>
            <aside 
            ref={sidebarRef}
            className={cn(
                `group/sidebar 
                h-full
                overflow-y-auto 
                flex 
                relative 
                flex-col 
                w-60 
                bg-secondary 
                z-[9999]`,
                isResetting && ("transition-all ease-in-out duration-300"),
                isMobile && "w-0"
            )}>
                <div 
                onClick={collapsed}
                role="button"
                className=
                {cn(`
                opacity-0
                absolute
                group-hover/sidebar:opacity-100
                top-3
                right-2
                h-6
                w-6
                text-muted-foreground
                rounded-sm
                transition
                hover:bg-neutral-300
                dark:hover:bg-neutral-600`,
                isMobile && "opacity-100"
            )}
            >
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                <div>
                    <UserItem />
                </div>
                <div>
                    {documents?.map((document)=>(
                            <p key={document._id}>{document.title}</p>
                        )
                    )}
                </div>
                <div 
                onMouseDown={handleMouseDown}
                onClick={resetWidth}
                className="
                w-1
                bg-primary/10 
                opacity-0 
                group-hover/sidebar:opacity-100
                absolute
                top-0
                right-0
                transition
                h-full
                cursor-ew-resize
                "/>
            </aside>
            <div 
            ref={navbarRef}
            className={cn(`
            absolute
            top-0
            left-60
            w-[calc(100%-240px)]
            z-[99999]
            `,
            isResetting && ("transition-all ease-in-out duration-300"),
            isMobile && ("left-0 w-full")
             )}>
                <nav className={cn(`
                bg-transparent
                px-3
                py-3
                w-full
                `)}>
                    {isCollapsed && 
                    (<MenuIcon
                        onClick={resetWidth} 
                        role="button"
                        className="h-6 w-6 text-muted-foreground"
                    />
                )}
                </nav>
            </div>
        </>
    );
}

export default Navigation;