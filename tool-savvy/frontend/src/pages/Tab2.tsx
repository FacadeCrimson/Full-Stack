import React,{useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuToggle, IonIcon, IonButton,
   IonMenu, IonList, IonListHeader, IonLabel, IonItem, IonSearchbar, IonFooter} from '@ionic/react';
import './Tab2.css';
import Category from '../components/CategoryGrid'
import { menu,home } from 'ionicons/icons';

const Tab2: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('');
  useEffect(()=>{
    const query = searchText.toLowerCase();
    setFilter(query)

  },[searchText])
  return (<IonPage className="ion-page" id="main-content">
        <IonMenu content-id="main-content">
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent>
              <IonList>
                <IonListHeader>
                  Navigate
                </IonListHeader>
                <IonMenuToggle auto-hide="false">
                  <IonItem button>
                    <IonIcon slot="start" icon={home}></IonIcon>
                    <IonLabel>
                      Home
                    </IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </IonList>
            </IonContent>
        </IonMenu>
     
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuToggle>
            <IonButton>
              <IonIcon slot="icon-only" icon={menu}></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>Searchbar</IonTitle>
        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} debounce={1000}></IonSearchbar>
      </IonToolbar>
    
    </IonHeader>
    <IonContent className="ion-padding">
      <h1>Main Content</h1>
      <p>Click the icon in the top left to toggle the menu.</p>
      <Category filter={filter}></Category>
        
        <IonFooter>
        <IonToolbar>
          Search Text: {filter ?? '(none)'}
        </IonToolbar>
        </IonFooter>
    </IonContent>
  </IonPage>
  );
};

export default Tab2;