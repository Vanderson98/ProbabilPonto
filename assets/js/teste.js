let apiUrl = new XMLHttpRequest();

apiUrl.open('get', 'assets/json/perguntas.json')
apiUrl.responseType = 'text'

apiUrl.onreadystatechange = ()=>{
    if(apiUrl.readyState == 4 && apiUrl.status == 200){
        let apiText = apiUrl.responseText
        let apiJson = JSON.parse(apiText)
        console.log(apiJson['Perguntas matematicas']) // Mostra os niveis

        console.log(apiJson['Perguntas matematicas']['Facil']['Pergunta 2']) // Retorna o que a pergunta tem 
        
        console.log(apiJson['Perguntas matematicas']['Facil']['Pergunta 2']['PerguntaText']) // Retorna o texto da pergunta
    
        console.log(apiJson['Perguntas matematicas']['Facil']['Pergunta 2']['Opções']) // Retorna as opções da pergunta

        console.log(apiJson['Perguntas matematicas']['Facil']['Pergunta 2']['Opções']['Opção 1']) // Retorna a opção especifica
    }
}

apiUrl.send()