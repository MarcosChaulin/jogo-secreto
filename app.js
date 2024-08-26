alert('Confirme no botão Allow para confimar o som na pagina!!');
let listaDeNumerosSorteados = [];
let limiteDeNumerosNaLista = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}
function mostrarMensagenInicial() {
   exibirTextoNaTela('h1', 'Advinhe o número secreto!');
   exibirTextoNaTela('p', 'Escolha um número entre 1 a 100:'); 
}
mostrarMensagenInicial();

function verificarChute() { 
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Parabens!!'); 
        let textoTentativa = tentativas > 1 ? 'tentativas!' : 'tentativa!';
        let mensagemTentativa = `Você acertou o número secreto  com ${tentativas} ${textoTentativa}`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor, tente novamente!');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior, tente novamente!');
        } 
        tentativas ++;    
    }   limparCampo();
}

function gerarNumeroAleatorio() {
     let numeroEscolhido = parseInt(Math.random() * limiteDeNumerosNaLista + 1);
     let quantidadeElementosNaLista = listaDeNumerosSorteados.length;

     if (quantidadeElementosNaLista == limiteDeNumerosNaLista) {
        listaDeNumerosSorteados = [];
     }
     if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
     } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
     }
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function novoJogo() {
    limparCampo();
    numeroSecreto = gerarNumeroAleatorio();
    mostrarMensagenInicial();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}