import React,{useEffect} from 'react';
import {IonCard, IonCardHeader,	IonItem, IonLabel, IonCol} from '@ionic/react';
import useIntersect from '../hooks/useIntersect'

interface ContainerProps {
    category:string
}

export const CategoryCard: React.FC<ContainerProps> = ({category}) => {
    const [ref, entry] = useIntersect({});
    useEffect(()=>{
        console.log((entry as any).isIntersecting)
        if((entry as any).isIntersecting){
            const element = document.getElementById(category)
            element!.style.backgroundImage=`url(${process.env.REACT_APP_CDN}images/default.jpg`
            element!.style.backgroundSize= "cover"
        }
    })
  
    return   <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="category ion-text-center">
                      <IonCard href="/category/music" className="ion-activated" ref={ref as any}>
                        <IonCardHeader className="header" id={category}>
                        </IonCardHeader>
                          <IonItem className="ion-text-center">
                             <IonLabel className="title">{(entry as any).intersectionRatio}</IonLabel>
                          </IonItem>
                      </IonCard>
             </IonCol>
  };
  