class User {
    constructor(uid, username, email) {
        this.uid = uid;
        this.username = username;
        this.email = email;
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