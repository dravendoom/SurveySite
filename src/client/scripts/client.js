let socket = io();

connectToServer();

function connectToServer(){
    socket.on("connection", (socket)=>{
        console.log("Successfully connected!");
    });

    socket.on("welcome_message", (message)=>{
        console.log("Message from server: " + message);
    });
}

function getSocket(){
    return socket;
}