import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {  RouteComponentProps } from 'react-router-dom';
import {AuthComp} from '../components/AuthComp'
 
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
        <AuthComp></AuthComp>
      </IonContent>
    </IonPage>
  );
};

export default User;
