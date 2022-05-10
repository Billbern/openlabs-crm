document.body.onload = ()=>{
    const menuBtn = document.querySelector('#headMenuBtn');
    const menuBox = document.querySelector('#headMenu');
    const txtMenuBtn = document.querySelector("#textMenuBtn");
    const txtMenu = document.querySelector("#textMenu");

    menuBtn.addEventListener('click', ()=>{
        menuBox.classList.toggle('show');
    })

    txtMenuBtn.addEventListener('click', ()=>{
        txtMenu.classList.toggle('show');
    })
}