import React, {useState, useEffect} from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuToggle, IonIcon, IonButton,
         IonMenu, IonList, IonThumbnail, IonLabel, IonItem, IonLoading, IonSkeletonText, IonListHeader, IonAvatar} from '@ionic/react';
import useIntersect from "../hooks/useIntersect"
import LoadingItem from "./LoadingItem"

interface ContainerProps{
    items?:number[]
}

const numbers = Array.from(Array(100).keys())

//Infinite Scroll
export default function InfiniteScroll({items=numbers}:ContainerProps){
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    const [ref, entry] = useIntersect({});

    const [showLoading, setShowLoading] = useState(true);
    setTimeout(() => {
        setShowLoading(false);
    }, 2000);

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
                <IonButton onClick={() => setShowLoading(true)}>Show Loading</IonButton>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}
                    duration={5000}
                />
                {items&&items.length>0?items.slice(0,page*20).map((item)=>{
                    return <IonItem key={item.toString()}>{item}</IonItem>
                }):<IonItem>Nothing</IonItem>}
                <IonList ref={ref as any}>{
                    loading?[1,2,3,4,5,6,7,8,9,10].map((n)=>{return <LoadingItem key={n}></LoadingItem>}):"End"
                }</IonList>
            </IonList>
}
