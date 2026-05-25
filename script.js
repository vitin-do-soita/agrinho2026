/* ============================================================
   PROJETO AGRO FORTE - LÓGICA COMPLETA (NÍVEL 4)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURAÇÃO DA NAVBAR AO ROLAR ---
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '10px 5%';
            nav.style.backgroundColor = 'var(--navbar-bg)';
            nav.style.boxShadow = 'var(--shadow)';
        } else {
            nav.style.padding = '20px 5%';
            nav.style.boxShadow = 'none';
        }
    });

    // --- 2. SAUDAÇÃO DINÂMICA ---
    const saudacaoTexto = document.getElementById('saudacao-texto');
    if (saudacaoTexto) {
        const hour = new Date().getHours();
        let msg = "";
        if (hour < 12) msg = "🌱 Bom dia! ";
        else if (hour < 18) msg = "☀️ Boa tarde! ";
        else msg = "🌙 Boa noite! ";
        saudacaoTexto.innerText = msg + "Bem-vindo ao futuro sustentável.";
    }

    // --- 3. MODO ESCURO ---
    const btnTheme = document.getElementById('toggle-dark-mode');

    // 3.a Inicializa o tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        if (btnTheme) btnTheme.innerText = '☀️';
    } else {
        if (btnTheme) btnTheme.innerText = '🌓';
    }

    // 3.b Listener do botão
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            const isDark = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            btnTheme.innerText = isDark ? '☀️' : '🌓';
        });
    }

    // --- 4. MENU MOBILE ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // --- 5. FORMULÁRIO DE PARTICIPAÇÃO ---
    const btnParticipar = document.getElementById('btn-participar');
    const inputNome = document.getElementById('user-name');
    const feedbackMsg = document.getElementById('feedback-msg');

    if (btnParticipar) {
        btnParticipar.addEventListener('click', () => {
            const nome = inputNome.value.trim();
            if (nome !== "") {
                feedbackMsg.innerText = `Obrigado por se juntar a nós, ${nome}!`;
                feedbackMsg.style.color = "var(--primary)";
                inputNome.value = "";
            } else {
                feedbackMsg.innerText = "Por favor, digite seu nome.";
                feedbackMsg.style.color = "red";
            }
        });
    }

    // --- 6. SCROLL REVEAL PARA INFO ITEMS ---
    const observarScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-item').forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "all 0.6s ease-out";
        observarScroll.observe(item);
    });

    // --- 7. CARTÕES EXPANDÍVEIS ---
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.expandable-card');
            if (card) {
                card.classList.toggle('collapsed');
                btn.innerText = card.classList.contains('collapsed') ? "Ver Mais" : "Ver Menos";
            }
        });
    });

});

// --- 8. MODAIS ---
function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'block';

    const content = modal.querySelector('.modal-content');
    content.style.animation = 'zoomIn 0.4s forwards';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    const content = modal.querySelector('.modal-content');

    // animação de saída
    content.style.animation = 'zoomOut 0.3s forwards';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Fechar modal ao clicar fora da caixa
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if(event.target == modal) {
            closeModal(modal.id);
        }
    });
}
// =============================
// Cards "Como Ajudar" - Modal
// =============================

// Seleciona todos os cards da seção
const comoAjudarCards = document.querySelectorAll('.como-ajudar .card');

// Cria modal dinâmico se ele ainda não existir
let modal = document.getElementById('card-modal');
if (!modal) {
    modal = document.createElement('div');
    modal.id = 'card-modal';
    modal.classList.add('modal');
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img id="modal-img" src="" alt="" style="width:100%; max-height:250px; object-fit:cover; border-radius:8px; margin-bottom:15px;">
            <h3 id="modal-title"></h3>
            <p id="modal-desc"></p>
        </div>
    `;
    document.body.appendChild(modal);
}

const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modal-img');
const modalClose = modal.querySelector('.close');

// Função para abrir modal ao clicar no card
comoAjudarCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;

        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        modal.style.display = 'block';
        // Remove qualquer travamento de animação residual
        const content = modal.querySelector('.modal-content');
        if (content) content.style.animation = 'none'; 
    });
});

// Fechar o modal dinâmico ao clicar no 'X'
if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// O ÚNICO OUVINTE GLOBAL PARA FECHAR CLICANDO FORA (Gerencia todos os modais da página com segurança)
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        
        // Se for o modal do "Como Ajudar" (dinâmico), fecha direto sem quebrar animações
        if (modalId === 'card-modal') {
            e.target.style.display = 'none';
        } else {
            // Se forem os modais normais (produtividade, agua, preservacao), usa a sua função com animação
            closeModal(modalId);
        }
    }
});
