import React,{useState,useEffect,useRef} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonSelect, IonSelectOption, 
        IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList,IonItemDivider, IonItem,
        IonLabel, IonGrid, IonRow, IonCol,IonRadioGroup,IonRadio} from '@ionic/react';
import './Dashboard.css';
import {doesFileExist, fetchData} from '../components/Function';
import {EmbeddedMap ,SaveConfigButton, DownloadConfigButton, UploadConfigButton} from '../components/MapComponents';
import nycTrips from '../components/data/nyc-trips.csv';
import config from '../components/data/nyc-config.json';
import ReactFileReader from 'react-file-reader';
import {StatisticCard} from '../components/StatisticCard'
import {Leaflet1, Leaflet3,Leaflet4} from '../components/Leaflet'
import {GraphWrapper} from '../components/D3Graph'
import {store} from '../components/Kepler';
import {MultiSelector} from '../components/MultiSelector'
import {subGroup, parentGroup, topics} from '../components/FilterList'
import {csv} from 'd3'
import {nest} from 'd3-collection'
enum graphList {
    Introduction="Introduction",
    Leaflet3="Long Beach",
    Pie="Density Chart",
    Leaflet="Long Beach Areas",
    Kepler="Kepler Map",
    Leaflet4="Capital One",
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
    
    const [graph,setGraph] = useState<graphList>(graphList.Introduction)

    // const [rangeValue, setRangeValue] = useState<{
    //   lower: number;
    //   upper: number;
    // }>({ lower: 0, upper: 0 })

    const useShowPopover1 = useState(false);
    const useShowPopover2 = useState(false);
    const useShowPopover3 = useState(false);
    // const useShowPopover4 = useState(false);

    const [filter,setFilter] = useState({"topics":new Set(),"parentGroup":new Set(),"subGroup":new Set(),"subSubGroup":new Set(),"cluster":-1,"time":"all"})
    const [result,setResult] = useState({"ar":0,"bfsp":0,"btfsp":0,"sspl":0})
    const [entries,setEntries] = useState<any>(null)
    let prevResult=useRef(result)
    let totalResult:any= useRef(null)

    useEffect(()=>{
        async function preProcess(){
            const LB = await csv('/data/LongBeach.csv')
            const entries = nest()
                        .key(function(d:any) { return d.latlong; })
                        .entries(LB);
            totalResult.current = calc(entries)
        }
        preProcess()
    },[])

    useEffect(()=>{
        async function preProcess(){

            const LB = await csv('/data/LongBeach.csv')
            // console.log(min(LB,d=>parseFloat((d.Percentage_of_renting as string).substring(0,(d.Percentage_of_renting as any).length-1))),
            // max(LB,d=>parseFloat((d.Percentage_of_renting as string).substring(0,(d.Percentage_of_renting as any).length-1))))
            
            
            const LB1 = LB.filter(function(a){
                return (filter.topics.size===0 || filter.topics.has(a.topic)) &&
                ((filter.subSubGroup.has(a.sub_sub_group)) || (filter.subSubGroup.size===0)) &&
                ((filter.subGroup.has(a.sub_group)) || (filter.subGroup.size===0)) &&
                ((filter.parentGroup.has(a.parent_group) || (filter.parentGroup.size===0))) &&
                ((filter.cluster === -1) || (filter.cluster === +a.Cluster!)) &&
                ((filter.time === 'all') || (a.review_data?.indexOf(filter.time)!>-1))
            })
            const entries = nest()
                        .key(function(d:any) { return d.latlong; })
                        .entries(LB1);
            
            const newResult = calc(entries)
            setEntries(entries)
            setResult(newResult)
        }
        preProcess()
    },[filter])

    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          
          <IonItem slot="end">
              <IonLabel>Time Period</IonLabel>
            <IonSelect interface="popover" className="select" placeholder="All Time" onIonChange={e => {setFilter({...filter,"time":e.detail.value});}}>
                <IonSelectOption value="day">Last Week</IonSelectOption>
                <IonSelectOption value="week">Last Month</IonSelectOption>
                <IonSelectOption value="month">Last Year</IonSelectOption>
                <IonSelectOption value="all">All Time</IonSelectOption>
            </IonSelect>
          </IonItem>
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonGrid>
        <StatisticCard result={result} prevResult={prevResult} totalResult={totalResult}></StatisticCard>
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

