export function doesFileExist(url:string) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, false);
    xhr.send();
     
    if (xhr.status === 404) {
        return false;
    } else {
        return true;
    }
}

export async function fetchData(setList:Function) {
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

export function downloadJsonFile(jsonData:Object, filename:string) {
    const fileBlob = new Blob([
      JSON.stringify(jsonData, null, 2),
    ], {type: 'application/json'});
    const url = URL.createObjectURL(fileBlob);
  
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }