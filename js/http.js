export default class HTTP{
    constructor(url){
        this.url = url;
        console.log(url);
    }
    $_GET(key){
        key = key.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
        let regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
        let results = regex.exec(this.url);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g," "));
    }
}