"use client";

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import React from "react";

interface ConfirmModelProps {
    children: React.ReactNode;
    onConfirm: () => void;
}
const ConfirmModel = ({
    children,
    onConfirm
}: ConfirmModelProps) => {
    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onConfirm();
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="
                    text-neutral-900
                    dark:text-neutral-50 
                    font-bold 
                    text-lg">
                        Are  you abosolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                        This action cannot be undo.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="
                    drop-shadow-md
                    rounded-md 
                    border 
                    ring-neutral-300 
                    hover:bg-neutral-100 
                    dark:bg-neutral-800
                    dark:text-white
                    dark:hover:bg-neutral-700
                    p-2"
                        onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="
                    bg-neutral-900 
                    hover:opacity-90 
                    rounded-md 
                    p-2 
                    text-white
                    dark:bg-white
                    dark:text-black
                    "
                        onClick={handleConfirm}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default ConfirmModel;