import React, {useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonRouterOutlet, IonItemDivider, IonCheckbox,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonList,
	IonItem, IonIcon, IonLabel, IonButton, IonGrid, IonRow, IonCol
	} from '@ionic/react';
import { pin, wifi, locate, calendar } from 'ionicons/icons';

const checkboxList = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];

const Dashboard: React.FC = () => {
    const [checked, setChecked] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonGrid>
        <IonRow>
			<IonCol size="2.5" offset="0.5">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
                        <IonCardSubtitle>115</IonCardSubtitle>
                    </IonCardHeader>
					<IonItem>
					    <IonChip>
                            <IonIcon name={locate}></IonIcon>
                            <IonLabel color="danger">&#9662; 4%</IonLabel>
                        </IonChip>
                        <IonChip>
                            <IonIcon name={calendar}></IonIcon>
                            <IonLabel color="success">&#9652; 5%</IonLabel>
                        </IonChip>
					</IonItem>
					<IonCardContent>
					
					</IonCardContent>
				</IonCard>
			</IonCol>
            <IonCol size="2.5" offset="0.5">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
                        <IonCardSubtitle>115</IonCardSubtitle>
                    </IonCardHeader>
					<IonItem>
					    <IonChip>
                            <IonIcon name={locate}></IonIcon>
                            <IonLabel color="danger">&#9662; 4%</IonLabel>
                        </IonChip>
                        <IonChip>
                            <IonIcon name={calendar}></IonIcon>
                            <IonLabel color="success">&#9652; 5%</IonLabel>
                        </IonChip>
					</IonItem>
					<IonCardContent>
					
					</IonCardContent>
				</IonCard>
			</IonCol>
            <IonCol size="2.5" offset="0.5">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
                        <IonCardSubtitle>115</IonCardSubtitle>
                    </IonCardHeader>
					<IonItem>
					    <IonChip>
                            <IonIcon name={locate}></IonIcon>
                            <IonLabel color="danger">&#9662; 4%</IonLabel>
                        </IonChip>
                        <IonChip>
                            <IonIcon name={calendar}></IonIcon>
                            <IonLabel color="success">&#9652; 5%</IonLabel>
                        </IonChip>
					</IonItem>
					<IonCardContent>
					
					</IonCardContent>
				</IonCard>
			</IonCol>
            <IonCol size="2.5" offset="0.5">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
                        <IonCardSubtitle>115</IonCardSubtitle>
                    </IonCardHeader>
					<IonItem>
					    <IonChip>
                            <IonIcon name={locate}></IonIcon>
                            <IonLabel color="danger">&#9662; 4%</IonLabel>
                        </IonChip>
                        <IonChip>
                            <IonIcon name={calendar}></IonIcon>
                            <IonLabel color="success">&#9652; 5%</IonLabel>
                        </IonChip>
					</IonItem>
					<IonCardContent>
					
					</IonCardContent>
				</IonCard>
			</IonCol>
          
        </IonRow>
      </IonGrid>
      <IonGrid>
        <IonRow>
			<IonCol size="2">
				<IonList>
                <IonItem>Graph</IonItem>

                    {checkboxList.map(({ val, isChecked }, i) => (
                        <IonItem key={i}>
                        <IonLabel>{val}</IonLabel>
                        <IonCheckbox slot="end" value={val} checked={isChecked} />
                        </IonItem>
                    ))}
                </IonList>
			</IonCol>
            <IonCol size="8">
                    <IonTitle></IonTitle>
				
			</IonCol>
            <IonCol size="2">
                <IonList>
                    <IonItem>Filters</IonItem>
                    <IonItem><IonCheckbox slot="start"  /></IonItem>
                    <IonItem><IonCheckbox slot="start"  /></IonItem>
                    <IonItem><IonCheckbox slot="start"  /></IonItem>
                    </IonList>
			</IonCol>
        </IonRow>
      </IonGrid>
      </IonContent>

    </IonPage>
  );
};

export default Dashboard;
