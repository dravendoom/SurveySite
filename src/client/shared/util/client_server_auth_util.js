function verifyCredentialsWithServer(userCredentialsJson){
    socket.emit("verify_credentials", userCredentialsJson);

    socket.on("verify_credentials_result", (message)=>{
        if (message){
            console.log("USER AUTHENTICATED AND CREATED");
            window.location.assign("../layout/survey_library.html");
        } else {
            alert("Server rejected the authentication");
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