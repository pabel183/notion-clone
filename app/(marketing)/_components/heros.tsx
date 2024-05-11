"use client";

import Image from "next/image";

const Heros=()=>{
    return (
        <div className="flex flex-col max-w-3xl justify-center items-center">
            <div className="flex items-center">
                <div className="
                relative
                h-[300px]
                w-[300px]
                sm:h-[350px]
                sm:w-[350px]
                md:h-[400px]
                md:w-[400px]
                ">
                    <Image 
                    src="/documents.png"
                    fill
                    className="object-contain dark:hidden"
                    alt="Documents"
                    />
                    <Image 
                    src="/documents-dark.png"
                    fill
                    className="object-contain hidden dark:block"
                    alt="Documents"
                    />
                </div>
                <div className="
                relative 
                h-[400px] 
                w-[400px]
                hidden
                md:block
                ">
                    <Image 
                    src="/reading.png"
                    fill
                    alt="Reading"
                    className="object-contain dark:hidden"
                    />
                    <Image 
                    src="/reading-dark.png"
                    fill
                    alt="Reading"
                    className="object-contain hidden dark:block"
                    />
                </div>
            </div>
        </div>
    );
}
export default Heros;