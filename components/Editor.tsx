"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

import {
    DragHandleButton,
    SideMenu,
    SideMenuController,
  } from "@blocknote/react";

import { useEdgeStore } from "@/lib/edgestore";
import { useTheme } from "next-themes";

interface EditorProps{
    onChange:(value:string)=>void;
    editable?:boolean;
    initialContent?:string;
}

const Editor=({
    onChange,
    editable,
    initialContent,
}:EditorProps)=>{
    const {resolvedTheme}=useTheme();
    const {edgestore}=useEdgeStore();
    const handleUpload=async(file:File)=>{
        
            const res=await edgestore.publicFiles.upload({
                file
            })
            return res.url;
    }
    const editor:BlockNoteEditor=useCreateBlockNote({
        initialContent: initialContent
        ?JSON.parse(initialContent) as PartialBlock[]
        :undefined,
        uploadFile:handleUpload,
    });
  
    return(
        <div className="z-[99999px] md:pl-20">
            <BlockNoteView 
            editable={editable} 
            editor={editor} 
            onChange={()=>{onChange(JSON.stringify(editor.document))}}
            theme={resolvedTheme==="dark"?"dark":"light"}
            />
        </div>
    );
}
export default Editor;