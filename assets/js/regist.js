function sendData(data) {
    const newdata = JSON.stringify(data);
    fetch("http://localhost:3000/auth/register", {
        method: 'POST',
        body: newdata,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((response)=>{
        if(response.status === 200 ){
            location.href = '/student/user'
        }
    })
    .catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

document.body.onload = ()=>{
    const uname = document.querySelector("#uname");
    const pwd = document.querySelector("#pwd");
    const conpwd = document.querySelector("#conpwd");
    const registform = document.querySelector("#registForm");
    const notice = document.querySelector("#notice");
    const userrole = document.querySelector("#roleSelect");
    const studs = document.querySelector("#studs");
    const panies = document.querySelector("#panies");

    userrole.addEventListener('change', ()=>{
        if(userrole.value === 'company'){
            studs.style.display = "none"
            panies.style.display = 'block';
        }else if(userrole.value === 'student'){
            panies.style.display = 'none';
            studs.style.display = "block";
        }
    })

    registform.addEventListener("submit", (e)=>{
        e.preventDefault();
        if(userrole.value === 'company'){
            const paniesMail = document.querySelector("#paniesmail");
            const paniesName = document.querySelector("#paniesname");
            if(!paniesMail.value || !panieName.value){
                notice.innerHTML = `<span style="color:red;" class="text_small">Please fill all the company boxes</span>`
            }else{
                data = { username: uname.value, password: pwd.value, role: userrole.value, email: paniesMail.value, company: paniesName.value };
                try{
                    sendData(data);
                }catch(error){
                    console.log(sendData());
                }
            }
        }else if(userrole.value === 'student'){
            const stdMail = document.querySelector("#stdmail");
            const stdProgram = document.querySelector("#stdprogram");
            if(!stdMail.value || !stdProgram.value){
                notice.innerHTML = `<span style="color:red;" class="text_small">Please fill all the student boxes</span>`
            }else{
                data = { username: uname.value, password: pwd.value, role: userrole.value, email: stdMail.value, program: stdProgram.value };
                console.log(data);
                try{
                    sendData(data);
                }catch(error){
                    console.log(sendData());
                }
            }
        }
    })
}