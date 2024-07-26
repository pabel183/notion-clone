"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { Check, Copy, Globe } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { UseOrigin } from "@/hooks/use-origin";

interface PublishProps {
    initialData: Doc<"documents">;
}
const Publish = ({
    initialData
}: PublishProps) => {
    const params = useParams();
    const origin = UseOrigin();
    const [copied, setCopied] = useState(false);
    const update = useMutation(api.documents.update);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;



    const onPublish = () => {
        setIsSubmitting(true);
        const promis = update({
            id: params.documentId as Id<"documents">,
            isPublished: true,
        }).finally(() => setIsSubmitting(false));

        toast.promise(promis, {
            loading: "Note is publishing...",
            success: "Note has published.",
            error: "Failed to publish!",
        });
    }
    const onUnpublish = () => {
        setIsSubmitting(true);
        const promis = update({
            id: params.documentId as Id<"documents">,
            isPublished: false,
        }).finally(() => setIsSubmitting(false));

        toast.promise(promis, {
            loading: "Note is unpublishing...",
            success: "Note has unpublished.",
            error: "Failed to unpublish!",
        });
    }
    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="cursor-pointer flex items-center gap-x-1">
                        <p>Published</p>
                        {initialData.isPublished && 
                        <Globe className="text-sky-500 h-4 w-4" />
                        }
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-72"
                    align="end"
                    alignOffset={8}
                    forceMount
                >
                    {initialData.isPublished ? (
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center gap-x-2 text-sky-500">
                                <Globe className="h-4 w-4" />
                                <p>This note is live on web</p>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input
                                    className="
                                    flex-1
                                    px-2
                                    text-xs
                                    border
                                    rounded-l-md
                                    h-8
                                    bg-muted
                                    truncate
                                    "
                                    value={url}
                                    disabled
                                />
                                <Button 
                                    onClick={onCopy}
                                    disabled={copied}
                                    className="h-8 rounded-l-none"
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <Button
                                disabled={isSubmitting}
                                onClick={onUnpublish}
                                className="w-full text-xs"
                                size="sm"
                            >
                                Unpublish
                            </Button>
                        </div> ) 
                        : (
                        <div className="flex flex-col items-center justify-center">
                            <Globe className="h-6 w-6 text-muted-foreground mb-2" />
                            <p className="text-sm font-medium mb-2">
                                Publish this note
                            </p>
                            <span className="text-xs text-muted-foreground mb-4">
                                Share your work with others.
                            </span>
                            <Button
                                disabled={isSubmitting}
                                onClick={onPublish}
                                className="w-full text-xs">
                                Publish
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}
export default Publish;