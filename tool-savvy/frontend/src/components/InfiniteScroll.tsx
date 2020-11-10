import React, {useState, useEffect} from 'react';
import { IonList, IonItem } from '@ionic/react';
import useIntersect from "../hooks/useIntersect"
import LoadingItem from "./LoadingItem"

interface ContainerProps{
    items:any[]
    container:React.FC
    pagination?:number
}

//Infinite Scroll
export default function InfiniteScroll({items,container,pagination=15}:ContainerProps){
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    const [ref, entry] = useIntersect({});

    useEffect(()=>{
        if(entry && entry instanceof IntersectionObserverEntry){
            if(entry.isIntersecting){
                setLoading(true)
                setTimeout(()=>{
                    setLoading(false)
                    setPage(n=>n+1)
                },2000)
        }
        }   
    },[entry])

    return  <IonList>
                {items&&items.length>0?items.slice(0,page*pagination).map((item,index)=>{
                    if(typeof item === 'object' && item !== null){
                        return React.createElement(container,{key:index,...item},null)
                    }
                    return React.createElement(container,{key:index},item)
                }):<IonItem>Nothing</IonItem>}
                <IonList ref={ref as any}>{
                    loading?Array.from(Array(pagination).keys()).map((n)=>{return <LoadingItem key={n}></LoadingItem>}):"End"
                }</IonList>
            </IonList>
}
