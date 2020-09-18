import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuToggle, IonIcon, IonButton, IonMenu, IonList, IonListHeader, IonLabel, IonItem } from '@ionic/react';
import './Tab2.css';
import Category from '../components/CategoryGrid'

const Tab2: React.FC = () => {
  return (<IonPage class="ion-page" id="main-content">
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
                <IonMenuToggle auto-hide="false">
                  <IonItem button>
                    <IonIcon slot="start" name='home'></IonIcon>
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
              <IonIcon slot="icon-only" name="menu"></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>Header</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <h1>Main Content</h1>
      <p>Click the icon in the top left to toggle the menu.</p>
      <Category></Category>
    </IonContent>
  </IonPage>
  );
};

export default Tab2;
