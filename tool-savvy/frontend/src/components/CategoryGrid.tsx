import React,{useEffect} from 'react';
import { IonContent,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
	IonItem, IonIcon, IonLabel, IonButton, IonGrid, IonRow, IonCol
	} from '@ionic/react';
import { headset,camera,cart,gift } from 'ionicons/icons';
import './CategoryGrid.css'

interface ContainerProps {
  filter:string
}

const Category: React.FC<ContainerProps> = ({filter}) => {
  useEffect(()=>{
    const categories=document.getElementsByClassName(filter) as HTMLCollectionOf<HTMLElement>
    for(var i = 0; i < categories.length; i++) {
      const shouldShow = categories[i].id.toLowerCase().indexOf(filter) > -1;
      categories[i].style.display = shouldShow ? 'block' : 'none';
  }
  },[filter])

  return (
      <IonContent fullscreen>
        <IonGrid>
            <IonRow>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="ion-text-center">
                    <IonCard href="/category/music" className="category ion-activated" id="music">
                      <IonCardHeader id="header">
                        <IonIcon icon={headset} id="pic"></IonIcon>
                      </IonCardHeader>   
                        <IonItem className="ion-text-center">
                           <IonLabel id="title">Music</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="ion-text-center">
                  <IonCard href="/category/music" className="category ion-activated"> 
                    <IonCardHeader id="header">
                      <IonIcon icon={camera} id="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem className="ion-text-center">
                           <IonLabel id="title">Music</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="ion-text-center">
                  <IonCard href="/category/music" className="category ion-activated">
                    <IonCardHeader id="header">
                      <IonIcon icon={cart} id="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem className="ion-text-center">
                           <IonLabel id="title">Music</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="ion-text-center">
                    <IonCard href="/category/music" className="category ion-activated">
                    <IonCardHeader id="header">
                      <IonIcon icon={gift} id="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem className="ion-text-center">
                           <IonLabel id="title">Music</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
      </IonContent>

  );
};

export default Category;
