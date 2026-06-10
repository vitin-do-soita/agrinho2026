/* ============================================================
   PROJETO AGRO FORTE 
   ============================================================ */

// Funções Globais para os Modais do HTML (Devem ficar fora do DOMContentLoaded para o 'onclick' funcionar)
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Evita rolar a página com modal aberto
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Devolve o scroll da página
    }
}

// Inicialização de todos os seletores e eventos do DOM
document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. CONFIGURAÇÃO DA NAVBAR AO ROLAR
    // ============================================================
    const nav = document.querySelector('.navbar');
    if (nav) {
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
    }

    // ============================================================
    // 2. SAUDAÇÃO DINÂMICA 
    // ============================================================
    const saudacaoTexto = document.getElementById('saudacao-texto');
    if (saudacaoTexto) {
        const hora = new Date().getHours();
        let mensagem = '';

        if (hora >= 5 && hora < 12) {
            mensagem = '🌱 Bom dia! ';
        } else if (hora >= 12 && hora < 18) {
            mensagem = '☀️ Boa tarde! ';
        } else {
            mensagem = '🌙 Boa noite! '; // Captura corretamente o período das 18h às 04h
        }

        saudacaoTexto.textContent = mensagem + 'Bem-vindo ao futuro sustentável.';
    }

    // ============================================================
    // 3. DARK MODE
    // ============================================================
    const btnDarkMode = document.getElementById("toggle-dark-mode");
    if (btnDarkMode) {
        // O tema salvo já é verificado no Head do HTML para evitar Flash, 
        // mas garantimos a sincronia do estado aqui se necessário.
        btnDarkMode.addEventListener("click", () => {
            document.documentElement.classList.toggle("dark-mode");
            const isDark = document.documentElement.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // ============================================================
    // 4. MENU MOBILE
    // ============================================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            });
        });
    }

    // ============================================================
    // 5. FORMULÁRIO DE PARTICIPAÇÃO
    // ============================================================
    const btnParticipar = document.getElementById('btn-participar');
    const inputNome = document.getElementById('user-name');
    const feedbackMsg = document.getElementById('feedback-msg');

    if (btnParticipar && inputNome && feedbackMsg) {
        btnParticipar.addEventListener('click', () => {
            const nome = inputNome.value.trim();

            if (nome !== '') {
                feedbackMsg.textContent = `Obrigado por se juntar a nós, ${nome}!`;
                feedbackMsg.style.color = 'var(--primary)';
                inputNome.value = '';
            } else {
                feedbackMsg.textContent = 'Por favor, digite seu nome.';
                feedbackMsg.style.color = 'red';
            }
        });
    }

    // ============================================================
    // 6. ANIMAÇÃO DOS INFO-ITEMS 
    // ============================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });

    // ============================================================
    // 7. ACESSIBILIDADE - TAMANHO DA FONTE
    // ============================================================
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    let tamanhoAtual = parseInt(localStorage.getItem('fontSize')) || 100;

    function atualizarFonte() {
        document.documentElement.style.fontSize = tamanhoAtual + '%';
        localStorage.setItem('fontSize', tamanhoAtual);
    }

    atualizarFonte(); // Executa ao carregar para aplicar o tamanho guardado

    if (btnAumentar) {
        btnAumentar.addEventListener('click', () => {
            if (tamanhoAtual < 140) {
                tamanhoAtual += 10;
                atualizarFonte();
            }
        });
    }

    if (btnDiminuir) {
        btnDiminuir.addEventListener('click', () => {
            if (tamanhoAtual > 80) {
                tamanhoAtual -= 10;
                atualizarFonte();
            }
        });
    }

    // ============================================================
    // 8. MODAL DINÂMICO - SEÇÃO "COMO AJUDAR"
    // ============================================================
    const modalContainer = document.createElement('div');
    modalContainer.id = 'card-modal';
    modalContainer.classList.add('modal');
    modalContainer.style.display = 'none';

    modalContainer.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img id="modal-img" src="" alt="" style="width:100%; max-height:250px; object-fit:cover; border-radius:8px; margin-bottom:15px;">
            <h3 id="modal-title"></h3>
            <p id="modal-desc" style="color: var(--text-muted); margin-top: 10px;"></p>
        </div>
    `;
    document.body.appendChild(modalContainer);

    const ajudaModal = document.getElementById('card-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImg = document.getElementById('modal-img');
    const modalClose = ajudaModal.querySelector('.close');

    document.querySelectorAll('.cards-grid .card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            
            const imgSrc = card.querySelector('img')?.src || '';
            const title = card.querySelector('h3')?.textContent || '';
            const desc = card.querySelector('p')?.textContent || '';

            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;

            ajudaModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            ajudaModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Fechamento genérico de modais ao clicar na área escura de fora
    window.addEventListener('click', (e) => {
        // Fecha o modal dinâmico do "Como Ajudar"
        if (e.target === ajudaModal) {
            ajudaModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        // Fecha os modais padrões do HTML ('produtividade', 'agua', 'preservacao')
        if (e.target.classList && e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
// Função para abrir o pop-up estilo modal
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.showModal(); // Abre o pop-up centralizado e ativa o efeito de fundo
    }
}

// Função para fechar o pop-up
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.close(); // Fecha o pop-up e libera a rolagem da página
    }
}

// Opcional: Fecha o pop-up se o usuário clicar fora do conteúdo (no fundo escuro)
document.querySelectorAll('dialog.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
});
