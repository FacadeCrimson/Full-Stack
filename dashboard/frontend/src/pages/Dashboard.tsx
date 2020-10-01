import React,{useState,useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonSelect, IonSelectOption, IonButton, IonInput,
	IonCard, IonCardHeader, IonCardTitle, IonList,IonItemDivider,
	IonItem, IonLabel, IonGrid, IonRow, IonCol,IonRadioGroup,IonRadio, IonRange,IonIcon
	} from '@ionic/react';
import './Dashboard.css';
import {doesFileExist, fetchData} from '../components/Function';
import {EmbeddedMap ,SaveConfigButton, DownloadConfigButton, UploadConfigButton} from '../components/MapComponents';
import nycTrips from '../components/data/nyc-trips.csv';
import config from '../components/data/nyc-config.json';
import ReactFileReader from 'react-file-reader';
import {StatisticCard} from '../components/StatisticCard'
import {Leaflet1, Leaflet2,Leaflet3,Leaflet4} from '../components/Leaflet'
import {GraphWrapper} from '../components/D3Graph'
import {store} from '../components/Kepler';

enum graphList {
    Kepler="Kepler Map",
    Leaflet="Vancouver",
    Leaflet2="New York",
    Leaflet3="Long Beach",
    Leaflet4="Capital One",
    Pie="Density Chart",
    Line="Line Chart"
}

