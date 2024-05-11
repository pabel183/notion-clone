import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font=Poppins({
    subsets:["latin"],
    weight:["400","600"]
})

const Logo=()=>{
    return(
        <div className="
        md:flex
        hidden
        items-center
        gap-x-2
        ">
            <Image 
            height="40"
            width="40"
            src="/logo.svg"
            alt="Logo"
            />
            <span className={cn("font-semibold",font.className)}>Jotion</span>
        </div>
    );
}
export default Logo;