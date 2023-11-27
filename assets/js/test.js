let perguntasUrl = new XMLHttpRequest(); // Requisitar o arquivo
perguntasUrl.open('get', 'assets/json/perguntas.json') // Pegar arquivo
perguntasUrl.responseType = 'text' // Requisitar o tipo de arquivo

let perguntasJson

perguntasUrl.onreadystatechange = ()=>{
    if(perguntasUrl.readyState == 4 && perguntasUrl.status == 200){ // Se o status do arquivo for Ok, irá entrar nessa logica
        let perguntasText = perguntasUrl.responseText; // Requisita todo texto
        perguntasJson = JSON.parse(perguntasText); // Transforma em JSON
        perguntasJson = perguntasJson['Perguntas matematicas']        
        console.log(perguntasJson['Facil'])


        delete perguntasJson['Facil']["Pergunta 3"]

        console.log(perguntasJson['Facil'])
    }
}
perguntasUrl.send() // Chama a função
