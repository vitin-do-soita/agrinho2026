Criei o Agro Forte com o objetivo de desenvolver um ecossistema digital que mostre como a tecnologia de precisão e a sustentabilidade andam juntas no campo. Abaixo, explico em detalhes como planejei e construí a arquitetura do site usando HTML5, CSS3 e JavaScript puro.

🏗️ 1. Estrutura e Semântica (HTML5)
No arquivo index.html, minha prioridade foi utilizar uma estrutura limpa e semântica. Isso garante que o site seja bem interpretado por motores de busca (SEO) e totalmente acessível para leitores de tela.

Navegação (<header>): Desenvolvi uma barra de navegação fixa contendo a identidade visual e os gatilhos de acessibilidade. Inseri botões para alteração de contraste (🌓) e redimensionamento de fonte (A+ e A-).

Seção Hero (#home): É o cartão de visitas do site. Coloquei um elemento de texto temporário (Carregando...) com o id="saudacao-texto", que serve de âncora para a injeção da saudação baseada no horário real do usuário.

Conteúdo Principal (<main>): Dividi a narrativa do site em blocos lógicos usando a tag <section>. As áreas de atuação e projetos utilizam cartões estruturados, enquanto a seção de dados estatísticos (#info) recebeu atributos onclick configurados para disparar as janelas modais nativas do sistema.

Rodapé (<footer>): Centralizei as informações de direitos autorais e referências de mídia, carimbando o projeto com a tag do ano vigente (2026).

🎨 2. Identidade Visual, Temas e Responsividade (CSS3)
No style.css, adotei uma arquitetura baseada em Custom Properties (Variáveis CSS) para criar um sistema de temas robusto e performance fluida.

O Sistema de Dark Mode
Para evitar redundância de código, centralizei todas as cores do projeto em variáveis dentro do escopo :root. Quando o usuário ativa o modo escuro, o JavaScript injeta a classe .dark-mode na tag raiz <html>. O meu CSS simplesmente redefini os valores dessas variáveis:
Toda a transição de cores acontece de forma suave através da propriedade transition aplicada ao body. Também adicionei um filtro de brilho (filter: brightness(0.8)) nas imagens para garantir o conforto visual em ambientes escuros.

Layouts Dinâmicos (Flexbox e Grid)
Usei Flexbox com a propriedade flex-wrap: wrap nos containers de cartões tradicionais. Isso faz com que os elementos fiquem lado a lado em desktops e se alinhem verticalmente em telas menores.

Na seção "Como Ajudar", optei por CSS Grid com a regra repeat(auto-fit, minmax(250px, 1fr)). Essa abordagem permite que o próprio navegador calcule o espaço disponível e distribua os cards de forma responsiva sem a necessidade de dezenas de media queries.

🧠 3. Lógica e Interatividade (JavaScript)
Desenvolvi o arquivo script.js utilizando JavaScript puro (Vanilla JS) para garantir rapidez no carregamento e autonomia completa nas interações da página.

Saudação Inteligente por Horário
Programei o script para capturar a hora do sistema do visitante através do objeto new Date().getHours(). Montei uma estrutura condicional para avaliar o período do dia:

Entre 05:00 e 11:59, o sistema injeta a mensagem 🌱 Bom dia!.

Entre 12:00 e 17:59, o texto muda para ☀️ Boa tarde!.

Para os demais horários, o bloco else assume o controle exibindo 🌙 Boa noite!.

Persistência de Dados e Acessibilidade
Para que a experiência do usuário seja contínua, utilizei a API localStorage. Quando o visitante ajusta o tamanho da fonte (limitei a escala entre 80% e 140% para não quebrar o layout) ou escolhe um tema de cores, essa preferência é gravada no navegador. Ao reabrir o site, o JavaScript lê essas chaves e reaplica as configurações instantaneamente.

Engenharia dos Modais (Estáticos e Dinâmicos)
Desenvolvi duas abordagens diferentes para as janelas flutuantes:

Modais de Dados (Estáticos): As estruturas já existem no HTML com display: none. Criei as funções globais openModal(id) e closeModal(id) para manipular o estado de exibição e travar o scroll do plano de fundo (overflow: hidden).

Modal de Dicas (Dinâmico): Na seção "Como Ajudar", em vez de espelhar o código do modal três vezes no HTML, configurei o JavaScript para criar uma div genérica na memória (document.createElement). Quando qualquer card da grade é clicado, o script intercepta o evento, extrai os textos e a imagem do card clicado, preenche o modal dinâmico e o exibe em tela.

Animação por Visibilidade (Intersection Observer)
Para dar um acabamento profissional à rolagem, implementei a API IntersectionObserver. Configurei os itens da seção de números para iniciarem invisíveis (opacity: 0) e levemente deslocados para baixo. Assim que o usuário rola a tela e esses elementos cruzam a linha de visão (limiar de 10%), o observador detecta o gatilho e dispara a transição do CSS, fazendo com que os dados surjam suavemente.

Com essa arquitetura, consegui entregar um site leve, focado na experiência do usuário, visualmente moderno e que defende de forma clara os pilares da agricultura sustentável.
