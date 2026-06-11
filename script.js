// =====================
// MENU MOBILE
// =====================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// =====================
// MODO ESCURO
// =====================
const toggleDarkMode = document.getElementById('toggle-dark-mode');

if (toggleDarkMode) {
    toggleDarkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// carregar tema salvo
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// =====================
// AUMENTAR / DIMINUIR FONTE
// =====================
const btnAumentar = document.getElementById('btn-aumentar');
const btnDiminuir = document.getElementById('btn-diminuir');

if (btnAumentar) {
    btnAumentar.addEventListener('click', () => {
        let size = parseInt(window.getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (size + 2) + "px";
    });
}

if (btnDiminuir) {
    btnDiminuir.addEventListener('click', () => {
        let size = parseInt(window.getComputedStyle(document.body).fontSize);
        if (size > 10) {
            document.body.style.fontSize = (size - 2) + "px";
        }
    });
}

// =====================
// SAUDAÇÃO DINÂMICA
// =====================
const saudacao = document.getElementById('saudacao-texto');

if (saudacao) {
    const hora = new Date().getHours();

    if (hora < 12) {
        saudacao.textContent = "Bom dia! 🌞";
    } else if (hora < 18) {
        saudacao.textContent = "Boa tarde! 🌤️";
    } else {
        saudacao.textContent = "Boa noite! 🌙";
    }
}

// =====================
// QUIZ
// =====================
const quizButtons = document.querySelectorAll('.quiz-btn');
const quizFeedback = document.getElementById('quiz-feedback');

quizButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.answer === "certo") {
            quizFeedback.textContent = "✅ Correto!";
            quizFeedback.style.color = "green";
        } else {
            quizFeedback.textContent = "❌ Errado!";
            quizFeedback.style.color = "red";
        }
    });
});

// =====================
// FORM CONTATO
// =====================
const btnParticipar = document.getElementById('btn-participar');
const userName = document.getElementById('user-name');
const feedback = document.getElementById('feedback-msg');

if (btnParticipar) {
    btnParticipar.addEventListener('click', () => {
        if (!userName.value.trim()) {
            feedback.textContent = "Digite seu nome!";
            feedback.style.color = "red";
        } else {
            feedback.textContent = `Obrigado, ${userName.value}! Você foi registrado.`;
            feedback.style.color = "green";
        }
    });
}
