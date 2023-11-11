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

let numberPlayers = 0;

let players = (number) =>{
    containerFluid.innerHTML = ''; // Limpando todo o HTML
    let boxNamesPlayers = document.createElement('div'); // Criando div
    boxNamesPlayers.classList.add('boxNamesPlayers') // Adicionando nome da classe

    for(let i = 1; i <= number; i++){ // Criar box de acordo com o numero de jogadores
        let boxName = document.createElement('div');
        boxName.classList.add('boxName');

        let titleName = document.createElement('h3');
        titleName.classList.add('titleName');
        titleName.innerHTML = `Jogador ${i}`;

        let inputName = document.createElement('input');
        inputName.classList.add('inputName');
        inputName.setAttribute('placeholder', `Nome do jogador ${i}`);
        inputName.setAttribute('type', 'text'); // Adicionando atributo

        boxNamesPlayers.appendChild(boxName); // Adicionando a div de boxNamesPlayers
        boxName.appendChild(titleName); // Adicionando title
        boxName.appendChild(inputName) // Adicionando input ao boxName
    }
    
    let buttonPlay = document.createElement('button');
    buttonPlay.classList.add('btnToPlay');
    buttonPlay.innerHTML = "<h3 class='titlePlayBtn'>Jogar</h3>";
    buttonPlay.setAttribute('onclick', 'setAvatar()');

    let buttonReturn = document.createElement('button');
    buttonReturn.classList.add('btnReturn');
    buttonReturn.innerHTML = "<h3>Voltar</h3>"
    buttonReturn.setAttribute('onclick', 'playGame()');

    containerFluid.appendChild(boxNamesPlayers) // Adicionar div no conteudo
    containerFluid.appendChild(buttonPlay);
    containerFluid.appendChild(buttonReturn);

    numberPlayers = number; // Setar jogadores
}
let setAvatar = ()=>{
    console.log(numberPlayers)
}