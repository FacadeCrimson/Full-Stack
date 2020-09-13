import {processCsvData,KeplerGlSchema,addDataToMap} from 'kepler.gl';
import { Store } from 'redux';

export const customize =function(store:Store,csv:string,conf:object) {
    // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    const data = processCsvData(csv);
    // Create dataset structure
    const dataset = {
      data,
      info: {
      // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
      // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
      id: 'my_data'
      }
    };
    const config=conf;

    const loadedData = KeplerGlSchema.load(
      dataset,
      config
    );

    store.dispatch(addDataToMap({
      datasets: dataset,
      config: loadedData.config,
      options: {
        centerMap: false
      }
    }));
  };