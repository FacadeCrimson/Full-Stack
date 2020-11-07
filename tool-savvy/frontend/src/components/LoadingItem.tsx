import React from 'react';
import { IonLabel, IonItem, IonSkeletonText } from '@ionic/react';

export default function LoadingItem(){
    return <IonItem>
                <IonSkeletonText animated style={{ width: '27px', height: '27px' }} slot="start" />
                <IonLabel>
                <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                </h3>
                <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                </p>
                <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                </p>
                </IonLabel>
            </IonItem>
}