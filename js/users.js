export default class User {
    constructor(){
        this.finded = false;   
        if(arguments[0] == 'view'){
            this.id = arguments[1];
        }else if(arguments[0] == 'create'){
            this.name = arguments[1];
            this.email= arguments[2];
            this.password = arguments[3];
        }else if(arguments[0] == 'edit'){
            this.email = arguments[1];
            this.password = arguments[2];
            this.name = arguments[3];
            this.id = arguments[4];
        }else if(arguments[0] == 'login'){
            this.email = arguments[1];
            this.password = arguments[2];
        }else{
            this.restriction = 1; //No permite crear usuarios
        }
    }

    setUserInformation(user){
        this.id = user.id;
        this.name = user.name;
        this.email= user.email;
        this.emailverified = user.email_verified_at;
        this.create_at = user.created_at;
        this.updated_at= user.updated_at;
    }
    getId(){
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail(){
        return this.email;
    }
    getUserInfo(){
        return fetch('https://matter-app.herokuapp.com/api/v1/users/'+this.id)
        .then(resp => resp.json())
        .then((resp) => {
            this.setUserInformation(resp);
            return true;
        });
    }
    createUser(){
        if(this.restriction != 1){
            const datas = {name:this.name, email:this.email, password:this.password};
            console.log(datas);
            return fetch('https://matter-app.herokuapp.com/api/v1/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datas)
            })
            .then((resp) => resp.json())
            .then(data => {
                this.id = data.id;
                this.name = data.name;
                this.email= data.email;
                return true;
            })
            .catch(error =>{ return false; })
        }else{
            return false;
        }
    }
    loginUser(){
        const email = this.email;
        const passw = this.password;
        const datLog= {email:email,password:passw};

        return fetch('https://matter-app.herokuapp.com/api/v1/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datLog)
        })
        .then((resp) =>{
            if(resp.status == 200){
                return resp.json();
            }else{
                return false;
            }
        })
        .then((data) => {
            if(data != false){
                this.setUserInformation(data);
                return true;
            }else{
                return false;
            }
        });
    }
    editUser(){
        let dataEdited = '';
        if(this.password == null){
            dataEdited = {email:this.email,name:this.name};
        }else{
            dataEdited = {email:this.email,name:this.name,password:this.password};
        }
        //console.log(dataEdited);
        return fetch('https://matter-app.herokuapp.com/api/v1/users/'+this.id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataEdited)
        })
        .then((resp)=>{
            if(resp.status == 200){
                return true;
            }else{
                return false;
            }
        })

    }
}