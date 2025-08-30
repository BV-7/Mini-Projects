const slides = document.querySelectorAll('.slides img');
let intervalid = null;
let index=0;

document.addEventListener('DOMContentLoaded',Initialise);

function Initialise(){
    if(slides.length>0){
        slides[index].classList.add('displayslide');
        intervalid = setInterval(nextslide,5000);
    }
}

function Show(index){
    index = index % slides.length;
    slides.forEach(slide =>{
        slide.classList.remove('displayslide');
    });
    slides[index].classList.add('displayslide');
}

function prevslide(){
    clearInterval(intervalid);
    index--;
    Show(index);
}

function nextslide(){
    index++;
    Show(index);
}