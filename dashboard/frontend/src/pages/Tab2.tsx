import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuToggle, 
  IonIcon, IonButton, IonMenu, IonList, IonLabel, IonItem, IonThumbnail, } from '@ionic/react';
import './Tab2.css';
import { menu, home } from 'ionicons/icons';

const Tab2: React.FC = () => {
  return (
  <IonPage className="ion-page" id="main-content">
        <IonMenu content-id="main-content">
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent>
              <IonList>
                  <IonItem className='clickable ion-activatable' button onClick={() => { }} detail>Object 1</IonItem>
                  <IonItem className='clickable ion-activatable' button onClick={() => { }} detail>Object 2</IonItem>
                  <IonItem className='clickable ion-activatable'>
                    <IonLabel className="ion-text-wrap">
                      Multiline text that should wrap when it is too long
                      to fit on one line in the item.
                    </IonLabel>
                  </IonItem>
                  <IonItem className='clickable ion-activatable'>
                    <IonThumbnail slot="start">
                      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==" alt="avatar"/>
                    </IonThumbnail>
                    <IonLabel>
                      <h2>H2 Title Text</h2>
                      <p>Button on right</p>
                    </IonLabel>
                    <IonButton fill="outline" slot="end">View</IonButton>
                  </IonItem> 
                  <IonMenuToggle>
                  <IonItem className='clickable ion-activatable' button onClick={() => { }}>
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
    </IonContent>
  </IonPage>
  );
};

export default Tab2;