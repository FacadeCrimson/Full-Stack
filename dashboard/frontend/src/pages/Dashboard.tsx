import React,{useState,useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCheckbox, IonText, IonSelect, IonSelectOption, IonButton, IonInput,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonList,IonItemDivider,
	IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol
	} from '@ionic/react';
import { locate, calendar } from 'ionicons/icons';
import './Dashboard.css';
import {doesFileExist} from '../components/Function';
import {EmbeddedMap ,SaveConfigButton} from '../components/MapComponents';
import nycTrips from '../components/data/nyc-trips.csv';
import config from '../components/data/nyc-config.json';
import ReactFileReader from 'react-file-reader';

const checkboxList = [
    { val: 'Pie Chart', isChecked: true },
    { val: 'Bar Chart', isChecked: false },
    { val: 'Line Chart', isChecked: false }
  ];

const Dashboard: React.FC = () => {
    const [data,setData]=useState<any>(nycTrips);
    const [conf,setConf]=useState<object>(config);
    const [name,setName]=useState<string>("default");
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

    const handleFiles = (files:any) => {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            setData(reader.result)
        }
        reader.readAsText(files[0]);
    }

    const handleUpload = async (files:any) => {
        const url = process.env.REACT_APP_BACKEND+'/uploaddata'
        var reader = new FileReader();
        reader.onload = async function(e) {
            // Use reader.result
                var fd = new FormData()
                fd.append('name', name)
                fd.append('type', "data")
                fd.append('file', new Blob([reader.result as ArrayBuffer]))

                await fetch(url, {
                method: 'POST',
                body: fd
                })
                setName("default")
                await fetchData(setList)
        }
        reader.readAsArrayBuffer(files[0]);
    }

    useEffect(() => {
        fetchData(setList)
      }, [current])

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
        <IonRow>
			<IonCol sizeLg="2" offsetLg="0.8" sizeSm="4.5" offsetSm="1" size="12">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
                        <IonCardSubtitle>115</IonCardSubtitle>
                    </IonCardHeader>
					<IonItem>
					    <IonChip>
                            <IonIcon icon={locate} className="small"></IonIcon>
                            <IonLabel color="danger">&#9662; 4%</IonLabel>
                        </IonChip>
                        <IonChip>
                            <IonIcon icon={calendar} className="small"></IonIcon>
                            <IonLabel color="success">&#9652; 5%</IonLabel>
                        </IonChip>
					</IonItem>
					<IonCardContent>
					
					</IonCardContent>
				</IonCard>
			</IonCol>
            <IonCol sizeLg="2" offsetLg="0.8" sizeSm="4.5" offsetSm="1" size="12">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
                        <IonCardSubtitle>115</IonCardSubtitle>
                    </IonCardHeader>
					<IonItem>
					    <IonChip>
                            <IonIcon icon={locate}></IonIcon>
                            <IonLabel color="danger">&#9662; 4%</IonLabel>
                        </IonChip>
                        <IonChip>
                            <IonIcon icon={calendar}></IonIcon>
                            <IonLabel color="success">&#9652; 5%</IonLabel>
                        </IonChip>
					</IonItem>
					<IonCardContent>
					
					</IonCardContent>
				</IonCard>
			</IonCol>
            <IonCol sizeLg="2" offsetLg="0.8" sizeSm="4.5" offsetSm="1" size="12">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
                        <IonCardSubtitle>115</IonCardSubtitle>
                    </IonCardHeader>
					<IonItem>
					    <IonChip>
                            <IonIcon icon={locate}></IonIcon>
                            <IonLabel color="danger">&#9662; 4%</IonLabel>
                        </IonChip>
                        <IonChip>
                            <IonIcon icon={calendar}></IonIcon>
                            <IonLabel color="success">&#9652; 5%</IonLabel>
                        </IonChip>
					</IonItem>
					<IonCardContent>
					
					</IonCardContent>
				</IonCard>
			</IonCol>
            <IonCol sizeLg="2" offsetLg="0.8" sizeSm="4.5" offsetSm="1" size="12">
				<IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Num of Reviews</IonCardTitle>
                        <IonCardSubtitle>115</IonCardSubtitle>
                    </IonCardHeader>
					<IonItem>
					    <IonChip>
                            <IonIcon icon={locate}></IonIcon>
                            <IonLabel color="danger">&#9662; 4%</IonLabel>
                        </IonChip>
                        <IonChip>
                            <IonIcon icon={calendar}></IonIcon>
                            <IonLabel color="success">&#9652; 5%</IonLabel>
                        </IonChip>
					</IonItem>
					<IonCardContent>
					
					</IonCardContent>
				</IonCard>
			</IonCol>
          
        </IonRow>

        <IonRow>
			<IonCol sizeMd="2" offsetMd="0" size="5" offset="1">
				<IonList>
                <IonItem>Graph</IonItem>

                    {Object.keys(checkboxList).map((key, i) => (
                        <IonItem key={i}>
                        <IonLabel>{checkboxList[key].val}</IonLabel>
                        <IonCheckbox slot="end" value={checkboxList[key].val} checked={checkboxList[key].isChecked} />
                        </IonItem>
                    ))}
                </IonList>
			</IonCol>
            <IonCol sizeMd="2" offsetMd="0" pushMd="8" size="5" offset="1">
                <IonList>
                    <IonItem>Dataset</IonItem>
                    {(list.length===0 || !list)?<IonItem>No Data Yet</IonItem>:
                        Object.keys(list).map((key)=>(<IonItem key={list[key]}>
                            <IonText className="data" onClick={()=>handleClick(list[key])}>{list[key].split('.')[0]}</IonText>
                            <IonButton slot="end" color="danger" onClick={()=>handleDelete(list[key])}>Delete</IonButton>
                            </IonItem>))
                    }          
                    <IonItem>
                        <SaveConfigButton name={current}></SaveConfigButton>
                    </IonItem>
                    <IonItem>
                        <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                            <IonButton>Tempo Upload</IonButton>
                        </ReactFileReader>
                    </IonItem>
                    <IonItemDivider></IonItemDivider>
                    <IonItem>
                        <IonLabel>FileName</IonLabel>
                        <IonInput placeholder={name} value={name} onIonChange={handleChange} required></IonInput>
                        <ReactFileReader handleFiles={handleUpload} fileTypes={'.csv'}>
                        <IonButton>Upload</IonButton>
                        </ReactFileReader>
                    </IonItem>
                       
                    </IonList>
			</IonCol>
            <IonCol sizeMd="8" size="12" pullMd="2" className="canvas">
                <EmbeddedMap csv={data} conf={conf}></EmbeddedMap>
				
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


async function fetchData(setList:Function) {
    const url=process.env.REACT_APP_BACKEND+'/getdatalist'
    // const token = await  getAccessTokenSilently()
    // var myHeaders = new Headers()
    // myHeaders.append("Authorization", `Bearer ${token}`)
    // var requestOptions = {
    // method: 'GET',
    // headers: myHeaders,
    // redirect: 'follow'
    // }
    fetch(url).then(response => response.json())
    .then(data => {
        setList(data)
    })}