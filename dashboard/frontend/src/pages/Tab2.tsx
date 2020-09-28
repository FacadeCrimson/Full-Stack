import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuToggle, 
  IonIcon, IonButton, IonMenu, IonList, IonListHeader, IonLabel, IonItem,
  IonRow, IonGrid, IonCol } from '@ionic/react';
import './Tab2.css';
import { menu, home } from 'ionicons/icons';
import {Circles,AnimatedCircles,ChartWithDimensions} from '../components/D3Explore'

const Tab2: React.FC = () => {
  return (
  <IonPage class="ion-page" id="main-content">
        <IonMenu content-id="main-content">
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent>
              <IonList>
                <IonListHeader>
                  Navigate
                </IonListHeader>
                <IonMenuToggle>
                  <IonItem button>
                    <IonIcon slot="start" icon={home}></IonIcon>
                    <IonLabel>
                      Home
                    </IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </IonList>
            </IonContent>
        </IonMenu>
     
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuToggle>
            <IonButton>
              <IonIcon slot="icon-only" icon={menu}></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>Header</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
    <IonGrid>
        <IonRow>
          <IonCol size="12"  sizeMd="3" offsetMd="1">
            <Circles></Circles>
          </IonCol>
          <IonCol size="12"  sizeMd="3" offsetMd="1">
              <AnimatedCircles></AnimatedCircles>
          </IonCol>
          <IonCol size="12"  sizeMd="3" offsetMd="1">
            <ChartWithDimensions {...chartSettings}></ChartWithDimensions>
          </IonCol>
          <IonCol size="12"  sizeMd="3" offsetMd="1">
        
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
  );
};

export default Tab2;


const chartSettings={
  width: 200,
  height: 200,
  marginTop: 50,
  marginRight: 50,
  marginBottom: 50,
  marginLeft: 50,
}