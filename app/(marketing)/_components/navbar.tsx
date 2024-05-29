"use client";

import { useConvexAuth } from  "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ModeToggle } from "@/components/mode-toggle";
import Logo from "./logo";
import useScrollTop from "@/hooks/use-Scroll-top";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

const Navbar=()=>{
    const {isAuthenticated,isLoading}=useConvexAuth();
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
                {isLoading  && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                    <SignInButton mode="modal">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </SignInButton>
                    <SignInButton mode="modal">
                        <Button size="sm">
                            Get Jotion free
                        </Button>
                    </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                    <Button variant="ghost" asChild>
                        <Link href="/documents">
                        Enter Jotion
                        </Link>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
}

export default Navbar;