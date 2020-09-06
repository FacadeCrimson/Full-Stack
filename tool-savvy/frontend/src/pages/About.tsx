import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonRouterOutlet,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
	IonItem, IonIcon, IonLabel, IonButton, IonGrid, IonRow, IonCol, IonText
	} from '@ionic/react';

const About: React.FC = () => {
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonTitle>About</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Origination</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonText>
                        <div>I suppose everyone has such experience: when faced with serious and pivotal choices in our life, we turn to our friends and family for advice.
                            <p>However, advice and vision from the people we know may be insufficient for the task we are undertaking.</p>
                            <p>I still remember the last time after dealing with relationship when I came across Mr. Jones' Rules for the Modern Man, the chapter of How to end a relationship. 
                                It is so enlightening and right to the point that I wish I had read it earlier.
                            </p>
                            <p>None of the big decisions you make in life could be only assisted by the very few people around you, neither should you start working or learning without knowing
                                the best practice. Here comes the idea of Tool-Savvy, where all experienced people will share what tools they use and how they become successful.
                            </p>
                            <p>By referring to us when you face decisions next time, worry no more for the uncertainty and incompletion and achieve your real potential.</p>
                        </div>
                    </IonText>
                </IonCardContent>
            </IonCard>

        </IonContent>
        
    </IonPage>
  );
};

export default About;
