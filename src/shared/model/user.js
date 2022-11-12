class User {
    constructor(uid, username, email) {
        this.uid = uid;
        this.username = username;
        this.email = email;
    }

    toJson(){
        return {
          "uid" : this.uid,
          "username" : this.username,
          "email" : this.email
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
}