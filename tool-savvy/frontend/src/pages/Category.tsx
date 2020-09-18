import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, } from '@ionic/react';

import {  RouteComponentProps } from 'react-router-dom';

interface UserProps extends RouteComponentProps<{
    name: string;
  }> {}

const Category: React.FC<UserProps> = ({match}) => {
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonTitle>{match.params.name}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>

        </IonContent>
    </IonPage>
  );
};

export default Category;
