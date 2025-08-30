const choices=['rock','paper','scissor']

let result = document.getElementById('result');
let playerres = document.getElementById('playerresult');
let computerres = document.getElementById('computerresult');
let pscore = document.getElementById('playerscore');
let cscore = document.getElementById('computerscore');
let tscore = document.getElementById('tiescore');

pscore.style.color = 'limegreen';
cscore.style.color = 'tomato';
tscore.style.color = 'grey';
let ps=cs=ts=0;

function playgame(choice){
    computerchoice = choices[Math.floor(Math.random() * 3)];
    let res = "";
    let won = 0;

    if(choice===computerchoice){
        res = "It's a TIE";
    }
    else{
        switch(choice){
            case "rock":
                res = (computerchoice==='paper') ? "Sorry, You Lost :(" : "YAYY!!!, You won!!!";
                break;
            case "paper":
                res = (computerchoice==='scissor') ? "Sorry, You Lost :(" : "YAYY!!!, You won!!!";
                break;
            case "scissor":
                res = (computerchoice==='rock') ? "Sorry, You Lost :(" : "YAYY!!!, You won!!!";
                break;
        }
        if(res==="YAYY!!!, You won!!!"){
            won = 1;
        }
        else if(res === "Sorry, You Lost :("){
            won = -1;
        }
        else{
            won = 0;
        }
    }
    playerres.textContent = `${choice}`;
    computerres.textContent = `${computerchoice}`;
    result.textContent = `${res}`;

    if(won===1){
        playerres.style.color = result.style.color = 'limegreen';
        computerres.style.color = 'tomato';
        ps+=1;
    }
    else if(won===-1){
        playerres.style.color = result.style.color = 'tomato';
        computerres.style.color = 'limegreen';
        cs+=1;
    }
    else{
        result.style.color = playerres.style.color = computerres.style.color = 'grey';
        ts+=1;

    }

    pscore.textContent = `${ps}`;
    cscore.textContent = `${cs}`;
    tscore.textContent = `${ts}`;

}

function reset(){
    playerres.textContent = ''
    computerres.textContent = ''
    result.textContent = ''
    pscore.textContent = 0
    cscore.textContent = 0
    tscore.textContent = 0 
    ps=cs=ts=0;
}