document.body.onload = ()=>{
    const menuBtn = document.querySelector('#headMenuBtn');
    const menuBox = document.querySelector('#headMenu');

    menuBtn.addEventListener('click', ()=>{
        menuBox.classList.toggle('show');
    })
}