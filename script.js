// Efeito de rolagem suave para os links da navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mensagem de Contato
const contatoBtn = document.getElementById('contatoBtn');
contatoBtn.addEventListener('click', () => {
    alert('Obrigado pelo interesse! Em breve nossa equipe de sustentabilidade entrará em contato.');
});

// Mudar cor do header ao rolar a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = '#1e3a1a';
    } else {
        header.style.background = '#2d5a27';
    }
});
