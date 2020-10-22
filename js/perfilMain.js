import Middleware from './middleware.js';
import UI from './ui.js';
import User from './users.js';
import FeedBack from './feedbacks.js';
var checking = '';

document.addEventListener('DOMContentLoaded',checkLogin());
document.addEventListener('DOMContentLoaded',()=>{
    const ui = new UI();
    const userInfo = new User('view',localStorage.getItem("Id"));
    if(document.getElementById('skills') != null){
        ui.generateSkillsViews(localStorage.getItem("Id"));
    }
    userInfo.getUserInfo()
    .then((resp) =>{
        if(resp){
            const userNameTag = document.getElementsByClassName('userName');
            userNameTag.innerHTML = userInfo.getName();

            const userNameEdit= document.getElementById('nameEdit');
            if(userNameEdit != null && typeof(userNameEdit) !== undefined){
                userNameEdit.value = userInfo.getName();
            }
            const userEmailEdit = document.getElementById('emailEdit');
            if(userEmailEdit != null && typeof(userEmailEdit) !== undefined){
                userEmailEdit.value = userInfo.getEmail();
            }
            if(typeof(document.getElementsByClassName('userName')[0]) !== undefined && document.getElementsByClassName('userName')[0] != null){
                const labelsName = document.getElementsByClassName('userName');
                for(let i = 0; i < labelsName.length; i++){
                    labelsName[i].innerHTML = userInfo.getName();
                }
            }
            
        }
    })
    const changeBtn = document.getElementById('frmBtnEdit');
    if(typeof(changeBtn) !== undefined && changeBtn != null){
        changeBtn.addEventListener('submit',(e)=>{
            e.preventDefault();
            chageInformation();
        });
    }
    const mailInviteBtn = document.getElementById('inviteBtn');
    if(mailInviteBtn != null && typeof(mailInviteBtn) !== undefined){
        mailInviteBtn.addEventListener('click',(e)=>{
            sendInvitation();
        })
    }
    const viewAllRequest = document.getElementById('list-all');
    if(viewAllRequest != null && typeof(viewAllRequest) !== undefined){
        const viewRequestRecived = document.getElementById('list-recived');
        const viewRequestPending = document.getElementById('list-pending');
        const viewRequestComplete= document.getElementById('list-complete');
        let feedback = new FeedBack(localStorage.getItem("Id"));
        let feedback2 = feedback.initFeedback();
        feedback2[0].then(()=>{
            feedback.getAllFeedbacks(viewAllRequest);
        });
        feedback2[1].then(()=>{
            feedback.getFeedbackRecived(viewRequestRecived);
            feedback.getFeedbackPending(viewRequestPending);
            feedback.getFeeedbackCompleted(viewRequestComplete);
        })
        //ui.getAllRequest(localStorage.getItem("Id"),viewAllRequest);
        //ui.getRequestRecived(localStorage.getItem("Id"),viewRequestRecived);
    }
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

function chageInformation(){
    const editEmail = document.getElementById('emailEdit').value;
    const editName  = document.getElementById('nameEdit').value;
    const editPassw = document.getElementById('currentPassoword').value;
    const editPassn = document.getElementById('newPassoword').value;
    const editPassc = document.getElementById('cnewPassoword').value;

    if(editPassw == '' || editPassw == null){
        let userEdited = new User('edit',editEmail,null,editName,localStorage.getItem("Id"));
            userEdited.editUser()
            .then((resp) =>{
                if(resp){
                    Swal.fire(
                        'Success',
                        "User edited",
                        'success'
                    ); 
                }
            });
    }else{
        if(editPassn == editPassc){
            const userChekPass = new User('login',editEmail,editPassw);
            userChekPass.loginUser()
            .then((resp)=>{
                if(resp){
                    let userEdited = new User('edit',editEmail,editPassn,editName,localStorage.getItem("Id"));
                        userEdited.editUser()
                        .then((resp) =>{
                            if(resp){
                                Swal.fire(
                                    'Success',
                                    "User edited",
                                    'success'
                                ); 
                            }
                        });    
                }else{
                    Swal.fire(
                        'Error!',
                        "Password is incorrect",
                        'error'
                    ) ;
                }
            });
        }else{
            Swal.fire(
                'Error!',
                "Passwords don't match",
                'error'
            );
        }
    }
}
function sendInvitation(){
    const ui = new UI();
    let mail = document.getElementById('mailUserInvited').value;
    ui.sendInvitation(localStorage.getItem("Id"),mail)
    .then((resp) =>{
        if(resp){
            Swal.fire(
                'Success',
                "Invitation sended",
                'success'
            );
            document.getElementById('mailUserInvited').value = ''; 
        }else{
            Swal.fire(
                'Error',
                "Please check that the email is correct",
                'success'
            );
        }
    });
}