import React,{useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon,IonSegment, IonSegmentButton,IonToast, IonReorderGroup, IonItem, IonLabel,IonReorder,
	IonCard, IonCardHeader,  IonCardTitle, IonCardContent, IonText} from '@ionic/react';
import { personCircle, search, ellipsisHorizontal, ellipsisVertical, pizza} from 'ionicons/icons';

const About: React.FC = () => {
    const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
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

            <IonToolbar>
                <IonButtons slot="secondary">
                <IonButton>
                    <IonIcon slot="icon-only" icon={personCircle} />
                </IonButton>
                <IonButton>
                    <IonIcon slot="icon-only" icon={search} />
                </IonButton>
                </IonButtons>
                <IonButtons slot="primary">
                <IonButton color="secondary">
                    <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
                </IonButton>
                </IonButtons>
                <IonTitle>Default Buttons</IonTitle>
            </IonToolbar>

            <IonToolbar>
                <IonButtons slot="secondary">
                <IonButton>Account</IonButton>
                </IonButtons>
                <IonButtons slot="primary">
                <IonButton color="danger">Edit</IonButton>
                </IonButtons>
                <IonTitle>Text Only Buttons</IonTitle>
            </IonToolbar>

            <IonToolbar>
                <IonSegment value="all">
                <IonSegmentButton value="all">
                    All
                </IonSegmentButton>
                <IonSegmentButton value="favorites">Favorites</IonSegmentButton>
                </IonSegment>
            </IonToolbar>
            <IonButton onClick={() => setShowToast1(true)} expand="block">Show Toast 1</IonButton>
      <IonButton onClick={() => setShowToast2(true)} expand="block">Show Toast 2</IonButton>
      <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Your settings have been saved."
        duration={200}
      />

      <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="Click to Close"
        position="top"
        buttons={[
          {
            side: 'start',
            icon: 'star',
            text: 'Favorite',
            handler: () => {
              console.log('Favorite clicked');
            }
          },
          {
            text: 'Done',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]}
      />

            <IonReorderGroup disabled={false}>
                {/*-- Custom reorder icon end items --*/}
                <IonItem>
                    <IonLabel>Item 5</IonLabel>
                    <IonReorder slot="end">
                    <IonIcon icon={pizza} />
                    </IonReorder>
                </IonItem>

                <IonItem>
                    <IonLabel>Item 6</IonLabel>
                    <IonReorder slot="end">
                    <IonIcon icon={pizza} />
                    </IonReorder>
                </IonItem>
            </IonReorderGroup>
        </IonContent>
        
    </IonPage>
  );
};

export default About;
