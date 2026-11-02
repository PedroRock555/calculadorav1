
const visor = document.getElementById("resultado");
const expressao = document.getElementById("expressao");

const botoes = document.querySelectorAll(".botoes button");

// Variáveis de controle
let numero1 = null;
let operacao = null;
let aguardandoNumero = false;


function adicionarNumero(numero) {

    if (aguardandoNumero) {
        visor.textContent = numero;
        aguardandoNumero = false;
    }

    else if (visor.textContent === "0") {
        visor.textContent = numero;
    }

    else {
        visor.textContent += numero;
    }
}


function selecionarOperacao(op) {

    numero1 = Number(visor.textContent.replace(",", "."));
    operacao = op;

    aguardandoNumero = true;

    expressao.textContent = numero1 + " " + op;
}


async function realizarCalculo() {

    const numero2 = Number(visor.textContent.replace(",", "."));

    try {

        const resposta = await fetch("http://127.0.0.1:5000/calcular", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                numero1: numero1,
                numero2: numero2,
                operacao: operacao
            })

        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro);
        }

        expressao.textContent = numero1 + " " + operacao + " " + numero2;

        visor.textContent = String(dados.resultado).replace(".", ",");

        numero1 = null;
        operacao = null;
        aguardandoNumero = true;

    }

    catch (erro) {

        visor.textContent = "Erro";
        expressao.textContent = erro.message;

    }
}


function limpar() {

    visor.textContent = "0";
    expressao.textContent = "";

    numero1 = null;
    operacao = null;
    aguardandoNumero = false;
}

function apagar() {

    if (aguardandoNumero) return;

    visor.textContent = visor.textContent.slice(0, -1);

    if (visor.textContent === "" || visor.textContent === "-") {
        visor.textContent = "0";
    }
}

function adicionarVirgula() {

    if (aguardandoNumero) {
        visor.textContent = "0,";
        aguardandoNumero = false;
        return;
    }

    if (!visor.textContent.includes(",")) {
        visor.textContent += ",";
    }
}


botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        const valor = botao.textContent.trim();

        const acao = botao.dataset.action;
        const op = botao.dataset.operation;

        if (acao === "limpar") {
            limpar();
        }

        else if (acao === "apagar") {
            apagar();
        }

        else if (acao === "calcular") {
            if (operacao !== null && !aguardandoNumero) {
                realizarCalculo();
            }
        }

        else if (op && op !== "porcentagem") {
            selecionarOperacao(op);
        }

        else if (valor === ",") {
            adicionarVirgula();
        }

        else if (!isNaN(Number(valor))) {
            adicionarNumero(valor);
        }

    });

});
