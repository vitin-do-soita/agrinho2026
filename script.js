/* ============================================================
PROJETO AGRO FORTE - SCRIPT COMPLETO CORRIGIDO
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

```
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

    if (hora < 12) {
        mensagem = '🌱 Bom dia! ';
    } else if (hora < 18) {
        mensagem = '☀️ Boa tarde! ';
    } else {
        mensagem = '🌙 Boa noite! ';
    }

    saudacaoTexto.textContent =
        mensagem + 'Bem-vindo ao futuro sustentável.';
}

// ============================================================
// 3. MODO ESCURO
// ============================================================
const btnTheme = document.getElementById('toggle-dark-mode');

const temaSalvo = localStorage.getItem('theme');

if (temaSalvo === 'dark') {
    document.documentElement.classList.add('dark-mode');

    if (btnTheme) {
        btnTheme.textContent = '☀️';
    }
}

if (btnTheme) {
    btnTheme.addEventListener('click', () => {

        document.documentElement.classList.toggle('dark-mode');

        const modoEscuro =
            document.documentElement.classList.contains('dark-mode');

        localStorage.setItem(
            'theme',
            modoEscuro ? 'dark' : 'light'
        );

        btnTheme.textContent = modoEscuro ? '☀️' : '🌓';
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

            feedbackMsg.textContent =
                `Obrigado por se juntar a nós, ${nome}!`;

            feedbackMsg.style.color = 'var(--primary)';
            inputNome.value = '';

        } else {

            feedbackMsg.textContent =
                'Por favor, digite seu nome.';

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

}, {
    threshold: 0.1
});

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

let tamanhoAtual =
    parseInt(localStorage.getItem('fontSize')) || 100;

function atualizarFonte() {
    document.documentElement.style.fontSize =
        tamanhoAtual + '%';

    localStorage.setItem(
        'fontSize',
        tamanhoAtual
    );
}

atualizarFonte();

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
// 8. MODAL DINÂMICO - COMO AJUDAR
// ============================================================

const modalContainer = document.createElement('div');

modalContainer.id = 'card-modal';
modalContainer.classList.add('modal');
modalContainer.style.display = 'none';

modalContainer.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>

        <img
            id="modal-img"
            src=""
            alt=""
            style="
                width:100%;
                max-height:250px;
                object-fit:cover;
                border-radius:8px;
                margin-bottom:15px;
            "
        >

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

document.querySelectorAll('.cards-grid .card').forEach(card => {

    card.addEventListener('click', (e) => {

        e.preventDefault();
        e.stopPropagation();

        const imgSrc = card.querySelector('img')?.src || '';
        const title = card.querySelector('h3')?.textContent || '';
        const desc = card.querySelector('p')?.textContent || '';

        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        ajudaModal.style.display = 'block';

    });
});

if (modalClose) {

    modalClose.addEventListener('click', () => {
        ajudaModal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {

    if (e.target === ajudaModal) {
        ajudaModal.style.display = 'none';
    }
});
```

});

/* ============================================================
9. MODAIS PADRÃO
============================================================ */

function openModal(id) {

```
const modal = document.getElementById(id);

if (modal) {
    modal.style.display = 'block';
}
```

}

function closeModal(id) {

```
const modal = document.getElementById(id);

if (modal) {
    modal.style.display = 'none';
}
```

}

window.addEventListener('click', (e) => {

```
if (e.target.classList.contains('modal')) {

    if (
        e.target.id === 'produtividade' ||
        e.target.id === 'agua' ||
        e.target.id === 'preservacao'
    ) {
        closeModal(e.target.id);
    }
}
```

});
