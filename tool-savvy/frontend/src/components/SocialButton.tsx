import React from 'react';
import { IonFabButton, IonFab, IonFabList, IonIcon, } from '@ionic/react';
import { logoVimeo, logoFacebook, logoInstagram, logoTwitter, share } from 'ionicons/icons';

//ShareButton
export default function ShareButton(){
    return <IonFab vertical="center" horizontal="center" slot="fixed">
                <IonFabButton>
                    <IonIcon icon={share} />
                </IonFabButton>
                <IonFabList side="top">
                    <IonFabButton><IonIcon icon={logoVimeo} /></IonFabButton>
                </IonFabList>
                <IonFabList side="bottom">
                    <IonFabButton><IonIcon icon={logoFacebook} /></IonFabButton>
                </IonFabList>
                <IonFabList side="start">
                    <IonFabButton><IonIcon icon={logoInstagram} /></IonFabButton>
                </IonFabList>
                <IonFabList side="end">
                    <IonFabButton><IonIcon icon={logoTwitter} /></IonFabButton>
                </IonFabList>
            </IonFab>
        }