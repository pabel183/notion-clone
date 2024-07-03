"use client";
import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogHeader,DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { ModeToggle } from "../mode-toggle";

const SettingModal=()=>{
    const settings=useSettings();
    return(
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
            <DialogHeader className="border-b pb-3">
                <h2 className="text-lg font-medium">
                    My Settings
                </h2>
            </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>
                            Apprearance
                        </Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customice how Jotion looks on your device
                        </span>
                    </div>
                        <ModeToggle/>
                </div>
            </DialogContent>
        </Dialog>
    );
} 

export default SettingModal;