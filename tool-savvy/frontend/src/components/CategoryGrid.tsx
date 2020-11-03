import React,{useEffect} from 'react';
import { IonContent, IonCard, IonCardHeader,	IonItem, IonIcon, IonLabel,  
  IonGrid, IonRow, IonCol} from '@ionic/react';
import { headset,camera,cart,gift } from 'ionicons/icons';
import './CategoryGrid.css'
import {CategoryCard} from './CategoryCard'

interface ContainerProps {
  filter:string
}

const Category: React.FC<ContainerProps> = ({filter}) => {
  useEffect(()=>{
    const categories=document.getElementsByClassName("category") as HTMLCollectionOf<HTMLElement>
    if(filter===""){
      for(let i = 0; i < categories.length; i++) { 
        categories[i].classList.remove('ion-hide');
      }
      return
    }
    for(let j = 0; j < categories.length; j++) {
      if(categories[j].id.toLowerCase().indexOf(filter) <= -1){
        categories[j].classList.add('ion-hide');
      }else{
        categories[j].classList.remove('ion-hide');
      }
    }
    return
  },[filter])

  return (
      <IonContent fullscreen>
        <IonGrid>
            <IonRow>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="category ion-text-center" id="music">
                    <IonCard href="/category/music" className="ion-activated">
                      <IonCardHeader className="header">
                        <IonIcon icon={headset} className="pic"></IonIcon>
                      </IonCardHeader>   
                        <IonItem className="ion-text-center">
                           <IonLabel className="title">Music</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="category ion-text-center" id="photo">
                  <IonCard href="/category/music" className="ion-activated"> 
                    <IonCardHeader className="header">
                      <IonIcon icon={camera} className="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem className="ion-text-center">
                           <IonLabel className="title">Photo</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="category ion-text-center" id="shopping">
                  <IonCard href="/category/music" className="ion-activated">
                    <IonCardHeader className="header">
                      <IonIcon icon={cart} className="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem className="ion-text-center">
                           <IonLabel className="title">Shopping</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg="3" offsetLg="0" sizeSm="6" offsetSm="0" size="10" offset="1" className="category ion-text-center" id="gift">
                    <IonCard href="/category/music" className="ion-activated">
                    <IonCardHeader className="header">
                      <IonIcon icon={gift} className="pic"></IonIcon>
                      </IonCardHeader>
                        <IonItem className="ion-text-center">
                           <IonLabel className="title">Gift</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonCol>
                <CategoryCard category="movies"></CategoryCard>
                <CategoryCard category="travel"></CategoryCard>
                <CategoryCard category="sports"></CategoryCard>
                <CategoryCard category="news"></CategoryCard>
                <CategoryCard category="learning"></CategoryCard>
                <CategoryCard category="games"></CategoryCard>
                <CategoryCard category="socializing"></CategoryCard>
                <CategoryCard category="productivity"></CategoryCard>
                <CategoryCard category="mating"></CategoryCard>
                <CategoryCard category="cleaning"></CategoryCard>
            </IonRow>
        </IonGrid>
      </IonContent>

  );
};

export default Category;
