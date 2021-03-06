import {useState,useEffect,useRef} from 'react'

export default function useIntersect({root=null,rootMargin,threshold=0}:{root?:any,rootMargin?:string,threshold?:number|number[]}){
    const [entry,updateEntry] = useState<IntersectionObserverEntry|null>(null)
    const [node,setNode] = useState(null)
    const observer=useRef(
        new window.IntersectionObserver(([entry])=>updateEntry(entry),
        {root,rootMargin,threshold})
        )
    
    useEffect(()=>{
        const {current:currentObserver} = observer
        currentObserver.disconnect()
        if(node){currentObserver.observe(node!)}
        return ()=>currentObserver.disconnect()
    },[node])
    return [setNode,entry]
}