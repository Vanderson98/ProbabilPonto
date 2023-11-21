let container = document.querySelector('.container')
let containerFluid = document.querySelector('.containerFluid');



let btnArr = []
let btnDuplicated
let playGame = ()=>{ // Requisitar pagina home
        let xmlHome = new XMLHttpRequest;

        xmlHome.open('get', 'https://probabil-ponto.vercel.app/home.html');
        xmlHome.send();
        
        xmlHome.onreadystatechange = ()=>{
            if(xmlHome.readyState == 4 && xmlHome.status == 200){
                containerFluid.innerHTML = xmlHome.responseText;
            }
        }
}

let emptyContent = (element)=>{
    if(element == 'containerFluid'){
        containerFluid.innerHTML = ''; // Limpando todo o HTML
    }else if(element == 'levelBox'){
        levelBox.innerHTML = '';
    }
}

let titleError = document.createElement('h3');
titleError.classList.add('errorTitle');

let playersDefined = 0;
let numberPlayer = 0;
let avataresDefined = [];
let avataresCont = 0;
let avataresSelected = {}

let players = (number, selectedAvatar, numberPLayer) =>{ // Função para escolher quantos players irá ter no jogo
    if(number > 4){ // Caso o number seja maior que 4, irá setar o default = 4
        number = 4;
    }

    emptyContent('containerFluid')
    playersDefined = number;
    let boxNamesPlayers = document.createElement('div'); // Criando div
    boxNamesPlayers.classList.add('boxNamesPlayers') // Adicionando nome da classe

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

        let inputName = document.createElement('input'); // Caixa de texto para inserir o nome
        inputName.classList.add('inputName');
        inputName.setAttribute('disabled', true)
        inputName.setAttribute('placeholder', `Nome do jogador ${i}`);
        inputName.setAttribute('type', 'text'); // Adicionando atributo
        inputName.setAttribute('id', `namePlayer${i}`) // Adicionar id 

        boxNamesPlayers.appendChild(boxName); // Adicionando a div de boxNamesPlayers
        headerName.appendChild(titleName) // Adicionando nome
        headerName.appendChild(avatarButton) // Adicionando botão

        boxName.appendChild(headerName) // Adicionando o header no box name
        boxName.appendChild(inputName) // Adicionando input ao boxName
    }

    let buttonPlay = document.createElement('button'); // Botão de jogar
    buttonPlay.classList.add('btnToPlay');
    buttonPlay.innerHTML = "<h3 class='titlePlayBtn'>Jogar</h3>";
    buttonPlay.setAttribute('onclick', 'setAvatar()');
 
    let buttonReturn = document.createElement('button'); // Botão de retornar
    buttonReturn.classList.add('btnReturn');
    buttonReturn.innerHTML = "<h3>Voltar</h3>"
    buttonReturn.setAttribute('onclick', 'buttonAction("return")');

    if (!avataresDefined.includes(selectedAvatar) && numberPLayer != undefined) { // Adicionar avatares
        if (avataresCont > playersDefined) {
            avataresCont = playersDefined;
        } else {
            avataresCont += 1;
        }
    
        if(!avataresSelected[numberPLayer]){
            // Limpar a matriz de avatares antes de adicionar o novo
            avataresDefined.push({ [`Avatar Jogador ${numberPlayer}`]: selectedAvatar });
            titleError.innerHTML = '<span>Avatar selecionado com sucesso!</span>'
            titleError.classList.add('sucessTitle')
            avataresSelected[numberPLayer] = true;
        }else{
            titleError.innerHTML = 'Usuário já tem avatar cadastrado!'; // Message error 1
            buttonPlay.setAttribute('disabled', true)
            setTimeout(()=>{
                buttonAction('return')
            }, 3000)
        }

        setTimeout(()=>{
            titleError.remove()
        }, 3500)
        boxNamesPlayers.appendChild(titleError);
    }

    if(avataresCont == playersDefined && btnDuplicated != true){ // Excluir os botões quando todos jogadores selecionarem seus avatares
        setTimeout(() => {
            for (let i = 1; i <= playersDefined; i++) {
                let boxAvatar = document.querySelector(`.avatarButton${i}`)
                boxAvatar.remove()
            }
            
            let inputNames = document.querySelectorAll('.inputName'); // Pegar todas as classes
                inputNames.forEach(inputName => {
                    inputName.removeAttribute('disabled'); // Retirar o disabled de todos os inputs
                });
        }, 0);
    }

    for(let i = 1; i<=4;i++){
        pontosPlayers[0][`Jogador ${i}`] = 0
    }
    containerFluid.appendChild(boxNamesPlayers) // Adicionar div no conteudo
    containerFluid.appendChild(buttonPlay);
    containerFluid.appendChild(buttonReturn);
}

