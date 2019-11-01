
let baseUrl = "https://mawD1nNf.api.lncld.net";
var sessionToken = null;


function loginRequest(account,password) {

    let loginMap = {
        "username":account,
        "password":password,
    };
    let heads = {
        "X-LC-Id":"mawD1nNfec9ssngKlMKUl32F-gzGzoHsz",
        "X-LC-Key":"zjEY8jWIn5zXUEQigCSShal9",
        "Content-Type":"application/json",
    };

    const result = httpInit("POST","/1.1/login",loginMap);
    if (result != null) {
        const json = JSON.parse(result);
        if (json["username"] == account) {
            sessionToken = json["sessionToken"];
            return json;
        }
        return null;
    }
    return null;
}

function changeRequest(newUrl) {

    let settings = {
        "show_url":newUrl
    };

    const result = httpInit("PUT","/1.1/classes/OutClass/5db11ca5eaa3750073397b92",settings);
    if (result != null) {
        const json = JSON.parse(result);
        if (json["code"] == null||json["code"] == 0) {

            return json;
        }
        return null;

    }
    return null;
}

function loadShowUrl() {

    const result = httpInit("GET","/1.1/classes/OutClass/5db11ca5eaa3750073397b92",null);
    if (result != null) {
        const json = JSON.parse(result);
        return json;
    }
    return null;
}

function httpInit(method,url,data) {

    url = baseUrl+url;
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open(method,url,false);
    xmlHttp.setRequestHeader("X-LC-Id","mawD1nNfec9ssngKlMKUl32F-gzGzoHsz");
    xmlHttp.setRequestHeader("X-LC-Key","zjEY8jWIn5zXUEQigCSShal9");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    if (sessionToken != null) {
        xmlHttp.setRequestHeader("X-LC-Session",sessionToken);
    }
    xmlHttp.send(JSON.stringify(data));

    if (xmlHttp.readyState == 4) {
        return xmlHttp.responseText;
    } else {
        console.log(xmlHttp.readyState);
        console.log(xmlHttp.status);
        console.log("error"+xmlHttp.responseText);
        return null;
    }
/*
    console.log("data = "+JSON.parse(data));
    var http = axios({
        method:method,
        baseUrl: "https://mawD1nNf.api.lncld.net",
        url,
        timeout:10000,
        contentType:"application/json;charset=utf-8",
        headers:{
            // "X-Requested-With":"XMLHttpRequest",
            "X-LC-Id":"mawD1nNfec9ssngKlMKUl32F-gzGzoHsz",
            "X-LC-Key":"zjEY8jWIn5zXUEQigCSShal9",
            "X-LC-Session":sessionToken,

        },
        data:'{"username":"1","password":"1"}',
    });
    return http;
    */
}