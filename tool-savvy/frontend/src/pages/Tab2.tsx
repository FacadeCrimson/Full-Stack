import React,{useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuToggle, IonIcon, IonButton,
         IonItem, IonSearchbar, IonFooter} from '@ionic/react';
import './Tab2.css';
import { menu } from 'ionicons/icons';
import Category from '../components/CategoryGrid'
import Menu from '../components/Menu'

// Category Tab
export default function Tab2(){
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('');
  useEffect(()=>{
    const query = searchText.toLowerCase();
    setFilter(query)
  },[searchText])

  return (<IonPage className="ion-page" id="main-content">
            <Menu></Menu>

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
              <Category filter={filter}></Category>
            </IonContent>

            <IonFooter>
              <IonToolbar>
                <IonItem>Search Text: {filter ? filter :" No filter"}</IonItem>
              </IonToolbar>
            </IonFooter>
          </IonPage>
  )
}