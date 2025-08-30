const out=document.getElementById('out');
const roll=document.getElementById('btn')


roll.onclick = function(){
    let random = Math.ceil(Math.random() * 1000); 
    out.textContent = random
}