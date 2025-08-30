const incbtn=document.getElementById("increase");
const resetbtn=document.getElementById("reset");
const decbtn=document.getElementById("decrease");
const val=document.getElementById("count");

let counter=0;

incbtn.onclick = function(){
    counter++;
    val.textContent = counter;
}

resetbtn.onclick = function(){
    counter=0;
    val.textContent = counter;
}

decbtn.onclick = function(){
    counter--;
    val.textContent = counter;
}