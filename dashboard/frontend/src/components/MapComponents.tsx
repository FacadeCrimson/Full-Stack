import React, { useEffect} from 'react';
import ReactDOM from 'react-dom';
import {store, Kepler} from './Kepler';
import {customize} from './KeplerLoadData';
import {IonButton} from '@ionic/react';
import {KeplerGlSchema} from 'kepler.gl';

interface ContainerProps {
    csv: string;
    conf:object;
}

export const EmbeddedMap: React.FC<ContainerProps> = ({csv,conf}) => {
    useEffect(()=>{
        customize(store,csv,conf);
        ReactDOM.render(Kepler, document.getElementById('map'));
      })

  return (<div id="map"></div>);
};

export const SaveConfigButton: React.FC = () => {
    const handleSave = ()=>{
      const newConfig = KeplerGlSchema.getConfigToSave(store.getState().keplerGl.map)
      console.log(typeof newConfig)
      console.log(newConfig)
    }
    return <IonButton onClick={handleSave}>Save Current Config</IonButton>
  }
  