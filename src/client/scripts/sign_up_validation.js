let firstName, lastName, birthDate, organization, email, password, confirmPassword;

firstName = document.getElementById("first_name_input");
lastName = document.getElementById("last_name_input");
birthDate= document.getElementById("birthdate_input");
organization = document.getElementById("organization_input");
email = document.getElementById("email_input");
password = document.getElementById("password_input");
confirmPassword = document.getElementById("confirm_password_input");

/*
Does a basic minimum criteria check of inputted credentials and then asks server
if credentials are okay to proceed creating an account with verifyCredentialsWithServer()
 */
function validateInputs(){

    console.log(firstName.value +
        lastName.value +
        birthDate.value +
        organization.value +
        email.value +
        password.value +
        confirmPassword.value);

    // check if any input is empty
    if(isEmpty(firstName.value)
        || isEmpty(lastName.value)
        || isEmpty(birthDate.value)
        || isEmpty(organization.value)
        || isEmpty(email.value)
        || isEmpty(password.value)
        || isEmpty(confirmPassword.value)
    ){
        alert("One or more fields are empty!");
        return false;
    }

    // check if passwords match
    if(!checkPasswordsMatch(password.value, confirmPassword.value)){
        return false;
    }

    verifyCredentialsWithServer({
        "action": "sign_up",
        "firstName": firstName.value,
        "lastName": lastName.value,
        "birthDate": birthDate.value,
        "organization": organization.value,
        "email": email.value,
        "password": password.value,
    });
}

function isEmpty(inputText){
    return inputText === "";
}

function checkPasswordsMatch(password, confirmPassword){
    return password === confirmPassword;
}

// only checks if email is in valid format, not if it actually exists anywhere
function checkEmailIsValid(){
    //let emailRegex = /w*@/;
}

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

function clearInputs(){
    firstName.value = "";
    lastName.value = "";
    birthDate.value = "";
    organization.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
}