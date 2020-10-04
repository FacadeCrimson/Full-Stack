import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonItem, IonIcon, IonLabel, IonRow, IonCol
    } from '@ionic/react';
import { locate, calendar } from 'ionicons/icons';

export const StatisticCard:React.FC=()=>{
    return <IonRow>
    <IonCol sizeLg="2.5" offsetLg="0.4" sizeSm="4.5" offsetSm="1" size="10" offset="1">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Business Final Score Percentile</IonCardTitle>
                <IonCardSubtitle>115</IonCardSubtitle>
            </IonCardHeader>
            <IonItem>
                <IonChip>
                    <IonIcon icon={locate} className="small"></IonIcon>
                    <IonLabel color="danger">&#9662; 4%</IonLabel>
                </IonChip>
                <IonChip>
                    <IonIcon icon={calendar} className="small"></IonIcon>
                    <IonLabel color="success">&#9652; 5%</IonLabel>
                </IonChip>
            </IonItem>
            <IonCardContent>
            
            </IonCardContent>
        </IonCard>
    </IonCol>
    <IonCol sizeLg="2.5" offsetLg="0.4" sizeSm="4.5" offsetSm="1" size="10" offset="1">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Business Topic Final Score Percentile</IonCardTitle>
                <IonCardSubtitle>115</IonCardSubtitle>
            </IonCardHeader>
            <IonItem>
                <IonChip>
                    <IonIcon icon={locate}></IonIcon>
                    <IonLabel color="danger">&#9662; 4%</IonLabel>
                </IonChip>
                <IonChip>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel color="success">&#9652; 5%</IonLabel>
                </IonChip>
            </IonItem>
            <IonCardContent>
            
            </IonCardContent>
        </IonCard>
    </IonCol>
    <IonCol sizeLg="2.5" offsetLg="0.4" sizeSm="4.5" offsetSm="1" size="10" offset="1">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Sent Score Pred Label'</IonCardTitle>
                <IonCardSubtitle>115</IonCardSubtitle>
            </IonCardHeader>
            <IonItem>
                <IonChip>
                    <IonIcon icon={locate}></IonIcon>
                    <IonLabel color="danger">&#9662; 4%</IonLabel>
                </IonChip>
                <IonChip>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel color="success">&#9652; 5%</IonLabel>
                </IonChip>
            </IonItem>
            <IonCardContent>
            
            </IonCardContent>
        </IonCard>
    </IonCol>
    <IonCol sizeLg="2.5" offsetLg="0.4" sizeSm="4.5" offsetSm="1" size="10" offset="1">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Average Review</IonCardTitle>
                <IonCardSubtitle>115</IonCardSubtitle>
            </IonCardHeader>
            <IonItem>
                <IonChip>
                    <IonIcon icon={locate}></IonIcon>
                    <IonLabel color="danger">&#9662; 4%</IonLabel>
                </IonChip>
                <IonChip>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel color="success">&#9652; 5%</IonLabel>
                </IonChip>
            </IonItem>
            <IonCardContent>
            
            </IonCardContent>
        </IonCard>
    </IonCol>
  
</IonRow>
}