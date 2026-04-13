// Navegação por abas
function openTab(evt, tabName){
  const sections = document.querySelectorAll('.tab-section');
  const buttons = document.querySelectorAll('.tab-button');

  sections.forEach(s => s.classList.remove('active'));
  buttons.forEach(b => b.classList.remove('active'));

  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}

// Expande/retrai cards
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

// Inicializar contadores
window.addEventListener('load', ()=>{
  animateStat('stat1', 1500);
  animateStat('stat2', 45);
  animateStat('stat3', 1200);
});

// Botão contato
function contatoAlert(){
  alert('Obrigado por entrar em contato! Entraremos em breve.');
}
