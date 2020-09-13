import React, {useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
	IonItem, IonIcon, IonLabel, IonButton, IonGrid, IonRow, IonCol
	} from '@ionic/react';
import { pin, wifi} from 'ionicons/icons';
import './Tab1.css';

const Tab1: React.FC = () => {
	const [data,setData] = useState<String>()
	useEffect(() => {
        async function fetchData() {
                // let myHeaders = new Headers()
                // myHeaders.append('Content-Type','application/json')
                // const requestOptions = {
                // method: 'GET',
                // body: JSON.stringify(body),
                // headers: myHeaders,
                // redirect: 'follow'
                // }
				const response = await fetch(`${process.env.REACT_APP_BACKEND}/test`)
				console.log(response)
				setData(await response.text())
        }
        fetchData()
      }, []
     )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          
        <IonCard>
            <IonCardHeader>
				<IonCardSubtitle>Card Subtitle</IonCardSubtitle>
				<IonCardTitle>About</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
			        	<div>This is a dashboard app for Basil Labs	</div>
            </IonCardContent>
        </IonCard>

		<IonGrid>
        <IonRow>
			<IonCol size="12"  sizeMd="3" offsetMd="1">
          <IonCard>
            <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonButton fill="outline" slot="end">View</IonButton>
            </IonItem>
            <IonCardContent>
            {data?data:"Nothing to display yet!"}
            </IonCardContent>
          </IonCard>
			</IonCol>
      <IonCol size="12"  sizeMd="3" offsetMd="1">
          <IonCard>
            <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonButton fill="outline" slot="end">View</IonButton>
            </IonItem>
            <IonCardContent>
            This is content, without any paragraph or header tags,
            within an ion-cardContent element.
            </IonCardContent>
          </IonCard>
      </IonCol>
          	<IonCol size="12"  sizeMd="3" offsetMd="1">
		  		<IonCard>
					<IonItem>
					<IonIcon icon={pin} slot="start" />
					<IonButton fill="outline" slot="end">View</IonButton>
					</IonItem>
					<IonCardContent>
					This is content, without any paragraph or header tags,
					within an ion-cardContent element.
					</IonCardContent>
				</IonCard>
          	</IonCol>
        </IonRow>
      </IonGrid>
      <IonCard>
        <IonItem href="/test" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>Test</IonLabel>
        </IonItem>
      </IonCard>
      <IonCard>
        <IonItem href="/dashboard" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>Dashboard</IonLabel>
        </IonItem>
      </IonCard>
      </IonContent>

    </IonPage>
  );
};

export default Tab1;
