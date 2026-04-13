// Cards expansíveis
function toggleCard(card){
  card.classList.toggle('expanded');
}

// Contadores animados
function animateStat(id, target){
  let count = 0;
  const increment = Math.ceil(target/100);
  const element = document.getElementById(id);
  const interval = setInterval(()=>{
    count += increment;
    if(count >= target){
      count = target;
      clearInterval(interval);
    }
    element.textContent = count;
  },20);
}

// Inicializar contadores ao carregar a página
window.addEventListener('load', ()=>{
  animateStat('stat1', 1500);
  animateStat('stat2', 45);
  animateStat('stat3', 1200);
});

// Botão de contato
function contatoAlert(){
  alert('Obrigado por entrar em contato! Entraremos em breve.');
}

// Scroll suave para navbar
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({behavior:'smooth'});
  });
});
