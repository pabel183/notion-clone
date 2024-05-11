"use client";

import useScrollTop from "@/hooks/use-Scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar=()=>{
    const scroll=useScrollTop();
    return(
        <div className={
            cn(
                "flex fixed top-0 z-10 w-full bg-background p-6 items-center dark:bg-[#1F1F1F]",
                scroll && "border-b shadow-sm"
            )
        }>
            <Logo />
            <div className="
            flex
            md:ml-auto
            justify-between
            items-center
            w-full
            md:justify-end
            gap-x-2
            ">
                <ModeToggle />
            </div>
        </div>
    );
}

export default Navbar;