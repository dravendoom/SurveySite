class User {
    constructor(uid, username, email, dob, password) {
        this.uid = uid;
        this.username = username;
        this.email = email;
        // optional values
        this.dob = dob;
        this.password = password;
    }

    toActionJson(action){
        let actionJson = this.toJson();
        actionJson.action = action;
        return actionJson;
    }

    toJson(){
        return {
            "uid" : this.uid,
            "username" : this.username,
            "email" : this.email,
            "dob": this.dob,
            "password" : this.password
        };
    }

    getUid(){
        return this.uid;
    }

    getUsername(){
        return this.username;
    }

    getEmail(){
        return this.email;
    }

    getDob(){
        return this.dob;
    }

    getPassword(){
        return this.password;
    }
}