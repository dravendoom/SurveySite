let email = document.getElementById("login_email_input");
let password = document.getElementById("login_password_input");

function login(){
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
        "action": "LOGIN",
        "email": email.value,
        "password": password.value
    });
}

function logout(){
    console.log("log out")
    let user = new User(getAuthCookies().uid, getAuthCookies().userName, getAuthCookies().email, null, null);
    verifyLogoutWithServer(user.toActionJson("LOGOUT"));
}

function clearInputs(){
    email.value = "";
    password.value = "";
}