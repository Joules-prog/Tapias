document.addEventListener("DOMContentLoaded", async () => {
  try {
    const headerRes = await fetch('/header.html');
    const footerRes = await fetch('/footer.html');

    if (!headerRes.ok || !footerRes.ok) {
      throw new Error('No se pudo cargar header/footer');
    }

    document.getElementById('headerPrincipal').innerHTML = await headerRes.text();
    document.getElementById('footer').innerHTML = await footerRes.text();

    // Reinicializar menú
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    toggle?.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('active');
    });

  } catch (err) {
    console.error('Error cargando partes comunes:', err);
  }
});