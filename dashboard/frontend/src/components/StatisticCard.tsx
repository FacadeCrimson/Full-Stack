import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonChip, IonItem, IonIcon, IonLabel, IonRow, IonCol
    } from '@ionic/react';
import { locate, calendar } from 'ionicons/icons';

interface ContainerProps{
    result:any
    prevResult:any
    totalResult:any
}

export const StatisticCard:React.FC<ContainerProps>=({result,prevResult,totalResult})=>{

    function round1(name:string){
        if(prevResult!.current[name]!==0){
            return Math.round(10000-result[name]/prevResult!.current[name]*10000)/100
        }
        return 0
    }

    function round2(name:string){
        if(totalResult.current && totalResult!.current[name]!==0){
            return Math.round(10000-result[name]/totalResult!.current[name]*10000)/100
        }
        return 0
    }
    const ar=round1("ar")
    const sspl=round1("sspl")
    const btfsp=round1("btfsp")
    const bfsp=round1("bfsp")

    const ar_=round2("ar")
    const sspl_=round2("sspl")
    const btfsp_=round2("btfsp")
    const bfsp_=round2("bfsp")

    return <IonRow>
    <IonCol sizeLg="2.5" offsetLg="0.4" sizeSm="4.5" offsetSm="1" size="10" offset="1">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle class="ion-text-center">Business Score Percentile</IonCardTitle>
                <IonCardTitle color="secondary" class="ion-text-center">{result.bfsp}</IonCardTitle>
            </IonCardHeader>
            <IonItem>
                <div  className="chip">
                <IonChip>
                    <IonIcon icon={locate}></IonIcon>
                    <IonLabel color={bfsp_<0?"danger":"success"}>{bfsp_<0?'▾':"▴"} {bfsp_}%</IonLabel>
                </IonChip>
                <IonChip>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel color={bfsp<0?"danger":"success"}>{bfsp<0?'▾':"▴"} {bfsp}%</IonLabel>
                </IonChip>
                </div>
            </IonItem>
        </IonCard>
    </IonCol>
    <IonCol sizeLg="2.5" offsetLg="0.4" sizeSm="4.5" offsetSm="1" size="10" offset="1">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle class="ion-text-center">Sentiment Score Pred Label</IonCardTitle>
                <IonCardTitle color="secondary" class="ion-text-center">{result.sspl}</IonCardTitle>
            </IonCardHeader>
            <IonItem>
                <div  className="chip">
                <IonChip>
                    <IonIcon icon={locate}></IonIcon>
                    <IonLabel color={sspl_<0?"danger":"success"}>{sspl_<0?'▾':"▴"} {sspl_}%</IonLabel>
                </IonChip>
                <IonChip>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel color={sspl<0?"danger":"success"}>{sspl<0?'▾':"▴"} {sspl}%</IonLabel>
                </IonChip>
                </div>
            </IonItem>
        </IonCard>
    </IonCol>

    <IonCol sizeLg="2.5" offsetLg="0.4" sizeSm="4.5" offsetSm="1" size="10" offset="1">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle class="ion-text-center">Average Review Number</IonCardTitle>
                <IonCardTitle color="secondary" class="ion-text-center">{result.btfsp}</IonCardTitle>
            </IonCardHeader>
            <IonItem>
                <div  className="chip">
                <IonChip>
                    <IonIcon icon={locate}></IonIcon>
                    <IonLabel color={btfsp_<0?"danger":"success"}>{btfsp_<0?'▾':"▴"} {btfsp_}%</IonLabel>
                </IonChip>
                <IonChip>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel color={btfsp<0?"danger":"success"}>{btfsp<0?'▾':"▴"} {btfsp}%</IonLabel>
                </IonChip>
                </div>
            </IonItem>
        </IonCard>
    </IonCol>
    <IonCol sizeLg="2.5" offsetLg="0.4" sizeSm="4.5" offsetSm="1" size="10" offset="1">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle class="ion-text-center">Average Review</IonCardTitle>
                <IonCardTitle color="secondary" class="ion-text-center">{result.ar}</IonCardTitle>
            </IonCardHeader>
            <IonItem>
                <div  className="chip">
                <IonChip>
                    <IonIcon icon={locate}></IonIcon>
                    <IonLabel color={ar_<0?"danger":"success"}>{ar_<0?'▾':"▴"} {ar_}%</IonLabel>
                </IonChip>
                <IonChip>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel color={ar<0?"danger":"success"}>{ar<0?'▾':"▴"} {ar}%</IonLabel>
                </IonChip>
                </div>
            </IonItem>
        </IonCard>
    </IonCol>
  
</IonRow>
}