                    :(graph==="Long Beach" || "Density Chart")?<>
                    <IonItem>Filter</IonItem>
                    <IonItem>
                        <IonLabel>Topic</IonLabel>
                        <IonButton slot="end" onClick={() => {prevResult.current=result;useShowPopover1[1](true)}}>&#9662;</IonButton>
                    </IonItem>
                    <MultiSelector data={topics} name="topics" useShowPopover={useShowPopover1} filter={[filter,setFilter]}></MultiSelector>
                    <IonItem>
                        <IonLabel>Industry Group</IonLabel>
                        <IonButton slot="end" onClick={() => {prevResult.current=result;useShowPopover2[1](true)}}>&#9662;</IonButton>
                    </IonItem>
                    <MultiSelector data={parentGroup} name="parentGroup" useShowPopover={useShowPopover2} filter={[filter,setFilter]}></MultiSelector>
                    <IonItem>
                        <IonLabel>Industry Sub-group</IonLabel>
                        <IonButton slot="end" onClick={() => {prevResult.current=result;useShowPopover3[1](true)}}>&#9662;</IonButton>
                    </IonItem>
                    <MultiSelector data={subGroup} name="subGroup" useShowPopover={useShowPopover3} filter={[filter,setFilter]}></MultiSelector>

                    {/* <IonItem>
                        <IonLabel>Sub-subgroup</IonLabel>
                        <IonButton slot="end" onClick={() => {prevResult.current=result;useShowPopover4[1](true)}}>&#9662;</IonButton>
                    </IonItem>
                    <MultiSelector data={subSubGroup} name="subSubGroup" useShowPopover={useShowPopover4} filter={[filter,setFilter]}></MultiSelector>
                    <IonItemDivider>Cluster <IonButton slot="end" onClick={() => {setFilter({...filter,"cluster":-1});}}>Reset</IonButton></IonItemDivider>
                    <IonItem>
                            <IonRange pin={true} value ={filter['cluster']} min={-1} max={299} step={1} debounce={600}
                             onIonChange={e => {setFilter({...filter,"cluster":e.detail.value as number});}} />
                    </IonItem> */}
                    </>

                    :<>

                    {/* <IonItemDivider>Passenger Count</IonItemDivider>
                        <IonItem>
                            <IonRange pin={true} dualKnobs={true} min={0} max={6} step={1} debounce={600}
                            snaps={true} onIonChange={e => setRangeValue(e.detail.value as any)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel>Value: lower: {rangeValue.lower} upper: {rangeValue.upper}</IonLabel>
                        </IonItem> */}
                    </>
                    }
            
                </IonList>
			</IonCol>
            <IonCol sizeLg="8" size="12" pullLg="2" className="canvas">
                {
                    switchGraph(graph,data,conf,entries)
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

function switchGraph(graph:graphList, data:string, conf:object,entries:any){
    switch(graph){
        case "Introduction":
            return <div id="intro" style={{backgroundImage: "url(/assets/rainbowharborsunset.jpg",backgroundPosition:"center top",backgroundSize:"auto 800px"}}>
                    <IonCard id="introcard">
                        <IonCardHeader>
                            <IonCardTitle>Introduction<img id="logo" src="/assets/city-logo.png" alt="logo"></img></IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonText><br></br>
                                <p className="introtext">This is a dashboard to visualize the geospatial data for Long Beach businesses.</p>
                            <p className="introtext">The data includes business score percentile we derive which measures the business vulnerability.</p>
                            <p className="introtext">The most important tab in graph selector is Long Beach with all relevant data painted.</p>
                            <p className="introtext">The Density Chart is also worth checking as it pictures the distribution of filtered data.</p>
                            <p className="introtext">Long Beach Areas, Kepler Map and Capital One are some explorations on other data.</p></IonText>
                        </IonCardContent>
                    </IonCard>
                     </div>
        case "Kepler Map":
            return <EmbeddedMap store={store} data={data} conf={conf}></EmbeddedMap>
        case "Long Beach Areas":
            return <Leaflet1></Leaflet1>
        case "Long Beach":
            return <Leaflet3 entries={entries}></Leaflet3>
        case "Capital One":
            return <Leaflet4></Leaflet4>
        case "Density Chart":
            return <GraphWrapper entries={entries}></GraphWrapper>
        default:
            return <Leaflet3 entries={entries}></Leaflet3>
    }
}

function calc(entries:any):any{
    const n = entries.length
    let sum_ar = 0
    let sum_bfsp = 0
    let sum_rw = 0
    let sum_sspl = 0
     for(let i of entries){
         if(i.values[0] && !isNaN(i.values[0].avg_review)){
             sum_ar+=(+i.values[0].avg_review)
         }
         if(i.values[0] && !isNaN(i.values[0].business_final_score_percentile)){
             sum_bfsp+=(+i.values[0].business_final_score_percentile)
         }
         if(i.values[0] && !isNaN(i.values[0].business_topic_final_score_percentile)){
            sum_rw+=(+i.values[0].num_reviews)
        }
        if(i.values[0] && !isNaN(i.values[0].sent_score_pred_label)){
            sum_sspl+=(+i.values[0].sent_score_pred_label)
        }
    }
    return{"ar":Math.round((sum_ar/n + Number.EPSILON) * 100) / 100,
            "bfsp":Math.round((sum_bfsp/n + Number.EPSILON) * 100) / 100,
            "btfsp":Math.round((sum_rw/n + Number.EPSILON) * 100) / 100,
            "sspl":Math.round((sum_sspl/n + Number.EPSILON) * 100) / 100}
}