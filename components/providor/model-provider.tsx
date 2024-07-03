"use client";
import { useEffect, useState } from "react";
import SettingModal from "../model/settings-modal";

const ModalProvider=()=>{
    const [isMount,setIsMount]=useState(false);
    useEffect(()=>{
        setIsMount(true);
    },[])

    if(!isMount){
        return null;
    }

    return(
        <>
        <SettingModal />
        </>
    )
}
export default ModalProvider;