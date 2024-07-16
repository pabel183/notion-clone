"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error=()=>{
    return(
        <div className="
        h-full
        flex 
        flex-col 
        items-center
        justify-center
        gap-y-4
        ">
            <Image 
            src="/error.png"
            alt="Error"
            height="300"
            width="300"
            className="dark:hidden"
            />
            <Image 
            src="/error-dark.png"
            alt="Error"
            height={300}
            width={300}
            className="hidden dark:block"
            />
            <p className="text-lg font-medium">Something went wrong</p>
            <Button asChild>
                <Link href="/documents">Go back</Link>
            </Button>
        </div>
    )
}

export default Error;