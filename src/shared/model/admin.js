// ABILITY TO HIDE CONTENT
let PWNER = 0;
// EVERYTHING FROM ABOVE and ABILITY TO DELETE CONTENT
let SUPER_PWNER = 1;
// EVERYTHING FROM ABOVE and ABILITY TO DELETE ANY USER
let ULTIMATE_PWNER = 2;

class Admin extends User{

    constructor(uid, username, email, privilege){
        super(uid, username, email);
        this.privilege = privilege;
    }

    toJson(){
        return {
            "uid" : this.uid,
            "username" : this.username,
            "email" : this.email,
            "privileges" : this.privileges
        };
    }

}