let firstName, lastName, birthDate, organization, emailText, password, confirmPassword;

firstName = document.getElementById("first_name_input");
lastName = document.getElementById("last_name_input");
birthDate= document.getElementById("birthdate_input");
organization = document.getElementById("org_name_input");
emailText = document.getElementById("email_input");
password = document.getElementById("password_input");
confirmPassword = document.getElementById("password_confirm_input");

/*
Does a basic minimum criteria check of inputted credentials and then asks server
if credentials are okay to proceed creating an account with verifyCredentialsWithServer()
 */
function validateInputs(){
    console.log(firstName.value +
        lastName.value +
        birthDate.value +
        organization.value +
        emailText.value +
        password.value +
        confirmPassword.value);

    // check if any input is empty
    if(isEmpty(firstName.value)
        || isEmpty(lastName.value)
        || isEmpty(birthDate.value)
        || isEmpty(organization.value)
        || isEmpty(emailText.value)
        || isEmpty(password.value)
        || isEmpty(confirmPassword.value)
    ){
        alert("One or more fields are empty!");
        return false;
    }

    // check if email is in correct format
    if(!checkEmailIsValid(emailText.value)){
        alert("Email is not in correct format!");
        return false;
    }

    // check if password meets minimum requirements
    if(!checkPasswordMeetsRequirements(password.value)){
        alert("Password does not meet minimum requirements");
        return false;
    }

    // check if passwords match
    if(!checkPasswordsMatch(password.value, confirmPassword.value)){
        alert("Passwords do not match");
        return false;
    }

    removeAuthCookies();
    verifyCredentialsWithServer({
        "action": "SIGN_UP",
        "userName": firstName.value + " " + lastName.value,
        "birthDate": birthDate.value,
        "organization": organization.value,
        "email": emailText.value,
        "password": password.value,
    });
}

function clearInputs(){
    firstName.value = "";
    lastName.value = "";
    birthDate.value = "";
    organization.value = "";
    emailText.value = "";
    password.value = "";
    confirmPassword.value = "";
}