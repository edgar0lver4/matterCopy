import User from './users.js';

document.addEventListener('DOMContentLoaded',()=>{
    var el = document.getElementById('loginBtn');
    if(typeof(el) !== undefined && el != null){
        el.onclick = () => login();
    }
    var elr= document.getElementById('btnCreate');
    if(typeof(elr) !== undefined && elr != null){
        elr.onclick = () => create();
    }
    if(typeof(document.getElementById('loginForm')) !== undefined && document.getElementById('loginForm') != null){
        document.getElementById('loginForm').addEventListener('submit',(e)=>{
            e.preventDefault();
            login();
        })
    }
})
function create(){
    const nameCreate = document.getElementById('nameCreate').value;
    const firstNameC = document.getElementById('firstNameCreate').value;
    const emailCreat = document.getElementById('emailCreate').value;
    const passwCreat = document.getElementById('passCreate').value;
    const passcCreat = document.getElementById('passCreateConfirm').value;

    if(passcCreat == passwCreat){
        var user = new User('create',nameCreate+' '+firstNameC,emailCreat,passcCreat);
        user.createUser()
        .then(data => {
            console.log(data);
            if(data){
                localStorage.setItem("Id",user.getId());
                localStorage.setItem("user",user.getEmail());
                localStorage.setItem("name",user.getName());
                window.location = 'perfil.html';
            }else{
                Swal.fire(
                    'Error!',
                    "User haven't create, email is used",
                    'error'
                )
            }
        })
    }else{
        var respass = document.getElementById('passCreateT');
            respass.innerHTML = 'Passwords do not match';
            respass.className = 'alert-danger';
        
        document.getElementById('passCreate').className = 'alert alert-danger';
    }
}
function login(){
    const loginEmail = document.getElementById('emailLogin').value;
    const loginPassw = document.getElementById('passLogin').value;

    var user = new User('login',loginEmail,loginPassw);
    user.loginUser()
    .then((resp)=>{
        if(resp){
            localStorage.setItem("Id",user.getId());
            localStorage.setItem("user",user.getEmail());
            localStorage.setItem("name",user.getName());
            window.location = 'perfil.html';
        }else{
            Swal.fire(
                'Error!',
                "Email don't exisist into database",
                'error'
            )
        }
    })
    
}