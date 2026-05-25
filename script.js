/* ============================================================
   PROJETO AGRO FORTE - LÓGICA COMPLETA E CORRIGIDA (SEM TRAVAMENTOS)
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
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        if (btnTheme) btnTheme.innerText = '☀️';
    } else {
        if (btnTheme) btnTheme.innerText = '🌓';
    }

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

// ============================================================
// 8. CONTROLE DOS MODAIS PADRÃO (PRODUTIVIDADE, ÁGUA, PRESERVAÇÃO)
// ============================================================
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.animation = 'zoomIn 0.4s forwards'; // Dispara animação do CSS
        }
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.animation = 'zoomOut 0.3s forwards'; // Dispara animação de saída do CSS
            // Aguarda a animação terminar antes de ocultar o display totalmente
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        } else {
            modal.style.display = 'none';
        }
    }
}

// ============================================================
// 9. LÓGICA DO MODAL DINÂMICO ("COMO AJUDAR")
// ============================================================

// Injeta o HTML estruturado do modal dinâmico no final do Body
const modalContainer = document.createElement('div');
modalContainer.id = 'card-modal';
modalContainer.classList.add('modal');
modalContainer.style.display = 'none';
modalContainer.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <img id="modal-img" src="" alt="" style="width:100%; max-height:250px; object-fit:cover; border-radius:8px; margin-bottom:15px;">
        <h3 id="modal-title"></h3>
        <p id="modal-desc"></p>
    </div>
`;
document.body.appendChild(modalContainer);

const ajudaModal = document.getElementById('card-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modal-img');
const modalClose = ajudaModal.querySelector('.close');

// Evento para abrir o modal quando clicar em qualquer Card de ajuda
document.querySelectorAll('.cards-grid .card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Pega as informações de dentro do card clicado
        const imgSrc = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;

        // Alimenta o conteúdo do modal dinâmico
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        // Exibe o modal na tela redefinindo a animação inicial limpa
        ajudaModal.style.display = 'block';
        const content = ajudaModal.querySelector('.modal-content');
        if (content) {
            content.style.animation = 'zoomIn 0.4s forwards';
        }
    });
});

// Evento para fechar o modal dinâmico pelo botão 'X'
if (modalClose) {
    modalClose.addEventListener('click', () => {
        const content = ajudaModal.querySelector('.modal-content');
        if (content) {
            content.style.animation = 'zoomOut 0.3s forwards';
            setTimeout(() => {
                ajudaModal.style.display = 'none';
            }, 300);
        } else {
            ajudaModal.style.display = 'none';
        }
    });
}

// ============================================================
// 10. FECHAMENTO GLOBAL - DETECTAR CLIQUE FORA DO CONTEÚDO
// ============================================================
window.addEventListener('click', (e) => {
    // Se o elemento clicado possuir a classe 'modal' (o fundo escuro)
    if (e.target.classList.contains('modal')) {
        // Dispara a função correta de fechar que limpa as animações do CSS
        if (e.target.id === 'card-modal') {
            const content = ajudaModal.querySelector('.modal-content');
            if (content) {
                content.style.animation = 'zoomOut 0.3s forwards';
                setTimeout(() => {
                    ajudaModal.style.display = 'none';
                }, 300);
            } else {
                ajudaModal.style.display = 'none';
            }
        } else {
            closeModal(e.target.id);
        }
    }
});