const Dashboard: React.FC = () => {
    const [data,setData]=useState<any>(nycTrips);
    const [conf,setConf]=useState<object>(config);
    const [name,setName]=useState<string>("input file name");
    const [list,setList]=useState<Array<string>>([]);
    const [current,setCurrent]=useState<string>('nyc-trips');

    const handleChange = (event:any)=>{
        setName(event.target.value)
    }

    const handleDelete = async (filename:string)=>{
        const url = process.env.REACT_APP_BACKEND+'/deletedata/?name='+filename
        await fetch(url)
        if(filename.split('.')[0]===current){
            setCurrent('nyc-trips')
            setData(nycTrips)
        }else{
            await fetchData(setList)
        }
    }

    const handleClick = async (filename:string)=>{
        const fname = filename.split('.')[0]
        const url1 = process.env.REACT_APP_BACKEND+'/map/data/'+filename
        const url2 = process.env.REACT_APP_BACKEND+'/map/config/'+fname+'.json'
        const config = doesFileExist(url2)
        const res1 = await fetch(url1)
        const text = await res1.text()
        setData(text)
        if(config){
            const res2 = await fetch(url2)
            const json = await res2.json()
            setConf(JSON.parse(json))
        }
        setCurrent(fname)
    }

    const handleUpload = async (files:any) => {
        const url = process.env.REACT_APP_BACKEND+'/uploaddata'
        var reader = new FileReader();
        let filename = ""
        reader.onload = async function() {
            // Use reader.result
                var fd = new FormData()
                if(name!=="input file name"){
                    fd.append('name', name)
                }else{
                    fd.append('name', filename)
                }
                fd.append('type', "data")
                fd.append('file', new Blob([reader.result as ArrayBuffer]))

                await fetch(url, {
                method: 'POST',
                body: fd
                })
                setName("input file name")
                await fetchData(setList)
        }
        if(files[0]){
            filename=files[0].name
            reader.readAsArrayBuffer(files[0]);
        }
        else{
            return
        }
    }

    useEffect(() => {
        fetchData(setList)
      }, [current])
    
    const [graph,setGraph] = useState<graphList>(graphList.Kepler)
    const [topic,setTopic] = useState<string[]>([])
    const [subcat,setSubcat] = useState<string[]>([])

    const [rangeValue, setRangeValue] = useState<{
      lower: number;
      upper: number;
    }>({ lower: 0, upper: 0 })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          
          <IonItem slot="end">
              <IonLabel>Time Period</IonLabel>
            <IonSelect interface="popover" className="select" placeholder="All Time">
                <IonSelectOption value="week">Last Week</IonSelectOption>
                <IonSelectOption value="month">Last Month</IonSelectOption>
                <IonSelectOption value="year">Last Year</IonSelectOption>
                <IonSelectOption value="all">All Time</IonSelectOption>
            </IonSelect>
          </IonItem>
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonGrid>
        <StatisticCard></StatisticCard>
        <IonRow>
			<IonCol sizeLg="2" offsetLg="0" sizeSm="4.5" offsetSm="1" size="6">
				<IonList>
                    <IonRadioGroup value={graph} onIonChange={e => setGraph(e.detail.value)}>
                        <IonItem>Graph</IonItem>
                        {
                             Object.keys(graphList).map((key, i) => (
                                <IonItem key={i}>
                                <IonLabel>{graphList[key]}</IonLabel>
                                <IonRadio slot="end" value={graphList[key]} />
                                </IonItem>
                            ))
                        }

                    </IonRadioGroup>
                </IonList>
			</IonCol>
            <IonCol sizeLg="2" offsetLg="0" pushLg="8" sizeSm="4.5" offsetSm="1" size="6">
                <IonList>
                    {(graph==="Kepler Map")?<>
                        <IonItem>Dataset</IonItem>
                    {(Object.keys(list).length===0 || !list)?<IonItem>No Data Yet</IonItem>:
                        Object.keys(list).map((key)=>(<IonItem key={list[key]}>
                            <IonText className="data" onClick={()=>handleClick(list[key])}>{list[key].split('.')[0]}</IonText>
                            <IonButton slot="end" color="danger" onClick={()=>handleDelete(list[key])}>Delete</IonButton>
                            </IonItem>))
                    }          
                    <IonItemDivider>Map Config</IonItemDivider>                 
                        <SaveConfigButton store={store} name={current}></SaveConfigButton>
                        <DownloadConfigButton store={store} name={current}></DownloadConfigButton>
                        <UploadConfigButton name={current}></UploadConfigButton>
                
                    <IonItemDivider>Data Upload</IonItemDivider>
                    <IonItem>
                        <IonInput placeholder={name} value={name} onIonChange={handleChange} required></IonInput>
                        <ReactFileReader handleFiles={handleUpload} fileTypes={'.csv'}>
                        <IonButton>Upload</IonButton>
                        </ReactFileReader>
                    </IonItem>
                    </>

                    :(graph==="Long Beach")?<>
                    <IonItem>Filter</IonItem>
                    <IonItem>
                        <IonLabel>Topic</IonLabel>
                        <IonSelect multiple={true} interface="popover" className="select" slot="end" value={topic} onIonChange={e => setTopic(e.detail.value)}>
                            {["PARKING","PRICE","STAFF","CLEANLINESS","ATMOSPHERE","CROWDEDNESS","PUBLIC_TRANSPORTATION"].map((data)=>{
                                return <IonSelectOption value={data}>{data}</IonSelectOption>
                            })}
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Subcategory</IonLabel>
                        <IonSelect multiple={true} interface="popover" className="select" slot="end" value={subcat} onIonChange={e => setSubcat(e.detail.value)}>
                        <IonSelectOption value="bird">Bird</IonSelectOption>
                        <IonSelectOption value="cat">Cat</IonSelectOption>
                        <IonSelectOption value="dog">Dog</IonSelectOption>
                        <IonSelectOption value="honeybadger">Honey Badger</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    
                    </>

                    :<>
                    <IonItem>Filter</IonItem>
                    <IonItem>
                        <IonLabel>Topic</IonLabel>
                        <IonSelect multiple={true} interface="popover" className="select" slot="end" value={topic} onIonChange={e => setTopic(e.detail.value)}>
                        <IonSelectOption value="bacon">Bacon</IonSelectOption>
                        <IonSelectOption value="olives">Black Olives</IonSelectOption>
                        <IonSelectOption value="xcheese">Extra Cheese</IonSelectOption>
                        <IonSelectOption value="peppers">Green Peppers</IonSelectOption>
                        <IonSelectOption value="mushrooms">Mushrooms</IonSelectOption>
                        <IonSelectOption value="onions">Onions</IonSelectOption>
                        <IonSelectOption value="pepperoni">Pepperoni</IonSelectOption>
                        <IonSelectOption value="pineapple">Pineapple</IonSelectOption>
                        <IonSelectOption value="sausage">Sausage</IonSelectOption>
                        <IonSelectOption value="Spinach">Spinach</IonSelectOption>
                    </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Subcategory</IonLabel>
                        <IonSelect multiple={true} interface="popover" className="select" slot="end" value={subcat} onIonChange={e => setSubcat(e.detail.value)}>
                        <IonSelectOption value="bird">Bird</IonSelectOption>
                        <IonSelectOption value="cat">Cat</IonSelectOption>
                        <IonSelectOption value="dog">Dog</IonSelectOption>
                        <IonSelectOption value="honeybadger">Honey Badger</IonSelectOption>
                        </IonSelect>
                    </IonItem>


                    <IonItemDivider>Passenger Count</IonItemDivider>
                        <IonItem>
                            <IonRange pin={true} dualKnobs={true} min={0} max={6} step={1} debounce={600}
                            snaps={true} onIonChange={e => setRangeValue(e.detail.value as any)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel>Value: lower: {rangeValue.lower} upper: {rangeValue.upper}</IonLabel>
                        </IonItem>
                    </>
                    }
            
                </IonList>
			</IonCol>
            <IonCol sizeLg="8" size="12" pullLg="2" className="canvas">
                {
                    switchGraph(graph,data,conf,rangeValue)
                    }
			</IonCol>
           
        </IonRow>
        <IonItemDivider></IonItemDivider>
        <IonRow>
			<IonCol sizeMd="3" offsetMd="0" size="10" offset="1">
                <IonText>
                    Text...
                </IonText>		
			</IonCol>
            <IonCol sizeMd="6" offsetMd="0" size="10" offset="1">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Correlation</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
			</IonCol>
            <IonCol sizeMd="3" offsetMd="0" size="10" offset="1">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Mentions</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
                
			</IonCol>
        </IonRow>
      </IonGrid>
      </IonContent>

    </IonPage>
  );
};

export default Dashboard;

function switchGraph(graph:graphList, data:string, conf:object, rangeValue:any){
    switch(graph){
        case "Kepler Map":
            return <EmbeddedMap store={store} data={data} conf={conf}></EmbeddedMap>
        case "Vancouver":
            return <Leaflet1 markersData={markers}></Leaflet1>
        case "New York":
            return <Leaflet2 data={data}></Leaflet2>
        case "Long Beach":
            return <Leaflet3 markersData={markers}></Leaflet3>
        case "Capital One":
            return <Leaflet4 markersData={markers}></Leaflet4>
        case "Density Chart":
            return <GraphWrapper data={data} rangeValue={rangeValue}></GraphWrapper>
        case "Line Chart":
            return <></>
        default:
            return <EmbeddedMap store={store} data={data} conf={conf}></EmbeddedMap>
    }
}

export interface markerData{
    latLng:[number,number]
    title:string
}

const markers:markerData[] = [
    {latLng:[51.509, -0.08], title:"number1"},
    {latLng:[51.503, -0.06], title:"number2"},
    {latLng:[51.51, -0.047], title:"number3"},
]