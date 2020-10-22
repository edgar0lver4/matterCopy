var skillsValues = [];
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

document.addEventListener('DOMContentLoaded',(e)=>{
    const windowsInfor = document.getElementsByClassName('window-info');
    for(let i = 0; i < windowsInfor.length; i++){
        if(windowsInfor[i].getAttribute("matter-load") == "true"){
            windowsInfor[i].innerHTML = '<center><img src="../media/load.gif" width="120px" height="100px"></center>';
        }
    }    
})
