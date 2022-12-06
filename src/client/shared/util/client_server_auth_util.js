function verifyCredentialsWithServer(userCredentialsJson){
    socket.emit("verify_credentials", userCredentialsJson);

    socket.on("verify_credentials_result", (message)=>{
        if (message.result){
            window.location.assign("../layout/survey_library.html");
            storeAuthCookies({
                status: message.result,
                uid: message.uid,
                userName: message.userName,
                birthDate: message.birthDate,
                email: message.email,
                organization: message.organization
            });
        } else {
            alert(message.reason);
        }
    });
}

function verifyLogoutWithServer(userCredentialsJson){
    console.log("verifying log out")
    socket.emit("verify_logout", userCredentialsJson);

    socket.on("verify_logout_result", (message)=>{
        console.log("THE MESSAGE: " + message)
        if (message.result){
            console.log("log out verified")
            removeAuthCookies();
            window.location.assign("../layout/index.html");
        } else {
            alert(message.reason);
        }
    });
}

function isEmpty(inputText){
    return inputText === "";
}

function checkPasswordsMatch(password, confirmPassword){
    return password === confirmPassword;
}

// only checks if email is in valid format, not if it actually exists anywhere
function checkEmailIsValid(email){
    let emailRegex = /.+@.+\..+/i;
    return emailRegex.test(email);
}

// checks that password meets minimum requirements
// MINIMUM REQS: 1 upper case letter, 1 number, length 8
function checkPasswordMeetsRequirements(password){
    let passwordUpperCaseRegex = /.*[A-Z]+.*/;
    let passwordNumberRegex = /.*[0-9]+.*/;

    if(!passwordUpperCaseRegex.test(password)
        || !passwordNumberRegex.test(password)
        || password.length < 8) return false;

    return true;
}