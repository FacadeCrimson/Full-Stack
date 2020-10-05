import React, {useState,useEffect} from 'react'
import { IonChip, IonIcon,IonList, IonLabel, IonItem, IonSearchbar, IonPopover,} from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import './MultiSelector.css'

interface ContainerProps {
    data:string[]
    useShowPopover:[boolean,Function]
    filter:any
    name:string
}

export const MultiSelector:React.FC<ContainerProps>=({data, useShowPopover,filter,name})=>{
    const [searchText, setSearchText] = useState('');
    const [target, setTarget] = useState('');
    useEffect(()=>{
        const query = searchText.toLowerCase();
        setTarget(query)
    },[searchText])
    
    const handleAdd=(item:string)=>{
        if(filter[0][name].has(item)){
            filter[1]({...filter[0],name:filter[0][name].delete(item)})
        }
        else{
          filter[1]({...filter[0],name:filter[0][name].add(item)})
        }
    }

    return <IonPopover
    isOpen={useShowPopover[0]}
    cssClass='my-custom-class'
    onDidDismiss={e => useShowPopover[1](false)}
    id={name}>
      <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} debounce={1000}></IonSearchbar>    
      <IonItem>{filter[0][name].size} selected</IonItem>       
        <p>
            {[...filter[0][name]].map((item)=>{
            return <IonChip outline key={item} color="primary">
            <IonLabel>{item}</IonLabel>
            <IonIcon icon={closeCircle} onClick={()=>{handleAdd(item)}}></IonIcon>
            </IonChip>
            })}
        </p>
        
      <IonList id="filterlist">
        {data.map((item)=>{
          if(item.toLowerCase().indexOf(target) <= -1){
            return null
          }
          else{
            if(filter[0][name].has(item)){
              return <IonItem key={item} className="listitem" color="secondary" onClick={()=>{handleAdd(item)}}>{item}</IonItem>
            }
            else{return <IonItem key={item} className="listitem" onClick={()=>(handleAdd(item))}>{item}</IonItem>}
          }
        })}
      </IonList>
    </IonPopover>
}