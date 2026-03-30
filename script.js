function switchTab(tabId) {
    // 1. Esconder todos os conteúdos
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    // 2. Remover classe ativa dos itens do menu
    const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    // 3. Mostrar o conteúdo selecionado
    document.getElementById(tabId).classList.add('active');

    // 4. Ativar o item correspondente no menu lateral
    // Buscamos o item que possui a função switchTab com o ID correto
    menuItems.forEach(item => {
        if(item.getAttribute('onclick').includes(tabId)) {
            item.classList.add('active');
        }
    });

    // 5. Scroll para o topo da área de conteúdo
    document.querySelector('.content-area').scrollTop = 0;
}

// Pequeno efeito sonoro ou feedback visual pode ser adicionado aqui
console.log("Sistema AgroConceito Carregado.");
