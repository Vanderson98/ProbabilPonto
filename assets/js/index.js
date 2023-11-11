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
    if(number == 2){
        console.log('Dois jogadores');
    }else if(number == 3){
        console.log('Três jogadores');
    }else {
        console.log('Quatro jogadores');
    }
}