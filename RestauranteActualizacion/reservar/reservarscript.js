document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargar header y footer
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

    // BLOQUEAR FECHAS PASADAS
    const fechaBloq = document.querySelector('input[type="date"]');
    if(fechaBloq) fechaBloq.min = new Date().toISOString().split("T")[0];

    // --- Ahora sí buscar el formulario ---
    const form = document.querySelector('.reserva-ui-form');
    if(form) {
      // Rellenar inputs desde URL
      const params = new URLSearchParams(window.location.search);
      const fecha = params.get("fecha");
      const hora = params.get("hora");
      const personas = params.get("personas");

      if(fecha) form.querySelector('input[name="fecha"]').value = fecha;
      if(hora) form.querySelector('input[name="hora"]').value = hora;
      if(personas) form.querySelector('select[name="personas"]').value = personas;

      // Capturar submit para WhatsApp
      form.addEventListener('submit', function(e){
        e.preventDefault();

        const fechaVal = form.fecha.value;
        const horaVal = form.hora.value;
        const personasVal = form.personas.value;
        const correoVal = form.correo.value;

        if(!fechaVal || !horaVal || !personasVal || !correoVal){
          alert("Por favor completa todos los campos antes de enviar.");
          return;
        }

        const mensaje = `Hola, quiero hacer una reservación:\n- Fecha: ${fechaVal}\n- Hora: ${horaVal}\n- Personas: ${personasVal}\n- Correo: ${correoVal}`;
        const telefono = "7223501551"; // tu número
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
      });
    } else {
      console.warn("No se encontró el formulario .reserva-ui-form");
    }

  } catch(err) {
    console.error('Error cargando partes comunes:', err);
  }
});