let hasDuplicate = (namePlayer) =>{ // Ver se o nome ja existe, caso o usuario digita o nome igual a outro player, ira dar erro
    return new Set(namePlayer).size !== namePlayer.length;
}

let avataresImg = [ // Imagens de avatares
    "assets/img/avatares.svg",
    "assets/img/avatares1.svg",
    "assets/img/avatares2.svg",
    "assets/img/avatares3.svg"
]

let selectedAvatar = null

let setAvatarToPlayer = (idPlayer)=>{ // Ir para a escolha de avatares
    emptyContent('containerFluid');

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
        avataresDefined.splice(0, avataresDefined.length) // Limpar array
        avataresSelected = {}
        playGame()
        
    }else if(action == 'returnPlayers'){
        players(playersDefined)
    }
}

// Parte do jogo ( tabuleiro, perguntas etc )
let namePlayers = [] // Guardar nomes dos jogadores

let setAvatar = ()=>{ // Parte de jogadores
    let buttonPlay = document.querySelector('.btnToPlay');
    
    let boxNamesPlayers = document.querySelector('.boxNamesPlayers');
    let userNoDetected = false;
    for (let i = 1; i <= playersDefined; i++) {
        let namePlayer = document.querySelector(`#namePlayer${i}`).value;
        namePlayer = namePlayer.toLowerCase();

        if (namePlayer == null || namePlayer == undefined || namePlayer == '') {
            userNoDetected = true;
            titleError.innerHTML = 'Digite os nomes corretamente e <br>tente novamente!'; // Mensagem de erro 1
            boxNamesPlayers.appendChild(titleError);
            namePlayers.splice(0, namePlayers.length); // Apagar array
            break; // Parar o script
        } else if (hasDuplicate(namePlayers)) {
            userNoDetected = true;
            titleError.innerHTML = "Nome de usuário duplicado, <br>tente novamente!"; // Mensagem de erro 2
            boxNamesPlayers.appendChild(titleError);
            namePlayers.splice(0, namePlayers.length); // Apagar array
            break;
        }

        namePlayers.push(namePlayer.toLowerCase());
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
            emptyContent('containerFluid');
            containerFluid.remove()
            
            avataresDefined.sort((a, b)=>{ // Ordenar as imagens
                const aNumber = parseInt(Object.keys(a)[0].match(/\d+/)[0])
                const bNumber = parseInt(Object.keys(b)[0].match(/\d+/)[0])            
                return aNumber - bNumber
            })

            for(let i = 0; i < playersDefined; i++){ // Cria a caixa de cada jogador na tela
                let boxPlayer = document.createElement('div');
                boxPlayer.classList.add('boxPlayerPlay');
                let namePlayer = document.createElement('h3')
                namePlayer.classList.add('nameBottomUser')
                namePlayer.innerHTML = namePlayers[i] // Coloca nome do jogador
                boxPlayer.style.background = `url('${avataresDefined[i]['Avatar Jogador ' + (i + 1)]}')`; // Seleciona o avatar escolhido pelo jogador e coloca ele no fundo da caixa
                let textPoints = document.createElement('h3')
                textPoints.classList.add('textPoints')
                textPoints.innerHTML = `Pontos: <br><span class=player${i + 1}Point>0</span>`

                if(i < 2){
                    textPoints.classList.add('marginTop')
                }else{
                    textPoints.classList.add('marginBottom')
                }

                switch(i){ // Adicionando classes
                    case 0: 
                        boxPlayer.classList.add('boxPlayerTopLeft')
                        break;

                    case 1:                    
                        boxPlayer.classList.add('boxPlayerTopRight')
                        break;

                    case 2:
                        boxPlayer.classList.add('boxPlayerBottomLeft')
                        break;

                    case 3:
                        boxPlayer.classList.add('boxPlayerBottomRight')
                        break;

                    default:
                        messageReport()
                        break;
                }

                boxPlayer.appendChild(namePlayer)
                boxPlayer.appendChild(textPoints)
                container.appendChild(boxPlayer)
            }

            let levelBox = document.createElement('div')
            levelBox.classList.add('levelBox')

            for(let i = 0; i < 3; i++){ // Gerar botões de escolha de niveis
                let boxLevel = document.createElement('div')
                boxLevel.classList.add(`level${i}`)
                boxLevel.setAttribute('onclick', `setLevel(${i})`)
                
                switch(i){ // Gerar textos para colocar em cada caixa de botão
                    case 0:
                        boxLevel.innerHTML = 'Fácil'
                        break;

                    case 1:
                        boxLevel.innerHTML = 'Médio'
                        break;
                    
                    case 2:
                        boxLevel.innerHTML = 'Difícil'
                        break;
                    
                    default:
                        messageReport()
                        break;
                }
                levelBox.appendChild(boxLevel)
            }

            container.appendChild(levelBox)
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

let messageReport = ()=>{ // Função para mensagem de erro
    console.log('[ERRO] Contate a equipe de desenvolvimento! [ERRO]');
}

let levelBox

let setLevel = (level) =>{ // Transforma o numero em texto ( Level 1 -> facil )
    switch(level){
        case 0:
            level = 'Facil';
            break;
        
        case 1:
            level = 'Medio'
            break;

        case 2:
            level = 'Dificil'
            break;
        
        default:
            messageReport()
            break;
    }

    levelBox = document.querySelector('.levelBox');
    emptyContent('levelBox')

    if(level != undefined){ // Gerar botões de escolha
        for(let i = 0; i < 2; i++){
            let buttonLevel = document.createElement('button');
            buttonLevel.classList.add('levelButton'+i);
            
            switch(i){ // Trocar o html de dentro do botão, e colocar uma função para cada um
                case 0:
                    buttonLevel.innerHTML = 'Escolha randômica'
                    buttonLevel.setAttribute('onclick', `levelButton('random', '${level}')`)
                    break;
                
                case 1:
                    buttonLevel.innerHTML = 'Escolha por ordem';
                    buttonLevel.setAttribute('onclick', `levelButton('ordem')`)
                    break;

                default:
                    messageReport();
                    break;
            }
            levelBox.appendChild(buttonLevel)
        }
    }
}

let levelButton = (levelButton, levelDefined) =>{
    if(levelButton == 'ordem'){
        console.log('Teste')
    }else if(levelButton == 'random'){ // Chama a função para criar players aleatorios
        randomPlayer(levelDefined)
    }
}

let responderPlayer = 0

let randomPlayer = (levelDefined, idPlayer)=>{
    emptyContent('levelBox')
    let playersArray = []
        console.log(levelDefined)

        if(perguntasMatematicas[`${levelDefined}`].length == 0){
            emptyContent('levelBox')
            let numeroDeJogadores = Object.keys(pontosPlayers[0]).length;
            let maiorValor = -Infinity
            let jogadorPointsMax = 0

            for(let i = 1; i <= numeroDeJogadores; i++){ // Mostrar qual jogador fez mais ponto
                let valorAtual = pontosPlayers[0][`Jogador ${i}`]
                
                if(valorAtual > maiorValor){
                    maiorValor = valorAtual
                    jogadorPointsMax = `${namePlayers[i-1]}`
                }
            }
            console.log(jogadorPointsMax)

            let boxPlayerPlay = document.querySelectorAll('.boxPlayerPlay');
            boxPlayerPlay.forEach(element => {
                element.remove();
            });

            let titleSuccess = document.createElement('h3')
            titleSuccess.innerHTML = `
            <span class="text1">
                Parabéns, ${jogadorPointsMax}! Você fez incríveis ${maiorValor} pontos no nosso jogo.🎉
            </span>
            <span class="text2">
                Preparamos uma nova partida para você. Em breve, estaremos redirecionando você para mais desafios emocionantes!
            </span>
            `
            titleSuccess.classList.add('titleSucess')

            levelBox.appendChild(titleSuccess)

            setTimeout(() => {
                // playGame()
            }, 3000);
        }else{
            for(let i = 1; i <= playersDefined; i++){ // Preenche o array com todos os jogadores
                playersArray.push(i)
            }

            while(playersArray.length > 0){ // Seleciona aleatoriamente algum jogador para responder a pergunta
                let randomIndex = Math.floor(Math.random() * playersArray.length);
                if(idPlayer != randomIndex){
                    responderPlayer = playersArray[randomIndex]
                }else if(idPlayer == randomIndex){
                    responderPlayer = playersArray[randomIndex--]
                }

                let playerResposta = document.createElement('h3');
                playerResposta.innerHTML = `O jogador ${responderPlayer} irá responder a pergunta`

                levelBox.appendChild(playerResposta)
                questionToPlayer(levelDefined)
                // Remove o jogador 
                playersArray.splice(randomIndex, 1)
                
                break; // Parar script até o jogador responder a pergunta
            }
        }
}

let perguntasMatematicas = { // Array de perguntas
    'Facil':[
        {'Pergunta': 
            'Se você lançar um dado justo de seis lados, qual é a probabilidade de obter um número ímpar?',
            'Respostas':{
                'Resposta 1':
                    '3',
                'Resposta 2':
                    '1/2',
                'Resposta 3':
                    '50%'}
        },
        {'Pergunta': 
            'Em uma caixa com 10 bolas numeradas de 1 a 10, se você escolher uma bola ao acaso, qual é a probabilidade de escolher uma bola com um número par?',
            'Respostas':{
                'Resposta 1':
                    '5',
                'Resposta 2':
                    '50%'
            }
        },
        {'Pergunta':
            'Suponha que você tenha uma jarra com 30 balas, das quais 5 são vermelhas, 10 são azuis e 15 são verdes. Se você escolher uma bala ao acaso, qual é a probabilidade de ser azul?',
            'Respostas':{
                'Resposta 1':
                    '10'}
        }
    ]
}

let buttonConfirmar, buttonPular

let questionToPlayer = (levelDefined)=>{ // Mostrar qual jogador irá responder, e qual é a pergunta
    let perguntasArray = []

    for(let i = 0; i < perguntasMatematicas[`${levelDefined}`].length; i++){
        perguntasArray.push(i)
    }

    while(perguntasArray.length > 0){
        let randomPergunta = Math.floor(Math.random() * perguntasArray.length);
        let indicePergunta = perguntasArray[randomPergunta]
        let boxPerguntas = document.createElement('div');
            boxPerguntas.classList.add('boxPerguntas');

        let numberPergunta = document.createElement('h2'); // Numero da pergunta
            numberPergunta.classList.add('numberPergunta');
            numberPergunta.innerHTML = `${randomPergunta + 1})`
            console.log(randomPergunta)

        let perguntaText = document.createElement('h3') // Pergunta em texto
            perguntaText.classList.add('perguntaText');
            perguntaText.innerHTML = perguntasMatematicas[`${levelDefined}`][indicePergunta]['Pergunta'];

        let inputResposta = document.createElement('input') // Input para inserir resposta
            inputResposta.classList.add('inputResposta')
            inputResposta.setAttribute('type', 'text')

        buttonConfirmar = document.createElement('button') // Botão de enviar resposta
            buttonConfirmar.classList.add('buttonConfirmar')
            buttonConfirmar.setAttribute('onclick', `corrigirResposta(${randomPergunta}, ${responderPlayer}, '${levelDefined}')`)
            buttonConfirmar.innerHTML = 'Confirmar'

        perguntasArray.splice(randomPergunta, 1) // Remover numero da pergunta do array

        buttonPular = document.createElement('button'); // Botão de pular questão
            buttonPular.classList.add('buttonPular');
            buttonPular.setAttribute('onclick', `pularPergunta('${levelDefined}')`);
            buttonPular.innerHTML = 'Pular questão'
    
        boxPerguntas.appendChild(numberPergunta)
        boxPerguntas.appendChild(perguntaText)

        levelBox.appendChild(boxPerguntas)
        levelBox.appendChild(inputResposta)
        levelBox.appendChild(buttonConfirmar)
        levelBox.appendChild(buttonPular)
        break;
    }
}

let pontosPlayers = [{
        'Jogador 1': 0,
        'Jogador 2': 0,
        'Jogador 3': 0,
        'Jogador 4': 0
    }
]

let corrigirResposta = (idPergunta, idPlayer, levelDefined)=>{ // Corrigir resposta
    disabledButton('disabled')
    let inputResposta = document.querySelector('.inputResposta').value;
    let respostaArr = []    
    for(let i = 1; i <= 3; i++){
        let respostasCertas = perguntasMatematicas[`${levelDefined}`][idPergunta]['Respostas']['Resposta ' + (i)] 
        if(respostasCertas != undefined){    
            respostaArr.push(respostasCertas)
        }
    }
    
    if(inputResposta == '' || inputResposta == undefined || inputResposta == null){ // Se for vazio, ira dar um erro
        disabledButton('disabled')
        titleError.innerHTML = 'Insira a resposta e <br> tente novamente!';
        titleError.classList.add('errorMessageSpace')
        levelBox.appendChild(titleError)

        setTimeout(() => {
            titleError.remove()
            disabledButton('active')
        }, 3000);
    }else if(inputResposta != '' || inputResposta != undefined || inputResposta != null){ // Ver se a resposta é igual aos que os usuarios adicionaram
        let respostaConfirmada = false
        
        for(let i = 0; i<3; i++){ // Percorre o array
            let respostaCerta = respostaArr[i];
            if(respostaCerta == inputResposta){ // Ira ver se o valor que o usuario digitou, é igual a resposta guardada no array
                respostaConfirmada = true
                break; // Parar script
            }
        }
        if (respostaConfirmada) { // Se for, irá adicionar ponto
            pontosPlayers[0][`Jogador ${idPlayer}`] += 300            
            let pointsToPlayer = document.querySelector(`.player${idPlayer}Point`);
            pointsToPlayer.innerHTML = pontosPlayers[0][`Jogador ${idPlayer}`];
            perguntasMatematicas[`${levelDefined}`].splice(idPergunta, 1)
            setTimeout(() => {
                randomPlayer(levelDefined, idPlayer)
            }, 1500);
        } else { // Senão, mostra que errou
            console.log('Errou');
        }
    }
}

let pularPergunta = (levelDefined)=>{ // Função de pular pergunta
    disabledButton('disabled')
    setTimeout(() => { // Em 3 segundos irá mostrar a nova pergunta destinada a outro player ou ao mesmo
        levelBox.innerHTML = '';
        disabledButton('active')
        randomPlayer(levelDefined)
    }, 2500);
}

let disabledButton = (action)=>{ // Função para desativar o botao ou ativar
    if(action == 'disabled'){

        buttonConfirmar.setAttribute('disabled', true)
        buttonPular.setAttribute('disabled', true)
    }else if(action == 'active'){

        buttonConfirmar.removeAttribute('disabled')
        buttonPular.removeAttribute('disabled')
    }

}
