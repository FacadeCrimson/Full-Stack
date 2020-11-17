import React, {useState} from 'react';
import { IonItemDivider, IonLabel, IonItem, IonTextarea } from '@ionic/react';
import './TimeLine.css'

export default function TimeLine(){
    const [text, setText] = useState<string>();
    return  <>
                <IonItemDivider>Add your thoughts for today.</IonItemDivider>
                <IonItem>
                    <IonLabel>Notes</IonLabel>
                    <IonTextarea rows={6} cols={20} placeholder="Write Something..." value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
                </IonItem>
                <IonItemDivider className="time">Today</IonItemDivider>
                <IonItem className="ion-text-center">Loved Category Music</IonItem>
                <IonItemDivider className="ion-text-center">November 2nd, 2020</IonItemDivider>
                <IonItem className="ion-text-center">Commented on Category Music -&gt; Tool Apple Music</IonItem>
            </>


}