import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
          <div>There is a famous saying that goes: "Don't be obsessed with tools." and another one: "I suppose it is tempting, if the only tool you have is a hammer, to treat everything as if it were a nail."
              <p>This app aims to help you become savvy about tools, and in turn, be a master of tools.</p>
              <p>After all, it's what we accomplish with tools that matters.</p>
          </div>
      </IonContent>
      <IonFooter>
          <IonToolbar>
            <IonTitle >Footer</IonTitle >
          </IonToolbar>
        </IonFooter>
    </IonPage>
  );
};

export default Tab1;
