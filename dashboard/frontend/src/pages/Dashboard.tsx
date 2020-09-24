import React,{useState,useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonSelect, IonSelectOption, IonButton, IonInput,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonList,IonItemDivider,
	IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol,IonRadioGroup,IonRadio,
	} from '@ionic/react';
import './Dashboard.css';
import {doesFileExist, fetchData} from '../components/Function';
import {EmbeddedMap ,SaveConfigButton, DownloadConfigButton, UploadConfigButton} from '../components/MapComponents';
import nycTrips from '../components/data/nyc-trips.csv';
import config from '../components/data/nyc-config.json';
import ReactFileReader from 'react-file-reader';
import {StatisticCard} from '../components/StatisticCard'
import {LeafletMap} from '../components/Leaflet'

enum graphList {
    Kepler="Kepler Map",
    Leaflet="Leaflet Map",
    Pie="Pie Chart",
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          
          <IonItem slot="end">
            <IonSelect interface="popover">
                <IonSelectOption value="week">Last Week</IonSelectOption>
                <IonSelectOption value="month">Last Month</IonSelectOption>
                <IonSelectOption value="year">Last Year</IonSelectOption>
                <IonSelectOption value="all">From Inception</IonSelectOption>
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
                    <IonItem>Dataset</IonItem>
                    {(Object.keys(list).length===0 || !list)?<IonItem>No Data Yet</IonItem>:
                        Object.keys(list).map((key)=>(<IonItem key={list[key]}>
                            <IonText className="data" onClick={()=>handleClick(list[key])}>{list[key].split('.')[0]}</IonText>
                            <IonButton slot="end" color="danger" onClick={()=>handleDelete(list[key])}>Delete</IonButton>
                            </IonItem>))
                    }          
                    <IonItemDivider>Map Config</IonItemDivider>                 
                        <SaveConfigButton name={current}></SaveConfigButton>
                        <DownloadConfigButton name={current}></DownloadConfigButton>
                        <UploadConfigButton name={current}></UploadConfigButton>
                
                    <IonItemDivider>Data Upload</IonItemDivider>
                    <IonItem>
                        <IonInput placeholder={name} value={name} onIonChange={handleChange} required></IonInput>
                        <ReactFileReader handleFiles={handleUpload} fileTypes={'.csv'}>
                        <IonButton>Upload</IonButton>
                        </ReactFileReader>
                    </IonItem>
                    </IonList>
			</IonCol>
            <IonCol sizeLg="8" size="12" pullLg="2" className="canvas">
                {
                    switchGraph(graph,data,conf)
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

function switchGraph(graph:graphList, data:string, conf:object){
    switch(graph){
        case "Kepler Map":
            return <EmbeddedMap csv={data} conf={conf}></EmbeddedMap>
        case "Leaflet Map":
            return <LeafletMap markersData={markers}></LeafletMap>
        case "Pie Chart":
            return <></>
        case "Line Chart":
            return <></>
        default:
            return <EmbeddedMap csv={data} conf={conf}></EmbeddedMap>
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