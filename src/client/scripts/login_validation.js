let email = document.getElementById("login_email_input");
let password = document.getElementById("login_password_input");

function login(){
    console.log("Testy man")
    // check if any input is empty
    if(isEmpty(email.value) || isEmpty(password.value)){
        alert("One or more fields are empty!");
        return false;
    }

    // check if email is in correct format
    if(!checkEmailIsValid(email.value)){
        alert("Email is not in correct format!");
        return false;
    }

    verifyCredentialsWithServer({
        "action": "login",
        "email": email.value,
        "password": password.value
    });
}

function clearInputs(){
    email.value = "";
    password.value = "";
}