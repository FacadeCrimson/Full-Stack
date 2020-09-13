import React,{useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCheckbox, IonText, IonSelect, IonSelectOption,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonList,IonItemDivider,
	IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol
	} from '@ionic/react';
import { locate, calendar } from 'ionicons/icons';
import './Dashboard.css';
import EmbeddedMap from '../components/EmbeddedMap';
import nycTrips from '../components/data/nyc-trips.csv';
import nycTripsSubset from '../components/data/nyc-subset.csv';

const checkboxList = [
    { val: 'Pie Chart', isChecked: true },
    { val: 'Bar Chart', isChecked: false },
    { val: 'Line Chart', isChecked: false }
  ];
 const mapping:{ [id: string]: any } ={
    1:nycTrips,
    2:nycTripsSubset
 }

const Dashboard: React.FC = () => {
    const [data,setData]=useState<any>(nycTrips);

    const replaceData=(id:string)=>{
        setData(mapping[id])
    }

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
                    <IonItem>Dataset</IonItem>
                    <IonItem className="select" onClick={()=>{replaceData("1")}}>Dataset 1</IonItem>
                    <IonItem className="select" onClick={()=>{replaceData("2")}}>Dataset 2</IonItem>
                    </IonList>
			</IonCol>
            <IonCol sizeMd="8" size="12" pullMd="2" className="canvas">
                <EmbeddedMap csv={data}></EmbeddedMap>
				
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
