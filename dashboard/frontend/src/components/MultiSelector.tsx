import React, {useState,useEffect,useRef} from 'react'
import { IonChip, IonIcon,IonList, IonLabel, IonItem, IonSearchbar, IonPopover,} from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import './MultiSelector.css'

interface ContainerProps {
    data:string[]
    useShowPopover:[boolean,Function]
}

export const MultiSelector:React.FC<ContainerProps>=({data, useShowPopover})=>{
    const select = useRef<Set<string>>(new Set())
    const [selected,setSelected] = useState<number>(0)
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('');
    useEffect(()=>{
        const query = searchText.toLowerCase();
        setFilter(query)
    },[searchText])
    
    const handleAdd=(item:string)=>{
        if(select.current.has(item)){
            select.current.delete(item)
            setSelected(a=>a-1)
        }
        else{
            select.current.add(item) 
            setSelected(a=>a+1)
        }
    }

    return <IonPopover
    isOpen={useShowPopover[0]}
    cssClass='my-custom-class'
    onDidDismiss={e => useShowPopover[1](false)}>
      <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} debounce={1000}></IonSearchbar>           
        <p>
            {[...select.current].map((item)=>{
            return <IonChip outline key={item} color="primary">
            <IonLabel>{item}</IonLabel>
            <IonIcon icon={closeCircle} onClick={()=>{handleAdd(item)}}></IonIcon>
            </IonChip>
            })}
        </p>
      <IonList id="filterlist">
        {data.map((item)=>{
          if(item.toLowerCase().indexOf(filter) <= -1){
            return null
          }
          else{
            if(select.current.has(item)){
              return <IonItem key={item} className="listitem" color="secondary" onClick={()=>{handleAdd(item)}}>{item}</IonItem>
            }
            else{return <IonItem key={item} className="listitem" onClick={()=>(handleAdd(item))}>{item}</IonItem>}
          }
        })}
        <IonItem>{selected} selected</IonItem>
      </IonList>
    </IonPopover>
}