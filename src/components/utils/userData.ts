import { json } from "express";
import { getCredentials } from "../../functions/funct";
export class User {
    username : string;
    email : string;
    id : string;
    currentUser(username : string, email : string, id : string):void{
        this.username = username;
        this.email = email;
        this.id = id;
    }
}



export async function fetchCredentials(){
    if(localStorage.getItem("userId")){
        let userId = localStorage.getItem("userId");
        let userData = await getCredentials(userId);
        if(userData){
        const { username, email, _id: id } = userData;
        let user: User = new User();
        user.currentUser(username, email, id)
        saveUser(user);
        return user;
        }
    }
    return null;
}

function saveUser(user: User):void{
    localStorage.setItem("User",JSON.stringify(user));
}
export function getUser() : User | null{
    const currentUser = localStorage.getItem("User");
    if(currentUser){
        const {username, email, id} = JSON.parse(currentUser);
        let user = new User();
        user.currentUser(username, email, id);
        return user;

    }
    return null;

}

export function clearUser(): void {
    localStorage.removeItem("currentUser");
}
export {}