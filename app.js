alert('Confirme no botão Allow para confimar o som na pagina!!');
let listaDeNumerosSorteados = [];
let limiteDeNumerosNaLista = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
/* o uso do document.querySelector na function para manipular o h1 onde vai aparecer o 
titulo e o 'p' no paragrafo e innerHTML para inserir textos no titulo e paragrafo  */
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}
function mostrarMensagenInicial() {
   exibirTextoNaTela('h1', 'Advinhe o número secreto!');
   exibirTextoNaTela('p', 'Escolha um número entre 1 a 10:'); 
}
mostrarMensagenInicial();
/* o uso do function para fazer a variavel verificarChute ter funcionalidade quando
for clicado, ira rodar o bloco de codigo */
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
/* functions para ter um numero aleatorio novo todo jogo, limpar o campo toda vez que colocar um 
   número e não for o escolhido e o novo jogo apos acertar o numero o botão novo jogo é liberado*/
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