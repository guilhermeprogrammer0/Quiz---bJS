import {questoes} from './banco-questoes.js';
const inicioQuiz = document.querySelector(".inicioQuiz");   
const perguntas = document.querySelector(".perguntas");
const respostas = document.querySelector(".respostas");
const textoPergunta = document.querySelector(".textoPergunta");
const proxPergunta = document.querySelector(".proxPergunta");

inicioQuiz.addEventListener("click",iniciarQuiz);
let indiceAtualPergunta = 0;
let totalAcertos = 0;
function iniciarQuiz(){
    inicioQuiz.classList.add("escondido");
    perguntas.classList.remove("escondido");
    proximaPergunta();

}
function proximaPergunta(){
    limparConfiguracoes();
    if(indiceAtualPergunta === questoes.length){
        return finalizarQuiz();
    }
    textoPergunta.textContent = questoes[indiceAtualPergunta].questao;
    questoes[indiceAtualPergunta].resposta.forEach(r=>{
        const novoBotao = document.createElement("button");
        novoBotao.classList.add("botao","resposta");
        novoBotao.textContent = r.texto;
        if(r.correta){
            novoBotao.dataset.correto = r.correta;
        }
        respostas.appendChild(novoBotao);

        novoBotao.addEventListener("click",selecionarResposta);
    })
}
function selecionarResposta(event){
    const botaoClicado = event.target;
    if(botaoClicado.dataset.correto){
        totalAcertos++;
    }
    document.querySelectorAll(".resposta").forEach(botao=>{
        if(botao.dataset.correto){
            botao.classList.add("correta");
        }
        else{
            botao.classList.add("incorreta");
        }
        botao.disabled = true;
    })
    proxPergunta.classList.remove("escondido");
    indiceAtualPergunta++;
}
proxPergunta.addEventListener("click",proximaPergunta);


function limparConfiguracoes(){
    while(respostas.firstChild){
        respostas.removeChild(respostas.firstChild)
    }
    proxPergunta.classList.add("escondido");
}

function finalizarQuiz(){
    perguntas.classList.add("perguntasFinal")
    perguntas.innerHTML = 
    `
    <p class='text-center text-white text-2xl'> Você acertou ${totalAcertos} de ${questoes.length}! </p>
    <button class='botao inicioQuiz' onclick=window.location.reload()> Refazer teste </button>
    `
}

