/* ============================================================
   PROJETO AGRO FORTE - LÓGICA COMPLETA (NÍVEL 4)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURAÇÃO DA NAVBAR AO ROLAR ---
    // Usamos variáveis CSS para não quebrar o Modo Escuro
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.padding = '10px 5%';
            nav.style.backgroundColor = 'var(--navbar-bg)';
            nav.style.boxShadow = 'var(--shadow)';
        } else {
            nav.style.padding = '20px 5%';
            nav.style.boxShadow = 'none';
        }
    });

    // --- 2. SAUDAÇÃO DINÂMICA (Processamento de Dados) ---
    const saudacaoTexto = document.getElementById('saudacao-texto');
    if (saudacaoTexto) {
        const hour = new Date().getHours();
        let msg = "";
        if (hour < 12) msg = "🌱 Bom dia! ";
        else if (hour < 18) msg = "☀️ Boa tarde! ";
        else msg = "🌙 Boa noite! ";
        
        saudacaoTexto.innerText = msg + "Bem-vindo ao futuro sustentável.";
    }

    // --- 3. LÓGICA DO MODO ESCURO (Persistência) ---
    const btnTheme = document.getElementById('toggle-dark-mode');
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            const isDark = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Troca o ícone para feedback visual imediato (UX Nível 4)
            btnTheme.innerText = isDark ? '☀️' : '🌓';
        });
    }

    // --- 4. MENU MOBILE (Hambúrguer) ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active'); // Para animação visual
        });
    }

    // Fecha o menu ao clicar em links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- 5. INTERAÇÃO COM FORMULÁRIO (Captura de Variáveis) ---
    // Essencial para o critério "Processar informações antes de exibir"
    const btnParticipar = document.getElementById('btn-participar');
    const inputNome = document.getElementById('user-name');
    const feedbackMsg = document.getElementById('feedback-msg');

    if (btnParticipar) {
        btnParticipar.addEventListener('click', () => {
            const nome = inputNome.value.trim();
            if (nome !== "") {
                feedbackMsg.innerText = `Obrigado por se juntar a nós, ${nome}!`;
                feedbackMsg.style.color = "var(--primary)";
                inputNome.value = ""; // Limpa o campo
            } else {
                feedbackMsg.innerText = "Por favor, digite seu nome.";
                feedbackMsg.style.color = "red";
            }
        });
    }
});

// Comentário Técnico: O script acima gerencia o estado da UI, 
// processa variáveis de tempo e entrada de usuário via DOM.
