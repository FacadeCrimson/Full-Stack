import React, { useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCheckbox, IonText,IonButton, IonSelect, IonSelectOption,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonList,IonItemDivider,
	IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol
	} from '@ionic/react';
import { locate, calendar } from 'ionicons/icons';
import './Dashboard.css';
import {store, Kepler} from '../components/Kepler';
import {KeplerCus1} from '../components/KeplerCus1';
import ReactDOM from 'react-dom';
import * as KeplerGl from 'kepler.gl';

const checkboxList = [
    { val: 'Pie Chart', isChecked: true },
    { val: 'Bar Chart', isChecked: false },
    { val: 'Line Chart', isChecked: false }
  ];

const Dashboard: React.FC = () => {
    useEffect(()=>{
        KeplerCus1(KeplerGl, store);
        ReactDOM.render(Kepler, document.getElementById('map'));
      })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          
          <IonItem slot="end">
            <IonSelect interface="popover">
                <IonSelectOption value="nes">NES</IonSelectOption>
                <IonSelectOption value="n64">Nintendo64</IonSelectOption>
                <IonSelectOption value="ps">PlayStation</IonSelectOption>
                <IonSelectOption value="genesis">Sega Genesis</IonSelectOption>
                <IonSelectOption value="saturn">Sega Saturn</IonSelectOption>
                <IonSelectOption value="snes">SNES</IonSelectOption>
            </IonSelect>
              <IonLabel> Last Month</IonLabel>
          </IonItem>
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonGrid>
        <IonRow>
			<IonCol sizeMd="2.5" offsetMd="0.5" size="5" offset="1">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
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
            <IonCol sizeMd="2.5" offsetMd="0.5" size="5" offset="1">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
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
            <IonCol sizeMd="2.5" offsetMd="0.5" size="5" offset="1">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
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
            <IonCol sizeMd="2.5" offsetMd="0.5" size="5" offset="1">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
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

        <IonRow>
			<IonCol sizeMd="2" offsetMd="0" size="5" offset="1">
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
            <IonCol sizeMd="2" offsetMd="0" pushMd="8" size="5" offset="1">
                <IonList>
                    <IonItem>Filters</IonItem>
                    <IonItem><IonCheckbox slot="start"  /></IonItem>
                    <IonItem><IonCheckbox slot="start"  /></IonItem>
                    <IonItem><IonCheckbox slot="start"  /></IonItem>
                    </IonList>
			</IonCol>
            <IonCol sizeMd="8" size="12" pullMd="2" className="canvas">
                <div id="map">abc</div>
				
			</IonCol>
           
        </IonRow>
        <IonItemDivider></IonItemDivider>
        <IonRow>
			<IonCol size="3">
                <IonText>
                    Text...
                </IonText>		
			</IonCol>
            <IonCol size="6">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Correlation</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
			</IonCol>
            <IonCol size="3">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Mentions</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
                
			</IonCol>
        </IonRow>
      </IonGrid>
      </IonContent>

    </IonPage>
  );
};

export default Dashboard;
