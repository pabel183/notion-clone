"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";

interface NavbarProps{
    isCollapsed:boolean;
    onReset:()=>void;
}
const Navbar=({
    isCollapsed,
    onReset
}:NavbarProps)=>{
    const param=useParams();
    const document=useQuery(api.documents.getById,{
        documentId:param.documentId as Id<"documents">,
    });

    if(document===undefined){
        return(
            <nav className="
            bg-background
            dark:bg-[#1F1F1F]
            items-center
            px-3
            py-2
            w-full
            flex
            justify-between
            ">
                <Title.Skeleton />
                <div className="flex items-center gap-x-2">
                    <Menu.Skeleton/>
                </div>
            </nav>
        );
    }
    if(document===null){
        return null;
    }
    return(
        <>
            <nav className="
            bg-background
            dark:bg-[#1F1F1F]
            items-center
            px-3
            py-2
            gap-x-4
            w-full
            flex">
                {isCollapsed && (
                        <MenuIcon
                        role="button"
                        className="h-6 w-6 text-muted-foreground"
                        onClick={onReset}/>
                )}
                <div className="flex justify-between items-center w-full">
                    <Title initialData={document}/>
                    <Menu documentId={document._id}/>
                </div>
            </nav>
                {document.isArchived && (
                    <Banner documentId={document._id}/>
                )}
        </>
    );
}
export default Navbar;