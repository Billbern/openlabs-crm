document.body.onload = ()=>{
    const notice = document.querySelector("#notice");
    const studs = document.querySelector("#studs");
    const panies = document.querySelector("#panies");
    const formExtra = document.querySelector("#authOptions");

    studs.addEventListener("change", (e)=>{
        if(e.target.checked){
            formExtra.innerHTML = `<div><input type="text" name="stdcourse" id="stdprogram" placeholder="program"></div><div><input type="text" name="stdmail" id="stdmail" placeholder="student email"></div>`
        }
    })
    
    panies.addEventListener("change", (e)=>{
        if(e.target.checked){
            formExtra.innerHTML = `<div><input type="text" name="compname" id="paniesname" placeholder="company name"></div><div><input type="text" name="compmail" id="paniesmail" placeholder="company email"></div>`
        }
    })
}