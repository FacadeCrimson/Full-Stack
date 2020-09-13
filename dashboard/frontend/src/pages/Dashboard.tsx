import React,{useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCheckbox, IonText, IonSelect, IonSelectOption, IonButton,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonList,IonItemDivider,
	IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol
	} from '@ionic/react';
import { locate, calendar } from 'ionicons/icons';
import './Dashboard.css';
import EmbeddedMap from '../components/EmbeddedMap';
import nycTrips from '../components/data/nyc-trips.csv';
import nycTripsSubset from '../components/data/nyc-subset.csv';
import ReactFileReader from 'react-file-reader';

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

    const handleFiles = (files:any) => {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            setData(reader.result)
        }
        reader.readAsText(files[0]);
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          
          <IonItem slot="end">
            <IonSelect interface="popover">
                <IonSelectOption value="week">Last Week</IonSelectOption>
                <IonSelectOption value="month">Last Month</IonSelectOption>
                <IonSelectOption value="year">Last Year</IonSelectOption>
                <IonSelectOption value="all">From Inception</IonSelectOption>
            </IonSelect>
          </IonItem>
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonGrid>
        <IonRow>
			<IonCol sizeLg="2" offsetLg="0.8" sizeSm="4.5" offsetSm="1" size="12">
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
            <IonCol sizeLg="2" offsetLg="0.8" sizeSm="4.5" offsetSm="1" size="12">
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
            <IonCol sizeLg="2" offsetLg="0.8" sizeSm="4.5" offsetSm="1" size="12">
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
            <IonCol sizeLg="2" offsetLg="0.8" sizeSm="4.5" offsetSm="1" size="12">
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
                    <IonItem className="select" onClick={()=>{replaceData("1")}}>Sample Dataset 1</IonItem>
                    <IonItem className="select" onClick={()=>{replaceData("2")}}>Sample Dataset 2</IonItem>
                    <IonItem>
                        <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                            <IonButton>Upload</IonButton>
                        </ReactFileReader>
                    </IonItem>
                    </IonList>
			</IonCol>
            <IonCol sizeMd="8" size="12" pullMd="2" className="canvas">
                <EmbeddedMap csv={data}></EmbeddedMap>
				
			</IonCol>
           
        </IonRow>
        <IonItemDivider></IonItemDivider>
        <IonRow>
			<IonCol sizeMd="3" offsetMd="0" size="10" offset="1">
                <IonText>
                    Text...
                </IonText>		
			</IonCol>
            <IonCol sizeMd="6" offsetMd="0" size="10" offset="1">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Correlation</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
			</IonCol>
            <IonCol sizeMd="3" offsetMd="0" size="10" offset="1">
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
