let containerFluid = document.querySelector('.containerFluid');



let btnArr = []
let btnDuplicated
let playGame = ()=>{ // Requisitar pagina home
        let xmlHome = new XMLHttpRequest;

        xmlHome.open('get', 'http://192.168.1.9:5500/home.html');
        xmlHome.send();
        
        xmlHome.onreadystatechange = ()=>{
            if(xmlHome.readyState == 4 && xmlHome.status == 200){
                containerFluid.innerHTML = xmlHome.responseText;
            }
        }

        btnArr.splice(0, btnArr.length)
}

let emptyContent = ()=>{
    containerFluid.innerHTML = ''; // Limpando todo o HTML
}

let playersDefined = 0;
let numberPlayer = 0;
let avataresDefined = [];
let avataresCont = 0;

let players = (number, selectedAvatar, numberPLayer) =>{ // Função para escolher quantos players irá ter no jogo
    if(number > 4){ // Caso o number seja maior que 4, irá setar o default = 4
        number = 4;
    }

    emptyContent()
    playersDefined = number;
    let boxNamesPlayers = document.createElement('div'); // Criando div
    boxNamesPlayers.classList.add('boxNamesPlayers') // Adicionando nome da classe
    let buttonId = 0;

    for(let i = 1; i <= number; i++){ // Criar box de acordo com o numero de jogadores
        let boxName = document.createElement('div');
        boxName.classList.add('boxName');

        let headerName = document.createElement('div'); // Div para agreagar a parte de nome e escolha de avatar
        headerName.classList.add('headerName');

        let titleName = document.createElement('h3'); // Nome de jogador
        titleName.classList.add('titleName');
        titleName.innerHTML = `Jogador ${i}`;

        let avatarButton = document.createElement('button'); // Botão de avatar
        avatarButton.id = 'avatarButtonId'
        
        avatarButton.innerHTML = 'avatar'
        avatarButton.classList.add(`avatarButton${i}`);
        avatarButton.setAttribute('onclick', `setAvatarToPlayer(${i})`);

        if (i == numberPlayer) {
            // Verificar se a classe do botão já está no array
            let botaoDuplicado = btnArr.some(btn => btn.classList.value === avatarButton.classList.value);
        
            if (!botaoDuplicado) {
                // Adicionar o botão ao array
                btnArr.push(avatarButton);
                btnDuplicated = false;
            } else {
                btnDuplicated = true;
            }
        }
        

        let inputName = document.createElement('input'); // Caixa de texto para inserir o nome
        inputName.classList.add('inputName');
        inputName.setAttribute('placeholder', `Nome do jogador ${i}`);
        inputName.setAttribute('type', 'text'); // Adicionando atributo
        inputName.setAttribute('id', `namePlayer${i}`) // Adicionar id 

        boxNamesPlayers.appendChild(boxName); // Adicionando a div de boxNamesPlayers
        headerName.appendChild(titleName) // Adicionando nome
        headerName.appendChild(avatarButton) // Adicionando botão

        boxName.appendChild(headerName) // Adicionando o header no box name
        boxName.appendChild(inputName) // Adicionando input ao boxName
    }

    if (!avataresDefined.includes(selectedAvatar) && numberPLayer != undefined) { // Adicionar avatares
        if (avataresCont > playersDefined) {
            avataresCont = playersDefined;
        } else {
            avataresCont += 1;
        }
    
        // Limpar a matriz de avatares antes de adicionar o novo
        avataresDefined.push({ [`Avatar Jogador ${numberPlayer}`]: selectedAvatar });
    
        // Desativar o botão após a escolha do avatar
        buttonId.disabled = true;
        console.log(btnArr)
    }

    if(avataresCont == playersDefined && btnDuplicated != true){ // Excluir os botões quando todos jogadores selecionarem seus avatares
        setTimeout(() => {
            for (let i = 1; i <= playersDefined; i++) {
                console.log(i)
                let boxAvatar = document.querySelector(`.avatarButton${i}`)
                boxAvatar.remove()
            }
        }, 0);
    }else if(btnDuplicated == true){
        let titleError = document.createElement('h3');
        titleError.classList.add('errorTitle');
        titleError.innerHTML = "Usuário já tem avatar cadastrado!"; // Message error 4
        boxNamesPlayers.appendChild(titleError);
        setTimeout(() => {
           titleError.remove() 
        }, 3000);

    }
    
    let buttonPlay = document.createElement('button'); // Botão de jogar
    buttonPlay.classList.add('btnToPlay');
    buttonPlay.innerHTML = "<h3 class='titlePlayBtn'>Jogar</h3>";
    buttonPlay.setAttribute('onclick', 'setAvatar()');

    let buttonReturn = document.createElement('button'); // Botão de retornar
    buttonReturn.classList.add('btnReturn');
    buttonReturn.innerHTML = "<h3>Voltar</h3>"
    buttonReturn.setAttribute('onclick', 'buttonAction("return")');

    containerFluid.appendChild(boxNamesPlayers) // Adicionar div no conteudo
    containerFluid.appendChild(buttonPlay);
    containerFluid.appendChild(buttonReturn);
}

let hasDuplicate = (namePlayer) =>{ // Ver se o nome ja existe, caso o usuario digita o nome igual a outro player, ira dar erro
    return new Set(namePlayer).size !== namePlayer.length;
}

