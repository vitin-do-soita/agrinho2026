// Seleção de elementos do DOM
const btnGreet = document.getElementById('btn-greet');
const inputName = document.getElementById('user-name');
const welcomeMsg = document.getElementById('welcome-msg');
const btnTheme = document.getElementById('btn-theme');
const counterDisplay = document.getElementById('counter');
const btnCounter = document.getElementById('btn-update-counter');

// 1. Variável para armazenar dados e processar informação
let countValue = 0;

// 2. Função para personalizar saudação (Manipulação de DOM)
btnGreet.addEventListener('click', () => {
    const name = inputName.value;
    if (name) {
        welcomeMsg.innerText = `Olá, ${name}! Vamos cultivar o amanhã?`;
        inputName.value = ''; // Limpa o campo
    } else {
        alert("Por favor, digite seu nome.");
    }
});

// 3. Atualização de contador (Lógica de processamento)
btnCounter.addEventListener('click', () => {
    countValue += 150; // Simula acréscimo de hectares
    counterDisplay.innerText = countValue.toLocaleString('pt-BR');
    
    // Efeito visual simples via JS
    counterDisplay.style.color = '#8bc34a';
    setTimeout(() => counterDisplay.style.color = '', 500);
});

// 4. Melhoria de experiência: Modo Escuro
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Comentário: O script garante que não existam erros no console
console.log("Sistema AgroSustentável carregado com sucesso.");
