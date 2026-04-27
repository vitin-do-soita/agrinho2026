// Alterar estilo do Menu ao rolar a página
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 8%';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.padding = '20px 8%';
        nav.style.background = 'rgba(255, 255, 255, 0.9)';
    }
});

// Mensagem de Boas-vindas baseada no horário
const greeting = () => {
    const hour = new Date().getHours();
    const heroP = document.querySelector('.hero p');
    if (hour < 12) heroP.prepend("Bom dia! ");
    else if (hour < 18) heroP.prepend("Boa tarde! ");
    else heroP.prepend("Boa noite! ");
};

greeting();

// Comentário: O script acima manipula o DOM para melhorar a UX (Experiência do Usuário)
// --- Lógica do Modo Escuro ---
const btnTheme = document.getElementById('toggle-dark-mode');

if (btnTheme) {
    btnTheme.addEventListener('click', () => {
        // Alterna a classe dark-mode no elemento principal (html)
        document.documentElement.classList.toggle('dark-mode');
        
        // Salva a preferência do usuário para não resetar ao atualizar a página
        const isDark = document.documentElement.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Abre/Fecha o menu ao clicar nas barrinhas
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fecha o menu automaticamente ao clicar em um link (opcional, mas recomendado)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
