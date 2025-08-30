async function fetchdata(){
    const input = document.getElementById("name").value.toLowerCase();
    const resname = document.getElementById('resname');
    const resid = document.getElementById('resid');
    const resweight = document.getElementById('resweight');
    const restype = document.getElementById('restype');
    const resheight = document.getElementById('resheight');
    const resimage = document.getElementById('img')
    const result = document.getElementById('result');

    try{
        const resource = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        const data = await resource.json();
    
        resid.textContent = `ID: ${data.id}`;
        resname.textContent = `NAME: ${data.name.toUpperCase()}`;
        resheight.textContent = `HEIGHT: ${data.height} ft`;
        resweight.textContent = `WEIGHT: ${data.weight} lb`;
        restype.textContent = `TYPE: ${data.types[0].type.name}`;
        resimage.src = data.sprites.front_default;
        console.log(data);
        result.classList.add('displaying');
    }
    catch(error){
        alert(`${input} - No such pokemon found`);
        console.error(error);
    }
}

function reset(){
    document.getElementById("name").value = '';
    document.getElementById('resname').textContent = 'NAME: ';
    document.getElementById('resid').textContent = 'ID: ';
    document.getElementById('resweight').textContent = 'WEIGHT: ';
    document.getElementById('restype').textContent = 'TYPE: ';
    document.getElementById('resheight').textContent = 'HEIGHT: ';
    document.getElementById('img').src = null;
    document.getElementById('result').classList.remove('displaying');

}