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

let emptyContent = ()=>{
    containerFluid.innerHTML = ''; // Limpando todo o HTML
}

let players = (number) =>{
    emptyContent()
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
        inputName.setAttribute('id', `namePlayer${i}`) // Adicionar id 

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

let hasDuplicate = (namePlayer) =>{
    return new Set(namePlayer).size !== namePlayer.length;
}

let setAvatar = ()=>{
    let buttonPlay = document.querySelector('.btnToPlay');
    
    let boxNamesPlayers = document.querySelector('.boxNamesPlayers');
    let boxTextsInsert = document.createElement('div');
    let userNoDetected = false;
    let namePlayers = []
    
    let titleError = document.createElement('h3');
    titleError.classList.add('errorTitle');
    for(let i = 1; i <= numberPlayers; i++){
        let namePlayer = (document.querySelector(`#namePlayer${i}`).value)
        namePlayers.push(namePlayer.toLowerCase());
        if(namePlayer == null || namePlayer == undefined || namePlayer == ''){ // Verificar se foram digitado corretamente
            userNoDetected = true;
            titleError.innerHTML = 'Digite os nomes corretamente e <br>tente novamente!';
            boxNamesPlayers.appendChild(titleError);
            break; // Parar script
        }else if(hasDuplicate(namePlayers)){ // Ver se ja existe aquele nome
            userNoDetected = true;
            titleError.innerHTML = "Nome de usuário duplicado, <br>tente novamente!";
            boxNamesPlayers.appendChild(titleError);
            break;
        }
    }

    setTimeout(()=>{
        buttonPlay.setAttribute('disabled', 'disabled');
    }, 50)

    if(userNoDetected){
        setTimeout(()=>{
            buttonPlay.removeAttribute('disabled');
            titleError.remove() // Remover elemento do html depois de 3 segundos
        }, 3000)
    }else{
        emptyContent();
        let titleAvatar = document.createElement('h3');
        titleAvatar.classList.add('titleAvatar');
        titleAvatar.innerHTML = "Selecione o seu avatar!"

        let warningComment = document.createElement('p');
        warningComment.classList.add('warningComment');
        warningComment.innerHTML = 'Estamos trabalhando para atualizar essa parte!';

        containerFluid.appendChild(titleAvatar);
        containerFluid.appendChild(warningComment);

        for(let i = 1; i <= numberPlayers; i++){
            console.log(`Jogador ${i}`);
        }
    }
} 