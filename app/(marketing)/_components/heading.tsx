"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

import { Spinner } from "@/components/spinner";

const Heading=()=>{
    const {isAuthenticated, isLoading}=useConvexAuth();
    return(
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">Your Ideas, Documents, & Plans. Unified. Welcome to 
                <span className="underline">Jotion</span>
            </h1>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Jotion is the connected workspace where <br/>
                better, faster work happens
            </h3>
            {
                isLoading && (
                    <div className="flex w-full items-center justify-center">
                    <Spinner size="lg" />
                    </div>
                )
            }
            {
                isAuthenticated && !isLoading && (
                    <Button asChild>
                        <Link href="/documents">
                        Enter Jotin
                        <ArrowRight className="w-4 h-4 ml-2"/>
                        </Link>
                    </Button>
                )
            }
            {
                !isAuthenticated && !isLoading && (
                    <SignInButton mode="modal">
                        <Button>
                            Get Jotion free
                        <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </SignInButton>

                )
            }
        </div>
    );
}

export default Heading;