import { useEffect,useState } from "react";

const useScrollTop=(threshold=10)=>{
    const [scroll,setScroll]=useState(false);

    useEffect(()=>{ 
        const handleScroll=()=>{
            if(window.scrollY>threshold){
                setScroll(true);
            }
            else{
                setScroll(false);
            }
        }
        window.addEventListener("scroll",handleScroll);
        return ()=>window.removeEventListener("scroll",handleScroll);
    },[threshold,setScroll]);

    return scroll;
}
export default useScrollTop;