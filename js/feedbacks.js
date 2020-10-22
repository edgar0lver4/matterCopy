export default class FeedBack{
    constructor(id){
        this.id = id;
    }

    initFeedback(){
        return [this.getFeedback(),this.getInvitations()]
        
        
        /*.then(()=>{
            return true;
        })
        .then(()=>{
            this.getInvitations()
            .then(()=>{
                return true;
            })
        })*/
    }

    getFeedback(){
        return fetch(`https://matter-app.herokuapp.com/api/v1/users/${this.id}/invitations`)
        .then((feedbacks)=>{
            this.feedbacks = feedbacks.json();
            console.log(this.feedbacks);
        })
    }
    getInvitations(){
        return fetch(`https://matter-app.herokuapp.com/api/v1/users/${this.id}/feedback-invitations`)
        .then((invitations) =>{
            this.invitations = invitations.json();
            console.log(this.invitations);
        })
    }

    async getAllFeedbacks(element){
        let parseJSON = await this.feedbacks;
        console.log(parseJSON);
        element.innerHTML = '';
        await Promise.all(parseJSON.map(async (invitation) =>{
                        let userInfo = await fetch(`https://matter-app.herokuapp.com/api/v1/users/${invitation.user_invited_id}`);
                        let parseInfo= await userInfo.json();
                        const invitations = `<div class="col-12">
                                                <div class="col-12"><h3>${parseInfo.name}</h3></div>
                                                <div class="col-12">Sended since: ${invitation.created_at}</div>
                                            </div>`;
                        element.innerHTML += invitations;
                    })
        );
    }
    async getFeedbackRecived(element){
        let parseJSON= await this.invitations;
        console.log(parseJSON);
        element.innerHTML = '';
        await Promise.all(parseJSON.map(async (invitation) =>{
            if(invitation.evaluated_skills != invitation.total_skills){
                let userInfo = await fetch(`https://matter-app.herokuapp.com/api/v1/users/${invitation.user_id}`);
                let parseInfo= await userInfo.json();
                const invitations = `<div class="col-12 mt-2">
                                        <div class="col-12"><h3>${parseInfo.name}</h3></div>
                                        <div class="col-12">Sended since: ${invitation.created_at}</div>
                                        <div class="col-12"><a href="./evaluate.html?invitation=${invitation.id}" class="btn btn-primary">Give Feedback</a></div>
                                    </div>`;
                element.innerHTML += invitations;
            }
        }));
    }
    async getFeedbackPending(element){
        let feedbackPending = await this.invitations;
        element.innerHTML = '';
        await Promise.all(feedbackPending.map(async (invitationPending) =>{
            if(invitationPending.total_skills > invitationPending.evaluated_skills){
                let userInfo = await fetch(`https://matter-app.herokuapp.com/api/v1/users/${invitationPending.user_invited_id}`);
                let parseInfo= await userInfo.json();
                const invitations = `<div class="col-12">
                                        <div class="col-12"><h3>${parseInfo.name}</h3></div>
                                        <div class="col-12">Sended since: ${invitationPending.created_at}</div>
                                    </div>`;
                element.innerHTML += invitations;
            }
        }));
    }
    async getFeeedbackCompleted(element){
        let feedbackComplete = await this.feedbacks;
        element.innerHTML = '';
        await Promise.all(feedbackComplete.map(async (feedbackComplete) =>{
            if(feedbackComplete.total_skills == feedbackComplete.evaluated_skills){
                let userInfo = await fetch(`https://matter-app.herokuapp.com/api/v1/users/${feedbackComplete.user_invited_id}`);
                let parseInfo= await userInfo.json();
                const invitations = `<div class="col-12">
                                        <div class="col-12"><h3>${parseInfo.name}</h3></div>
                                        <div class="col-12">Sended since: ${feedbackComplete.created_at}</div>
                                    </div>`;
                element.innerHTML += invitations;
            }
        }));
    }
}