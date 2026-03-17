// En main.js
document.addEventListener('DOMContentLoaded', () => {

 

//enderizado menu hambgeusa
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');


  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('active');
  });
  
});