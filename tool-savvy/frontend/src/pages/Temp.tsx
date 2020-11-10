import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {PostsComp} from '../components/Posts'

const Temp: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Temp</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <PostsComp></PostsComp>
      </IonContent>
    </IonPage>
  );
};

export default Temp;
