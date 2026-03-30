function openCulture(evt, cultureName) {
    // Esconder todos os painéis de cultura
    const panels = document.getElementsByClassName("culture-panel");
    for (let i = 0; i < panels.length; i++) {
        panels[i].classList.remove("active");
    }

    // Remover a classe "active" de todos os botões
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }

    // Mostrar o painel atual e adicionar classe active ao botão que clicou
    document.getElementById(cultureName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Efeito de Header ao rolar
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(27, 67, 50, 0.95)';
    } else {
        header.style.padding = '20px 0';
        header.style.background = '#1b4332';
    }
});
