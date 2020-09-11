import React, {useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonRouterOutlet,
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
				<div>There is a famous saying that goes: "Don't be obsessed with tools." and another one: "I suppose it is tempting, if the only tool you have is a hammer, to treat everything as if it were a nail."
					<p>This app aims to help you become savvy about tools, and in turn, be a master of tools.</p>
					<p>After all, it's what we accomplish with tools that matters.</p>
				</div>
            </IonCardContent>
        </IonCard>

		<IonGrid>
        <IonRow>
			<IonCol size="3" offset="1">
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
          	<IonCol size="3" offset="1">
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
          	<IonCol size="3" offset="1">
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
        <IonItem href="/about" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>About</IonLabel>
        </IonItem>
      </IonCard>
	  <IonCard>
        <IonItem href="/comp1" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>Component1</IonLabel>
        </IonItem>
      </IonCard>
	  <IonCard>
        <IonItem href="/comp2" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>Component2</IonLabel>
        </IonItem>
      </IonCard>

      <IonCard>
        <IonItem href="/user/1" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>User1</IonLabel>
        </IonItem>
      </IonCard>
      <IonCard>
        <IonItem href="/user/2" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>User2</IonLabel>
        </IonItem>
      </IonCard>
      <IonCard>
        <IonItem href="/test" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>Test</IonLabel>
        </IonItem>
      </IonCard>
      </IonContent>

      <IonFooter>
          <IonToolbar>
            <IonTitle >Footer</IonTitle >
          </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tab1;
