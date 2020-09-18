import React from 'react';
import { IonContent,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
	IonItem, IonIcon, IonLabel, IonButton, IonGrid, IonRow, IonCol
	} from '@ionic/react';
import { headset,camera,cart,gift } from 'ionicons/icons';
import './CategoryGrid.css'

const Category: React.FC = () => {

  return (
      <IonContent fullscreen>
        <IonGrid>
            <IonRow>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" class="ion-text-center">
                    <IonCard href="/category/music" className="ion-activated">
                      <IonCardHeader id="header">
                        <IonIcon icon={headset} id="pic"></IonIcon>
                      </IonCardHeader>   
                        <IonItem class="ion-text-center">
                           <IonLabel id="title">Music</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" class="ion-text-center">
                    <IonCard >
                    <IonCardHeader id="header">
                      <IonIcon icon={camera} id="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem class="ion-text-center">
                           <IonLabel id="title">Music</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" class="ion-text-center">
                    <IonCard >
                    <IonCardHeader id="header">
                      <IonIcon icon={cart} id="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem class="ion-text-center">
                           <IonLabel id="title">Music</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" class="ion-text-center">
                    <IonCard >
                    <IonCardHeader id="header">
                      <IonIcon icon={gift} id="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem class="ion-text-center">
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
