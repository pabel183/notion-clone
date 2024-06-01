"use client";

import { useUser,SignOutButton } from "@clerk/clerk-react";

import { ChevronsLeftRight } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const UserItem=()=>{
    const {user}=useUser();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex w-full items-center text-sm p-3 hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="h-5 w-5">
                            <AvatarImage 
                                src={user?.imageUrl}
                            />
                        </Avatar>
                            <span className="font-medium text-start line-clamp-1 ">
                                {user?.fullName}&apos; Jotions
                            </span>
                    </div>
                    <ChevronsLeftRight className="ml-2 rotate-90 h-4 w-4 text-muted-foreground"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-80"
            align="start"
            alignOffset={11}
            forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground ">
                        {
                            user?.emailAddresses[0].emailAddress
                        }
                    </p>
                    <div className="flex gap-x-2 items-center">
                        <div className="bg-secondary p-1">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.imageUrl}/>
                        </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">{user?.fullName}</p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild
                className="w-full text-muted-foreground cursor-pointer"
                >
                    <SignOutButton>
                        Log Out
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserItem;