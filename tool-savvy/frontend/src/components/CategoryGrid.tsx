import React,{useEffect} from 'react';
import { IonContent, IonCard, IonCardHeader,	IonItem, IonIcon, IonLabel,  
  IonGrid, IonRow, IonCol} from '@ionic/react';
import { headset,camera,cart,gift } from 'ionicons/icons';
import './CategoryGrid.css'

interface ContainerProps {
  filter:string
}

const Category: React.FC<ContainerProps> = ({filter}) => {
  useEffect(()=>{
    const categories=document.getElementsByClassName("category") as HTMLCollectionOf<HTMLElement>
    if(filter===""){
      for(var i = 0; i < categories.length; i++) { 
        categories[i].classList.remove('ion-hide');
      }
      return
    }
    for(var i = 0; i < categories.length; i++) {
      if(categories[i].id.toLowerCase().indexOf(filter) <= -1){
        categories[i].classList.add('ion-hide');
      }else{
        categories[i].classList.remove('ion-hide');
      }
    }
    return
  },[filter])

  return (
      <IonContent fullscreen>
        <IonGrid>
            <IonRow>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="category ion-text-center" id="music">
                    <IonCard href="/category/music" className="ion-activated">
                      <IonCardHeader id="header">
                        <IonIcon icon={headset} id="pic"></IonIcon>
                      </IonCardHeader>   
                        <IonItem className="ion-text-center">
                           <IonLabel id="title">Music</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="category ion-text-center" id="photo">
                  <IonCard href="/category/music" className="ion-activated"> 
                    <IonCardHeader id="header">
                      <IonIcon icon={camera} id="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem className="ion-text-center">
                           <IonLabel id="title">Photo</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="category ion-text-center" id="shopping">
                  <IonCard href="/category/music" className="ion-activated">
                    <IonCardHeader id="header">
                      <IonIcon icon={cart} id="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem className="ion-text-center">
                           <IonLabel id="title">Shopping</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="category ion-text-center" id="gift">
                    <IonCard href="/category/music" className="ion-activated">
                    <IonCardHeader id="header">
                      <IonIcon icon={gift} id="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem className="ion-text-center">
                           <IonLabel id="title">Gift</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
      </IonContent>

  );
};

export default Category;
