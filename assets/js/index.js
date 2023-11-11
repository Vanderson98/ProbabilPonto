let containerFluid = document.querySelector('.containerFluid');

let playGame = ()=>{
        let xmlHome = new XMLHttpRequest;

        xmlHome.open('get', 'http://192.168.1.9:5500/home.html');
        xmlHome.send();
        
        xmlHome.onreadystatechange = ()=>{
            if(xmlHome.readyState == 4 && xmlHome.status == 200){
                containerFluid.innerHTML = xmlHome.responseText;
            }
        }
}


let players = (number) =>{
    containerFluid.innerHTML = ''; // Limpando todo o HTML
    let boxNamesPlayers = document.createElement('div'); // Criando div
    boxNamesPlayers.classList.add('boxNamesPlayeres') // Adicionando nome da classe

    for(let i = 1; i <= number; i++){ // Criar box de acordo com o numero de jogadores
        let boxName = document.createElement('div');
        boxName.classList.add('boxName');

        let titleName = document.createElement('h3');
        titleName.classList.add('titleName');
        titleName.innerHTML = `Jogador ${i}`;

        let inputName = document.createElement('input');
        inputName.classList.add('inputName');

        boxNamesPlayers.appendChild(boxName); // Adicionando a div de boxNamesPlayers
        boxName.appendChild(titleName); // Adicionando title
        boxName.appendChild(inputName) // Adicionando input ao boxName
    }
    
    let buttonPlay = document.createElement('button');
    buttonPlay.classList.add('btnToPlay');
    buttonPlay.innerHTML = "<h3 class='titlePlayBtn'>Jogar</h3>";

    containerFluid.appendChild(boxNamesPlayers) // Adicionar div no conteudo

    containerFluid.appendChild(buttonPlay);

}