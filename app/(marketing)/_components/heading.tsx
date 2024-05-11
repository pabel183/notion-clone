"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Heading=()=>{
    return(
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">Your ideas, Documents, & Plans. Unifie. Welcome to 
                <span className="underline">Jotion</span>
            </h1>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Jotion is the connected workspace where <br/>
                better, faster work happens
            </h3>
            <Button>
                Enter Jotin 
                <ArrowRight className="w-4 h-4 ml-2"/>
            </Button>
        </div>
    );
}

export default Heading;