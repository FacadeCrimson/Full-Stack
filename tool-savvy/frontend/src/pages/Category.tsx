import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonNote, IonIcon, IonRow, IonGrid, IonCol,
          IonList, IonItem, IonItemDivider} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { returnDownForwardOutline} from 'ionicons/icons';
import './Category.css'

interface UserProps extends RouteComponentProps<{
    name: string;
  }> {}

const subcategory:string[] = []

const specificuse:string[] = ["listen to music","music recommendation", "listening to music free"]

const tools1:string[] = ["Spotify","Apple Music","Amazon Music", "Idagio", "LiveXLive", "Pandora","PrimePhonic","SiriusXM","Tidal","Youtube Music"]

const Category: React.FC<UserProps> = ({match}) => {

  const handleClick=(item:string)=>{
    const toollist =document.getElementById(item)
    if(toollist && toollist.classList.contains('ion-hide')){
      toollist.classList.remove('ion-hide');
    }
    else{
      if(toollist){
        toollist.classList.add('ion-hide')
      }
    }

  }
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonTitle>{match.params.name}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow className="subcategorycontainer">
              <IonCol sizeLg="3" sizeSm="6" size="12" className="subcategory">
                Hello
              </IonCol>
              <IonCol sizeLg="3" sizeSm="6" size="12" className="subcategory">
                Hello
              </IonCol>
              <IonCol sizeLg="3" sizeSm="6" size="12" className="subcategory">
                Hello
              </IonCol>
              <IonCol sizeLg="3" sizeSm="6" size="12" className="subcategory">
                Hello
              </IonCol>
              <IonCol sizeLg="3" sizeSm="6" size="12" className="subcategory">
                Hello
              </IonCol>
              <IonCol sizeLg="3" sizeSm="6" size="12" className="subcategory">
                Hello
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonList>
           { specificuse.map((item)=>{
             return <>
                   <IonItem onClick={(e)=>{e.preventDefault();handleClick(item)}} button detail className='clickable ion-activatable'>
                        {item}
                   </IonItem>
                   <IonList id={item} className="ion-hide">
                       {tools1.map((item)=>{
                          return <IonItem key={item}>
                                    <IonIcon icon={returnDownForwardOutline}></IonIcon>
                                      &nbsp;&nbsp;{item}
                                    <IonNote slot="end">23</IonNote>
                                </IonItem>
                      })}
                   </IonList>
                   </>
           })}
          </IonList>
          <IonItemDivider></IonItemDivider>
          <IonList>
            <IonItem>Popular Tools</IonItem>
            {tools1.map((item)=>{
              return <IonItem key={item}>{item}</IonItem>
            })}
          </IonList>
          <IonItemDivider></IonItemDivider>
          <IonList>
            <IonItem>Related categories</IonItem>
            <IonItem>Movie</IonItem>
            <IonItem>Entertaiment</IonItem>
            <IonItem>Game</IonItem>
            <IonItem>Reading</IonItem>
          </IonList>
        </IonContent>
    </IonPage>
  );
};

export default Category;
