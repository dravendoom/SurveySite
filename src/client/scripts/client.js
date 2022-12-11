let socket = io();

connectToServer();

function connectToServer(){

    if(
        (!window.location.href.includes("index.html")
        && !window.location.href.includes("survey_feed.html")
        && !window.location.href.includes("login.html")
        && !window.location.href.includes("sign_up.html")
        ) && getAuthCookies().status === "AUTH_NULL"){
        window.location.assign("../layout/sign_up.html");
        alert("Please Sign Up or Login to continue");
    }

    socket.on("connection", (socket)=>{

    });

    socket.on("welcome_message", (message)=>{

    });

    socket.on("disconnect", (reason)=>{
        console.log("Client disconnect: " + reason);
    })
}

// cookie util functions
function storeCookie(key, value){
    document.cookie = key+"="+value;
}

function getCookie(key){
    let cookies = document.cookie.split(";");
    let cookieRegex = RegExp(key);

    for(let i = 0; i < cookies.length; i++){
        let possibleMatch = cookieRegex.test(cookies[i]);
        if(possibleMatch){
            return cookies[i].replace(key+"=", "")
                .replace(";","")
                .trimStart()
                .trimEnd();
        }
    }

    return null;
}

function removeCookie(key){
    document.cookie = key + "=; expires=Wed, 30 Nov 2022 01:00:00 UTC";
}

// auth cookie util functions
    // sets auth cookies
function storeAuthCookies(authJSON){
    storeCookie("status", "AUTH_SET");
    storeCookie("uid", authJSON.uid);
    storeCookie("userName", authJSON.userName);
    storeCookie("email", authJSON.email);
    storeCookie("organization", authJSON.organization);
}

    // returns auth cookie json
function getAuthCookies(){
    let status, uid, userName, email, organization;

    status = getCookie("status");
    uid = getCookie("uid");
    userName = getCookie("userName");
    email = getCookie("email");
    organization = getCookie("organization");

    if(status === null || uid === null || userName === null || email === null || organization === null){
        return {
            status: "AUTH_NULL",
        };
    } else {
        return {
            status: status,
            uid: uid,
            userName: userName,
            email: email,
            organization: organization
        };
    }
}
    // removes auth cookies (IE: logout)
function removeAuthCookies(){
    let status, uid, userName, email, organization;

    status = getCookie("status");
    uid = getCookie("uid");
    userName = getCookie("userName");
    email = getCookie("email");
    organization = getCookie("organization");

    if(status !== null){
        console.log("removing cookie");
        removeCookie("status");
    }

    if(uid !== null){
        removeCookie("uid");
    }

    if(userName !== null){
        removeCookie("userName");
    }

    if (email !== null){
        removeCookie("email");
    }

    if (organization !== null){
        removeCookie("organization");
    }
}