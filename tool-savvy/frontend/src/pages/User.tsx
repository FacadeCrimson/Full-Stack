import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, } from '@ionic/react';
import InfiniteScroll from '../components/InfiniteScroll'
import {  RouteComponentProps } from 'react-router-dom';

interface UserProps extends RouteComponentProps<{
    id: string;
  }> {}

const User: React.FC<UserProps> = ({match}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle>{match.params.id}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <InfiniteScroll></InfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default User;
