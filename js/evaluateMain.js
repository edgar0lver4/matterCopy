import Middleware from './middleware.js';
import UI from './ui.js';
import HTTP from './http.js';

var checking = '';
document.addEventListener('DOMContentLoaded',()=>{
    checkLogin();
    let http = new HTTP(location.search);
    let ui = new UI();
    ui.generateSkills(http.$_GET('invitation'));
    
});
document.getElementById('signoutBtn').addEventListener('click',(event)=>{
    event.preventDefault();
    signOut();
});
function listenIsLogin(){
    checking = setInterval(() =>{ checkLogin(); },5000);
}


function checkLogin(){
    let id = localStorage.getItem("Id");
    let user=localStorage.getItem("name");
    let email=localStorage.getItem("user");

    let middleware = new Middleware(id,email,user);
    if(middleware.isLogin()){
        listenIsLogin();
    }else{
        if(middleware.logout()){
            clearInterval(checking);
            window.location = 'index.html';
        }
    }
}

function signOut(){
    let id = localStorage.getItem("Id");
    let user=localStorage.getItem("name");
    let email=localStorage.getItem("user");

    let middleware = new Middleware(id,email,user);
    console.log('clickeado');
    if(middleware.logout()){
        clearInterval(checking);
        window.location = 'index.html';
    }
}