let listaDeNumerosSorteados = []
let numeroMaximo = 10
let numeroSecreto = gerarNumeroAleatorio()
let quantidadeDeTentativas = 1


function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {    
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!')
        let palavraTentativa = quantidadeDeTentativas > 1 ? 'tentativas' : 'tentativa' 
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${quantidadeDeTentativas} ${palavraTentativa}!`)

        document.getElementById('reiniciar').removeAttribute('disabled')

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor')
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior')
        }
        quantidadeDeTentativas++
        limparCampo()
        
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length

        if (quantidadeDeElementosNaLista == numeroMaximo) {
            listaDeNumerosSorteados = []
        }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido
    }
}

function limparCampo () {
    chute = document.querySelector('input')
    chute.value = ''
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    quantidadeDeTentativas = 1
    limparCampo()
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

