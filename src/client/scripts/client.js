let socket = io();

connectToServer();

function connectToServer(){
    socket.on("connection", (socket)=>{

    });

    socket.on("welcome_message", (message)=>{

    });
}

function getSocket(){
    return socket;
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
            return cookies[i].replace(key+"=", "").replace(";","");
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
    let uid, status, userName, email, organization;

    uid = getCookie("uid");
    status = getCookie("status");
    userName = getCookie("userName");
    email = getCookie("email");
    organization = getCookie("organization");

    if(status === null || userName === null || email === null || organization === null){
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
    let uid, status, userName, email, organization;

    uid = getCookie("uid");
    status = getCookie("status");
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