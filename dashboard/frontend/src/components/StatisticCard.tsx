import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonItem, IonIcon, IonLabel, IonRow, IonCol
    } from '@ionic/react';
import { locate, calendar } from 'ionicons/icons';

interface ContainerProps{
    result:any
}

export const StatisticCard:React.FC<ContainerProps>=({result})=>{
    return <IonRow>
    <IonCol sizeLg="2.5" offsetLg="0.4" sizeSm="4.5" offsetSm="1" size="10" offset="1">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Business Score Percentile</IonCardTitle>
                <IonCardSubtitle>{result.bfsp}</IonCardSubtitle>
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
                <IonCardTitle>Business Topic Score Percentile</IonCardTitle>
                <IonCardSubtitle>{result.btfsp}</IonCardSubtitle>
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
                <IonCardTitle>Sentiment Score Pred Label</IonCardTitle>
                <IonCardSubtitle>{result.sspl}</IonCardSubtitle>
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
                <IonCardSubtitle>{result.ar}</IonCardSubtitle>
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