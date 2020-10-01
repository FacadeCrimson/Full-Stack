import {decode} from 'polyline'

export default function getDirection(origin:string, destination:string){
    const url = 'https://maps.googleapis.com/maps/api/directions/json?origin="'+origin+'"&destination="'+destination+'"'
}