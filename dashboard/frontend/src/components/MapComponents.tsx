import React, { useEffect} from 'react';
import ReactDOM from 'react-dom';
import {store, Kepler} from './Kepler';
import {customize} from './KeplerLoadData';
import {IonButton} from '@ionic/react';
import {KeplerGlSchema} from 'kepler.gl';

interface ContainerProps1 {
    csv: string;
    conf:object;
}

export const EmbeddedMap: React.FC<ContainerProps1> = ({csv,conf}) => {
    useEffect(()=>{
        customize(store,csv,conf);
        ReactDOM.render(Kepler, document.getElementById('map'));
      })

  return (<div id="map"></div>);
};

interface ContainerProps2 {
  name:string
}

export const SaveConfigButton: React.FC<ContainerProps2> = ({name}) => {
    const handleSave = async ()=>{
         const newConfig = KeplerGlSchema.getConfigToSave(store.getState().keplerGl.map)
  
        const url = process.env.REACT_APP_BACKEND+'/uploadconfig'

            var fd = new FormData()
            fd.append('name', name)
            fd.append('type', "config")
            fd.append('file', JSON.stringify(newConfig))

            await fetch(url, {
            method: 'POST',
            body: fd
            })
    
    }
    return <IonButton onClick={handleSave}>Save Current Config</IonButton>
  }
  