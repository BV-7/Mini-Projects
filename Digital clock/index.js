function update(){
    const now = new Date;
    const mins=now.getMinutes().toString().padStart(2,0);
    let hrs=now.getHours().toString().padStart(2,0);
    const median = hrs>11 ? 'PM' : 'AM'
    hrs = hrs % 12 || 12
    const sec=now.getSeconds().toString().padStart(2,0);
    const Time =`${hrs}:${mins}:${sec} ${median}`
    document.getElementById("clock").textContent=Time;
}

setInterval(update,1000)