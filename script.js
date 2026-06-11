PROJETO AGRO FORTE - SCRIPT CONTROLADOR
    */

// 1. FUNÇÕES GLOBAIS DE CONTROLE DOS MODAIS NA TAG <DIALOG>
// Deixadas fora do DOMContentLoaded para que os seletores 'onclick' do HTML funcionem diretamente.
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal && typeof modal.showModal === 'function') {
        modal.showModal(); // Abre o pop-up nativo e centralizado pelo CSS
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal && typeof modal.close === 'function') {
        modal.close(); // Fecha o pop-up nativamente limpando a tela
    }
}

// Inicialização de todos os seletores e eventos internos do DOM
document.addEventListener('DOMContentLoaded', () => {

    // 
    // 2. CONFIGURAÇÃO DA NAVBAR AO ROLAR
    // 
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

    // 
    // 3. SAUDAÇÃO DINÂMICA
    //
    const saudacaoTexto = document.getElementById('saudacao-texto');
    if (saudacaoTexto) {
        const hora = new Date().getHours();
        let mensagem = '';

        if (hora >= 5 && hora < 12) {
            mensagem = ' Bom dia! ';
        } else if (hora >= 12 && hora < 18) {
            mensagem = ' Boa tarde! ';
        } else {
            mensagem = ' Boa noite! ';
        }

        saudacaoTexto.textContent = mensagem + 'Bem-vindo ao futuro sustentável.';
    }

    // 
    // 4. ALTERNADOR DE MODO ESCURO (DARK MODE)
    // 
    const btnDarkMode = document.getElementById("toggle-dark-mode");
    if (btnDarkMode) {
        btnDarkMode.addEventListener("click", () => {
            document.documentElement.classList.toggle("dark-mode");
            const isDark = document.documentElement.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    //
    // 5. MENU MOBILE RESPONSIVO
    // 
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

    // 
    // 6. FORMULÁRIO DE PARTICIPAÇÃO COM VALIDAÇÃO
    // 
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

    // 
    // 7. ANIMAÇÃO SUAVE DE ENTRADA (INFO-ITEMS)
    // 
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

    // 
    // 8. ACESSIBILIDADE - REDIMENSIONAMENTO DE FONTE
    // 
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    let tamanhoAtual = parseInt(localStorage.getItem('fontSize')) || 100;

    function atualizarFonte() {
        document.documentElement.style.fontSize = tamanhoAtual + '%';
        localStorage.setItem('fontSize', tamanhoAtual);
    }

    atualizarFonte(); // Executa para reter a configuração preferida do usuário

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

    //
    // 9. POP-UP MODAL DINÂMICO PARA A SEÇÃO "COMO AJUDAR"
    // 
    // Criando a estrutura usando a nova tag estrutural <dialog> para evitar falhas de foco
    const dialogAjuda = document.createElement('dialog');
    dialogAjuda.id = 'card-modal';
    dialogAjuda.classList.add('modal');

    dialogAjuda.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img id="modal-img" src="" alt="" style="width:100%; max-height:220px; object-fit:cover; border-radius:12px; margin-bottom:10px;">
            <h3 id="modal-title"></h3>
            <p id="modal-desc"></p>
        </div>
    `;
    document.body.appendChild(dialogAjuda);

    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImg = document.getElementById('modal-img');
    const modalClose = dialogAjuda.querySelector('.close');

    // Mapeamento de cliques nos cards da seção "Como Ajudar"
    document.querySelectorAll('.cards-grid .card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            
            const imgSrc = card.querySelector('img')?.src || '';
            const title = card.querySelector('h3')?.textContent || '';
            const desc = card.querySelector('p')?.textContent || '';

            if (modalImg) modalImg.src = imgSrc;
            if (modalTitle) modalTitle.textContent = title;
            if (modalDesc) modalDesc.textContent = desc;

            dialogAjuda.showModal(); // Ativa de forma nativa e centralizada
        });
    });

    // Evento para fechar o modal dinâmico no botão (X)
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            dialogAjuda.close();
        });
    }

    // 
    // 10. REQUISITO COMPLEMENTAR: FECHAMENTO AO CLICAR FORA (BACKDROP)
    // 
    // Aplica o comportamento em TODOS os elementos <dialog> (HTML fixos e o dinâmico acima)
    document.querySelectorAll('dialog.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    });
});
