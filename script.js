/*
   PROJETO AGRO FORTE - SCRIPT CONTROLADOR (CORRIGIDO)
*/

// ================= MODAIS FIXOS =================
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.showModal();
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.close();
}

// ================= DOM READY =================
document.addEventListener('DOMContentLoaded', () => {

    // ================= NAV SCROLL =================
    const nav = document.querySelector('.navbar');

    if (nav) {
        window.addEventListener('scroll', () => {
            nav.style.padding = window.scrollY > 50 ? '10px 5%' : '20px 5%';
        });
    }

    // ================= SAUDAÇÃO =================
    const saudacaoTexto = document.getElementById('saudacao-texto');

    if (saudacaoTexto) {
        const hora = new Date().getHours();

        let msg = hora < 12 ? 'Bom dia' :
                  hora < 18 ? 'Boa tarde' :
                  'Boa noite';

        saudacaoTexto.textContent = `${msg}! Bem-vindo ao futuro sustentável.`;
    }

    // ================= DARK MODE =================
    const btnDark = document.getElementById('toggle-dark-mode');

    if (btnDark) {
        btnDark.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');

            const isDark = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // ================= MENU MOBILE =================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // ================= FORM =================
    const btn = document.getElementById('btn-participar');
    const input = document.getElementById('user-name');
    const msg = document.getElementById('feedback-msg');

    if (btn && input && msg) {
        btn.addEventListener('click', () => {
            const nome = input.value.trim();

            if (nome) {
                msg.textContent = `Obrigado, ${nome}!`;
                msg.style.color = 'var(--primary)';
                input.value = '';
            } else {
                msg.textContent = 'Digite seu nome.';
                msg.style.color = 'red';
            }
        });
    }

    // ================= ANIMAÇÃO INFO =================
    const items = document.querySelectorAll('.info-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    items.forEach(i => {
        i.style.opacity = '0';
        i.style.transform = 'translateY(20px)';
        i.style.transition = '0.6s';
        observer.observe(i);
    });

    // ================= FONT SIZE =================
    const up = document.getElementById('btn-aumentar');
    const down = document.getElementById('btn-diminuir');

    let size = parseInt(localStorage.getItem('fontSize')) || 100;

    const apply = () => {
        document.documentElement.style.fontSize = size + '%';
        localStorage.setItem('fontSize', size);
    };

    apply();

    if (up) {
        up.onclick = () => {
            if (size < 140) {
                size += 10;
                apply();
            }
        };
    }

    if (down) {
        down.onclick = () => {
            if (size > 80) {
                size -= 10;
                apply();
            }
        };
    }

    // ================= MODAL DINÂMICO =================
    const dialog = document.createElement('dialog');
    dialog.id = 'card-modal';
    dialog.className = 'modal';

    dialog.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img id="modal-img" style="width:100%; border-radius:10px;">
            <h3 id="modal-title"></h3>
            <p id="modal-desc"></p>
        </div>
    `;

    document.body.appendChild(dialog);

    const img = dialog.querySelector('#modal-img');
    const title = dialog.querySelector('#modal-title');
    const desc = dialog.querySelector('#modal-desc');
    const close = dialog.querySelector('.close');

    document.querySelectorAll('.cards-grid .card').forEach(card => {
        card.addEventListener('click', () => {
            img.src = card.querySelector('img')?.src || '';
            title.textContent = card.querySelector('h3')?.textContent || '';
            desc.textContent = card.querySelector('p')?.textContent || '';

            dialog.showModal();
        });
    });

    close.onclick = () => dialog.close();

    dialog.addEventListener('click', e => {
        if (e.target === dialog) dialog.close();
    });
});
