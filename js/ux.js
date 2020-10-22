var skillsValues = [];
var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

window.onriseze = ()=>{
	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let pt = (600/h)*100;
    let pl = (600/w)*100;
    let nl = (100-pl)/2;
    let nt = (100-pt)/2;
    const feedbackModal = document.getElementById('modalFeedback');
    if(feedbackModal != null && typeof(feedbackModal) !== undefined){
        feedbackModal.style.left = nl;
        feedbackModal.style.top  = nt;
    }
}

function activeOptions(id,index){
    //console.log(id+" - "+index);
    for(let i = 1; i <= 5; i++){
        const skill = document.getElementById('skill_'+id+'_'+i);
              skill.className = 'col-lg-2 col-md-2 col-sm-2 mr-1 option rounded';
    }
    for(let i = 1; i <= index; i++){
        const skill = document.getElementById('skill_'+id+'_'+i);
              skill.className = 'col-lg-2 col-md-2 col-sm-2 mr-1 option option-active rounded';
    }
}
function addSkillScore(id,index,value){
    let newDataSkills = [];
    const skillData = {idSkill:id,indexVal:index,val:value};
    if(skillsValues.find(data => data.idSkill == id)){
        skillsValues.forEach((data) =>{ 
            if(data.idSkill != id)
                newDataSkills.push(data);
            else
                newDataSkills.push(skillData);
        })
        skillsValues = newDataSkills;
    }else{
        skillsValues.push(skillData);
    }
    
    //console.log(skillsValues);
}
function restartSkills(id){
    if(skillsValues.length == 0){
        for(let i = 1; i <= 5; i++){
            const skill = document.getElementById('skill_'+id+'_'+i);
                if(skill != null){
                    skill.className = 'col-lg-2 col-md-2 col-sm-2 mr-1 option rounded';
                }
        }
    }else{
        skillsValues.forEach((data) => {
            for(let i = 1; i <= 5; i++){
                if(data.indexVal >= i){
                    const skill = document.getElementById('skill_'+data.idSkill+'_'+i);
                        if(skill != null)
                            skill.className = 'col-lg-2 col-md-2 col-sm-2 mr-1 option option-active rounded';
                }else{
                    const skill = document.getElementById('skill_'+data.idSkill+'_'+i);
                        if(skill != null)
                            skill.className = 'col-lg-2 col-md-2 col-sm-2 mr-1 option rounded';
                }
            }
        })
    }
}

async function valueSkill(invitationId,idSkill,score,idElem){
    //console.log(invitationId+" - " + idSkill + " - "+ score);
    const data = {score:score};
    let action = await fetch(`https://matter-app.herokuapp.com/api/v1/invitations/${invitationId}/skills/${idSkill}`,{method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(data)});
    let respons= await action.status == 200 ? true : false;
    if(respons != false){
        let elemRemove = document.getElementById(idElem);
            elemRemove.parentElement.removeChild(elemRemove);
    }else{
        console.log("Error");
    }
}

function decreaseTotalSkill(){
    let total = document.getElementById('totalSkillsEvaluate').getAttribute("matter-sk-total");
    ntotal = parseInt(total)-1;
    if(ntotal <= 0){
        ntotal = 0;
        document.getElementById('returnHome').innerHTML = '<a href="./perfil.html">Return to home</a>';
    }
    document.getElementById('totalSkillsEvaluate').innerHTML = ntotal;
    document.getElementById("totalSkillsEvaluate").removeAttribute("matter-sk-total");
    document.getElementById("totalSkillsEvaluate").setAttribute("matter-sk-total",ntotal);
}

async function viewInvitationEvaluated(idInvitation){
    let pt = (600/h)*100;
    let pl = (600/w)*100;
    let nl = (100-pl)/2;
    let nt = (100-pt)/2;
    console.log(idInvitation);
    let getFeedback = await fetch(`http://matter-app.herokuapp.com/api/v1/invitations/${idInvitation}/feedback`);
    let feedbackRqs = await getFeedback.json();

    const createTabsFeedback = document.createElement('div');
        createTabsFeedback.id = 'modalFeedback';
        createTabsFeedback.style.width='600px';
        createTabsFeedback.style.height='600px';
        createTabsFeedback.style.zIndex= '101';
        createTabsFeedback.style.background="#fff";
        createTabsFeedback.style.display = 'flex';
        createTabsFeedback.style.position= 'fixed';
        createTabsFeedback.style.left = nl+'%';
        createTabsFeedback.style.top = nt+'%';
        createTabsFeedback.style.borderRadius = '10px';
        createTabsFeedback.style.boxShadow = '0px 0px 5px #AFAFAF';
        createTabsFeedback.style.flexDirection = 'column';
        createTabsFeedback.style.padding='10px';

    document.body.appendChild(createTabsFeedback);
    
    const createCourtain = document.createElement('div');
        createCourtain.id = 'courtain';
        createCourtain.onclick=()=>{
            let objectDelete = document.getElementById('courtain');
            let objectDelete2= document.getElementById('modalFeedback');
            objectDelete.parentNode.removeChild(objectDelete);  
            objectDelete2.parentNode.removeChild(objectDelete2);
        }
        createCourtain.style.zIndex = '100';
        createCourtain.style.opacity= '0.5';
        createCourtain.style.background='#000';
        createCourtain.style.width = '100%';
        createCourtain.style.height= '100%';
        createCourtain.style.display='flex';
        createCourtain.style.position='fixed';
        createCourtain.style.top = '0px';
        createCourtain.style.left= '0px';
    
    document.body.appendChild(createCourtain);
    const feedbacks = document.getElementById('modalFeedback');
    feedbacks.innerHTML=`<h2>Feedback invitation ${idInvitation}</h2>`;
    await Promise.all(feedbackRqs.map(async (invitation) => {
        let feedback = `<div class="d-flex flex-row"><div class="col-4 col-sm-4 col-md-4 col-lg-4">${invitation.name} :</div><div class="col-4 col-sm-4 col-md-4 col-lg-4"> ${invitation.pivot.score}</div></div>`;
        feedbacks.innerHTML += feedback;

    }));

}

document.addEventListener('DOMContentLoaded',(e)=>{
    const windowsInfor = document.getElementsByClassName('window-info');
    for(let i = 0; i < windowsInfor.length; i++){
        if(windowsInfor[i].getAttribute("matter-load") == "true"){
            windowsInfor[i].innerHTML = '<center><img src="../media/load.gif" width="120px" height="100px"></center>';
        }
    }    
})
