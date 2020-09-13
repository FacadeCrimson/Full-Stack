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