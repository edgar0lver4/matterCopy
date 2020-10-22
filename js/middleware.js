export default class Middleware {
    constructor(id,email,user){
        this.id = id;
        this.email = email;
        this.name = user;
    }
    isLogin(){
        if(this.id != null && this.email != null && this.name != null)
            return true;
        else
            return false;
    }
    setIsLogin(val){
        this.isLoginVal = val;
    }
    getIsLogin(){
        return this.isLoginVal;
    }
    logout(){
        localStorage.removeItem("Id");
        localStorage.removeItem("name");
        localStorage.removeItem("user");
        this.id = null;
        this.email = null;
        this.name = null;
        return true;
    }
}