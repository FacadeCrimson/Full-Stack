import React, { useEffect} from 'react';
import ReactDOM from 'react-dom';
import {store, Kepler} from './Kepler';
import {customize} from '../components/KeplerLoadData';

interface ContainerProps {
    csv: any;
  }
const EmbeddedMap: React.FC<ContainerProps> = ({csv}) => {
    useEffect(()=>{
        customize(store,csv);
        ReactDOM.render(Kepler, document.getElementById('map'));
      })

  return (<div id="map"></div>
				
  );
};

export default EmbeddedMap;
