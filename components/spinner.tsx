import { cn } from "@/lib/utils";
import {cva, type VariantProps} from "class-variance-authority";

import { Loader } from "lucide-react";

const spinnerVariant=cva("bg-white",
    {
        variants:{
            size:{
                default:"h-4 w-4",
                sm:"h-2 w-2",
                lg:"h-6 w-6",
                icon:"h-10 w-10"
            }
        },
        defaultVariants:{
            size:"default",
        }
    }
);

interface spinnerProps extends VariantProps<typeof spinnerVariant>{};

export const Spinner=({size,}:spinnerProps)=>{
    return <Loader className={cn(spinnerVariant({size}))}/>
}