class Admin{

    constructor(uid, username, email, password){
        this.uid = uid;
        this.username = username;
        this.email = email;
        this.password = password;
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

    getPassword(){
        return this.password;
    }

}