export default class UI{
    constructor(){

    }
    generateSkills(invitationId){
        fetch('https://matter-app.herokuapp.com/api/v1/skills')
        .then(resp => resp.json())
        .then((data) => {
            const skillsSection = document.getElementById('skills');
            let i = 0;
            skillsSection.innerHTML = '';
            data.forEach(skill => {
                const skills = `<div class="card mt-1 br-12" style="width: 22rem; height:18rem;" onmouseout="restartSkills(${skill.id})" id="skill_${skill.id}">
                                    <div class="card-body">
                                        <h5 class="card-title">${skill.name}</h5>
                                        <div class="col-lg-12 col-md-12 col-sm-12 d-flex flex-row">
                                            <div class="col-lg-2 col-md-2 col-sm-2 mr-1 option rounded" onmouseover="activeOptions(${skill.id},1)" onclick="decreaseTotalSkill(); addSkillScore(${skill.id},1,1); valueSkill(${invitationId},${skill.id},1,'skill_${skill.id}')" id="skill_${skill.id}_1">1</div>
                                            <div class="col-lg-2 col-md-2 col-sm-2 mr-1 option rounded" onmouseover="activeOptions(${skill.id},2)" onclick="decreaseTotalSkill(); addSkillScore(${skill.id},2,2); valueSkill(${invitationId},${skill.id},2,'skill_${skill.id}')" id="skill_${skill.id}_2">2</div>
                                            <div class="col-lg-2 col-md-2 col-sm-2 mr-1 option rounded" onmouseover="activeOptions(${skill.id},3)" onclick="decreaseTotalSkill(); addSkillScore(${skill.id},3,3); valueSkill(${invitationId},${skill.id},3,'skill_${skill.id}')" id="skill_${skill.id}_3">3</div>
                                            <div class="col-lg-2 col-md-2 col-sm-2 mr-1 option rounded" onmouseover="activeOptions(${skill.id},4)" onclick="decreaseTotalSkill(); addSkillScore(${skill.id},4,4); valueSkill(${invitationId},${skill.id},4,'skill_${skill.id}')" id="skill_${skill.id}_4">4</div>
                                            <div class="col-lg-2 col-md-2 col-sm-2 mr-1 option rounded" onmouseover="activeOptions(${skill.id},5)" onclick="decreaseTotalSkill(); addSkillScore(${skill.id},5,5); valueSkill(${invitationId},${skill.id},5,'skill_${skill.id}')" id="skill_${skill.id}_5">5</div>
                                        </div>
                                    </div>
                                </div>`;
                                i++;
                skillsSection.innerHTML += skills;        
            });
            document.getElementById('totalSkillsEvaluate').innerHTML = i;
            document.getElementById('totalSkillsEvaluate').setAttribute("matter-sk-total",i);

        })

    }
    async generateSkillsViews(id){
        let resp = await fetch('https://matter-app.herokuapp.com/api/v1/skills')
        let data = await resp.json();
        const skillsSection = document.getElementById('skills');
        skillsSection.innerHTML = '';
        if(typeof(skillsSection) !== undefined && skillsSection != null){
            await Promise.all(data.map(async (skill) => {
                const skills = `<div class="card mt-1 col-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="card-body">
                                        <h5 class="card-title">${skill.name}</h5>
                                        <div class="col-lg-12 col-md-12 col-sm-12 d-flex flex-row">
                                            ${await this.getScoreSkill(id,skill.id)}
                                        </div>
                                    </div>
                                </div>`;
                skillsSection.innerHTML += skills;        
            }))
        }
    }
    async getScoreSkill(id,idSkill){
        let response = await fetch(`https://matter-app.herokuapp.com/api/v1/users/${id}/invitations`);//Give a list of request sended
        let parseJSON= await response.json();
        let total = 0;
        let pretotal = 0;
        let i = 0;
        let skillRet = '';
        await Promise.all(parseJSON.map(async (invitations) => {
            pretotal = await this.getScoreElements(invitations.id,idSkill);
            if(pretotal > 1){
                total+= pretotal;
                i++;
            }
        }))
        .then(()=>{
            let promedio = total/i;
            //console.log(promedio);
            for(let j = 0; j < 5; j++){
                if(j < (Math.round(promedio)-1)){
                    skillRet += '<div class="col-lg-2 col-md-2 col-sm-2 mr-1 option option-active rounded"></div>';
                }else{
                    skillRet += '<div class="col-lg-2 col-md-2 col-sm-2 mr-1 option rounded"></div>';
                } 
            }
        });
        
        return skillRet;
    }
    async getScoreElements(idInvitation,idSkill){
        let response = await fetch(`https://matter-app.herokuapp.com/api/v1/invitations/${idInvitation}/feedback`);
        let parseJSON= await response.json();
        let total = 0;
        parseJSON.map((data) => {
            if(data.pivot.skill_id == idSkill){
                total = data.pivot.score;   
            }
        }); 
        return total; 
    }
    sendInvitation(id,mail){
        let data = {email:mail};
        return fetch(`https://matter-app.herokuapp.com/api/v1/users/${id}/invite`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((resp)=>{
            if(resp.status == 201){
                return true;
            }else{
                return false;
            }
        })
    }
}