let setAvatar = ()=>{ // Parte de jogadores
    let buttonPlay = document.querySelector('.btnToPlay');
    
    let boxNamesPlayers = document.querySelector('.boxNamesPlayers');
    let userNoDetected = false;
    let namePlayers = [] // Guardar nomes dos jogadores

    let titleError = document.createElement('h3');
    titleError.classList.add('errorTitle');
    for(let i = 1; i <= playersDefined; i++){
        let namePlayer = (document.querySelector(`#namePlayer${i}`).value) // Pegar valor
        namePlayers.push(namePlayer.toLowerCase()); // Transfomar em minusculo
        if(namePlayer == null || namePlayer == undefined || namePlayer == ''){ // Verificar se foram digitado corretamente
            userNoDetected = true;
            titleError.innerHTML = 'Digite os nomes corretamente e <br>tente novamente!'; // Message error 1
            boxNamesPlayers.appendChild(titleError);
            break; // Parar script
        }else if(hasDuplicate(namePlayers)){ // Ver se ja existe aquele nome
            userNoDetected = true;
            titleError.innerHTML = "Nome de usuário duplicado, <br>tente novamente!"; // Message error 2
            boxNamesPlayers.appendChild(titleError);
            break;
        }
    }

    setTimeout(()=>{ // Desabilitar botão ao clicar nele
        buttonPlay.setAttribute('disabled', 'disabled');
    }, 50)

    if(userNoDetected){
        setTimeout(()=>{
            buttonPlay.removeAttribute('disabled');
            titleError.remove() // Remover elemento do html depois de 3 segundos
        }, 3000)
    }else{
        namePlayers.sort();
        if(avataresCont == playersDefined){ // Ve se o numero de avatares é igual ao numero de jogadores
            console.log(namePlayers)
            emptyContent();
            let titleAvatar = document.createElement('h3'); // Titulo
            titleAvatar.classList.add('titleAvatar');

            let warningComment = document.createElement('p'); // Informação
            warningComment.classList.add('warningComment');
            warningComment.innerHTML = 'Estamos trabalhando nessa parte!'
            containerFluid.appendChild(titleAvatar);
            containerFluid.appendChild(warningComment);
        }else{
            titleError.innerHTML = "Insira seu avatar,<br>e tente novamente!"; // Message error 3
            boxNamesPlayers.appendChild(titleError);
            setTimeout(()=>{
                buttonPlay.removeAttribute('disabled');
                titleError.remove() // Remover elemento do html depois de 3 segundos
            }, 3000)
        }
    }
} 


let avataresImg = [ // Imagens de avatares
    "assets/img/avatares.svg",
    "assets/img/avatares1.svg",
    "assets/img/avatares2.svg",
    "assets/img/avatares3.svg"
]

let selectedAvatar = null

let setAvatarToPlayer = (idPlayer)=>{ // Ir para a escolha de avatares
    emptyContent();

    let titleAvatar = document.createElement('h3'); // Titulo
    titleAvatar.innerHTML = 'Escolha seu avatar!'
    titleAvatar.classList.add('titleGame')

    let saveBtn = document.createElement('button');
    saveBtn.classList.add('btnSave');
    saveBtn.innerHTML = '<h3>Salvar</h3>'
    saveBtn.setAttribute('disabled', true)
    saveBtn.setAttribute('onclick', `savePlayerAvatar(${idPlayer})`)

    let returnBtn = document.createElement('button') // Botão de retorno
    returnBtn.classList.add('btnReturn')
    returnBtn.innerHTML = "<h3>Voltar</h3>"
    returnBtn.setAttribute('onclick', `buttonAction('returnPlayers')`);

    let containerImages = document.createElement('div');
    containerImages.classList.add('containerImages')

    let imageNumber = 0;

    avataresImg.forEach(image => { // Mostrar cada imagem de avatar
        let imageAvatar = document.createElement('img');
        imageAvatar.src = image
        imageNumber+=1
        imageAvatar.setAttribute(
            'onclick', 
            `selectAvatar(${idPlayer},${imageNumber}, this)`)
        imageAvatar.classList.add('imageAvatar')
        containerImages.appendChild(imageAvatar)
    });

    let buttonSave = ()=>{
        saveBtn.disabled = !selectedAvatar
    }

    window.selectAvatar = (idPlayer, imageNumber, element) =>{
        if(selectedAvatar){
            selectedAvatar.classList.remove('selected')
        }

        selectedAvatar = element;
        selectedAvatar.classList.add('selected');

        buttonSave()
    }
    window.savePlayerAvatar = (idPlayer)=>{ // Salvar o avatar escolhido pelo o usuario
        numberPlayer = idPlayer
        players(playersDefined, selectedAvatar.src, numberPlayer)
    }
    
    containerFluid.appendChild(titleAvatar)
    containerFluid.appendChild(containerImages)
    containerFluid.appendChild(saveBtn)
    containerFluid.appendChild(returnBtn)
}

let buttonAction = (action)=>{ // Botões de Retorno
    if(action == 'return'){
        avataresCont = 0;
        btnDuplicated = false
        avataresDefined.splice(0, avataresDefined.length) // Limpar array
        btnArr = []
        playGame()
        
    }else if(action == 'returnPlayers'){
        btnDuplicated = false
        players(playersDefined)
    }
}