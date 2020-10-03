import React,{useState,useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonSelect, IonSelectOption, 
        IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonList,IonItemDivider, IonItem, 
        IonLabel, IonGrid, IonRow, IonCol,IonRadioGroup,IonRadio, IonRange} from '@ionic/react';
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
import {MultiSelector} from '../components/MultiSelector'
import {subSubGroup, subGroup, parentGroup, topics} from '../components/FilterList'

enum graphList {
    Kepler="Kepler Map",
    Leaflet="Long Beach Areas",
    Leaflet2="New York",
    Leaflet3="Long Beach",
    Leaflet4="Capital One",
    Pie="Density Chart",
    Line="Line Chart"
}

const Dashboard: React.FC = () => {
    const [timeRange,setTimeRange] = useState<string>('all')
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

    const useShowPopover1 = useState(false);
    const useShowPopover2 = useState(false);
    const useShowPopover3 = useState(false);
    const useShowPopover4 = useState(false);
    const [cluster, setCluster] = useState(0)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          
          <IonItem slot="end">
              <IonLabel>Time Period</IonLabel>
            <IonSelect interface="popover" className="select" placeholder="All Time" onIonChange={e => setTimeRange(e.detail.value)}>
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
                        <IonButton slot="end" onClick={() => useShowPopover1[1](true)}>&#9662;</IonButton>
                    </IonItem>
                    <MultiSelector data={topics} useShowPopover={useShowPopover1}></MultiSelector>
                    <IonItem>
                        <IonLabel>Parent Group</IonLabel>
                        <IonButton slot="end" onClick={() => useShowPopover2[1](true)}>&#9662;</IonButton>
                    </IonItem>
                    <MultiSelector data={parentGroup} useShowPopover={useShowPopover2}></MultiSelector>
                    <IonItem>
                        <IonLabel>Sub Group</IonLabel>
                        <IonButton slot="end" onClick={() => useShowPopover3[1](true)}>&#9662;</IonButton>
                    </IonItem>
                    <MultiSelector data={subGroup} useShowPopover={useShowPopover3}></MultiSelector>

                    <IonItem>
                        <IonLabel>Sub-subgroup</IonLabel>
                        <IonButton slot="end" onClick={() => useShowPopover4[1](true)}>&#9662;</IonButton>
                    </IonItem>
                    <MultiSelector data={subSubGroup} useShowPopover={useShowPopover4}></MultiSelector>
                    <IonItem>
                            <IonRange pin={true} value ={cluster} min={0} max={299} step={1} debounce={600}
                             onIonChange={e => setCluster(e.detail.value as number)} />
                    </IonItem>
                    </>

                    :<>
                    <IonItem>Filter</IonItem>
                    <IonItem>
                        <IonLabel>Topic</IonLabel>
                        <IonSelect multiple={true} interface="popover" className="select" slot="end" value={topic} onIonChange={e => setTopic(e.detail.value)}>
                    </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Subcategory</IonLabel>
                        <IonSelect multiple={true} interface="popover" className="select" slot="end" value={subcat} onIonChange={e => setSubcat(e.detail.value)}>
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
        case "Long Beach Areas":
            return <Leaflet1></Leaflet1>
        case "New York":
            return <Leaflet2 data={data}></Leaflet2>
        case "Long Beach":
            return <Leaflet3></Leaflet3>
        case "Capital One":
            return <Leaflet4></Leaflet4>
        case "Density Chart":
            return <GraphWrapper data={data} rangeValue={rangeValue}></GraphWrapper>
        case "Line Chart":
            return <></>
        default:
            return <EmbeddedMap store={store} data={data} conf={conf}></EmbeddedMap>
    }
}