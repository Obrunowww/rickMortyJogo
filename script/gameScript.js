const tabuleiro = document.querySelector(".tabuleiro");
const main = document.querySelector("main");
const jogador = document.querySelector(".jogador");
const temporizador = document.querySelector(".temporizador");
const botãoDeRestart = document.querySelector(".recomeçar");
const mostrarJogador = document.querySelector(".mostrarJogador");
const mostarTempo = document.querySelector(".mostrarTempo");
const telaFimDeJogo = document.querySelector(".telaFimDeJogo");
// const cartasDoJogo = document.querySelectorAll(.)
let tempoAtual = 0;

let primeiraCarta = "";
let segundaCarta = "";
const personagens =[
    "beth",
    "jerry",
    "jessica",
    "morty",
    "pessoa-passaro",
    "pickle-rick",
    "rick",
    "summer",
    "meeseeks",
    'scroopy',
];


const restart = () =>{
    telaFimDeJogo.classList.add("fim");
    temporizador.innerHTML = "00"
    const removerCartas = document.querySelectorAll(".card")
    removerCartas.forEach(peça=>{
        peça.remove();
    })
    tempoAtual = 0
    começarTemporizador();
    carregarOJogo();




}


const mostrarFimDeJogo = () =>{
    telaFimDeJogo.classList.remove("fim")
    mostrarJogador.innerHTML= localStorage.getItem("jogador") 
    mostarTempo.innerHTML = temporizador.innerHTML
    botãoDeRestart.addEventListener("click", restart)
    
    

}







const verificarFimDoJogo = () =>{
    const cartasDesabilitadas = document.querySelectorAll('.cartaDesabilitada');
    
    if(cartasDesabilitadas.length === 20){
        

        setTimeout(()=>{
            clearInterval(this.loop);
            mostrarFimDeJogo();
        },1000)
        

    }
}


const criarElementos = (tag, className) =>{
    const elemento = document.createElement(tag);
    elemento.className = className;
    return elemento;
}
const afiliar =(pai, filho)=>{
   const afiliado = pai.appendChild(filho)
   return afiliado
}
const checarCartas = () =>{
    
    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundoPersonagem = segundaCarta.getAttribute('data-personagem');

    if(primeiroPersonagem === segundoPersonagem){

        primeiraCarta.firstChild.classList.add('cartaDesabilitada');
        segundaCarta.firstChild.classList.add('cartaDesabilitada');

        primeiraCarta= "";
        segundaCarta = "";

        verificarFimDoJogo()
    }else{

        setTimeout(() => {
            primeiraCarta.classList.remove("revelarCarta")
            segundaCarta.classList.remove("revelarCarta")
            
            primeiraCarta = "";
            segundaCarta = "";

        }, 500);
        
        
    }
}

const revelarCarta =({ target })=>{
    

    if(target.parentNode.className.includes("revelarCarta")){
        return;
    }

    if(primeiraCarta === ""){
        target.parentNode.classList.add("revelarCarta");
        primeiraCarta = target.parentNode;
    }else if(segundaCarta === ""){
        target.parentNode.classList.add("revelarCarta");
        segundaCarta = target.parentNode;
        checarCartas();
    }
}

const criarCarta = (personagem) =>{
    const carta = criarElementos("div", "card");
    const frente = criarElementos("div", "posiçãoDaCarta frente");
    const verso = criarElementos("div","posiçãoDaCarta verso");

    frente.style.backgroundImage = `url(../images/${personagem}.png)`

    // carta.appendChild(frente);
    afiliar(carta, frente);
    afiliar(carta, verso);

    carta.addEventListener("click", revelarCarta);
    carta.setAttribute("data-personagem", personagem);

    return carta;
}

const carregarOJogo = () =>{

    const duplicarPersonagens = [...personagens, ...personagens];

    const espalharPersonagens = duplicarPersonagens.sort( ()=>Math.random()-0.5);

    espalharPersonagens.forEach((personagem)=>{
        
        const personagemEscolhido = criarCarta(personagem);
        afiliar(tabuleiro,personagemEscolhido)
    })
}

const começarTemporizador = () =>{
    
    this.loop = setInterval(()=>{

        tempoAtual = tempoAtual + 1 
        
        temporizador.innerHTML = tempoAtual
        
        if(tempoAtual < 10){
            temporizador.innerHTML = "0" + tempoAtual
        }

    },1000)

}


window.onload = () =>{
    jogador.innerHTML = localStorage.getItem("jogador")
    começarTemporizador();
    carregarOJogo();
}

