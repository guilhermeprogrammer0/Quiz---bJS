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

const questoes = [
    {
        questao: "Qual é a área de um quadrado que tem lado de 6 cm?",
        resposta:[
            
                {texto: "36 cm quadrados", correta: true},
                {texto: "9 cm quadrados", correta: false},
                {texto: "8 m quadrados", correta: false},
                {texto: "10 cm quadrados", correta: false}
        ]
    },
    {
        questao: "Qual é a soma de 25 e 37?",
        resposta:[
            
                {texto: "85", correta: false},
                {texto: "62", correta: true},
                {texto: "15", correta: false},
                {texto: "2", correta: false}
        ]
    },
    {
        questao: "20% de 100",
        resposta:[
            
                {texto: "50", correta: false},
                {texto: "89", correta: false},
                {texto: "4", correta: false},
                {texto: "20", correta: true}
        ]
    },
    {
        questao: "Qual é a média dos números 10, 15 e 20?",
        resposta:[
            
                {texto: "52", correta: false},
                {texto: "10", correta: false},
                {texto: "5", correta: false},
                {texto: "Nenhuma das alternativas", correta: true}
        ]
    }
]