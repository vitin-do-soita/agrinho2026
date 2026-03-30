// Filtro de Culturas
const filterBtns = document.querySelectorAll('.filter-btn');
const cultureCards = document.querySelectorAll('.culture-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover classe ativa
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        cultureCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Busca em Tempo Real
const searchInput = document.getElementById('culturaSearch');
searchInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    
    cultureCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Mensagem Interativa
document.getElementById('contatoBtn').addEventListener('click', () => {
    const nome = prompt("Como podemos te chamar?");
    if(nome) {
        alert(`Olá ${nome}! Nossos consultores técnicos de solo entrarão em contato.`);
    }
});

// Suavização de scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
