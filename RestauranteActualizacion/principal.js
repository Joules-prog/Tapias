async function loadCommonParts() {
      try {
        const headerRes = await fetch('header.html');
        const footerRes = await fetch('footer.html');

        if (!headerRes.ok || !footerRes.ok) throw new Error('No se pudo cargar header/footer');

        document.getElementById('headerPrincipal').innerHTML = await headerRes.text();
        document.getElementById('footer').innerHTML = await footerRes.text();

        // Opcional: inicializar menú hamburguesa u otros scripts que necesiten el DOM
         // si tienes esta función
      } catch (err) {
        console.error('Error cargando partes comunes:', err);
        // Opcional: mostrar mensaje de error o fallback
      }
    }
  // Ejecutar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', loadCommonParts);
 //carrusel de imagenes
document.addEventListener("DOMContentLoaded", () => {

  const members = document.querySelectorAll('.member');
  const prev = document.querySelector('.boton_Izq');
  const next = document.querySelector('.boton_Der');

  let index = 0;

  function update() {
    members.forEach(m =>
      m.classList.remove("active", "left", "right")
    );

    const total = members.length;
    const left = (index - 1 + total) % total;
    const right = (index + 1) % total;

    members[index].classList.add("active");
    members[left].classList.add("left");
    members[right].classList.add("right");
  }

  prev.addEventListener("click", () => {
    index = (index - 1 + members.length) % members.length;
    update();
  });

  next.addEventListener("click", () => {
    index = (index + 1) % members.length;
    update();
  });

//Modal de reservar
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const reservaForm = document.getElementById('reservaForm');

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar modal si haces clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});


//BLOQUEAR FECHAS PASADAS
const fecha = document.querySelector('input[type="date"]');
fecha.min = new Date().toISOString().split("T")[0];
//
const form = document.getElementById('reservaForm');
form.addEventListener('submit', function(e){
  e.preventDefault(); // Evita recargar la página

  const fecha = form.fecha.value;
  const hora = form.hora.value;
  const personas = form.personas.value;

  if(!fecha || !hora || !personas){
    alert("Por favor completa todos los campos antes de continuar.");
    return;
  }

  // Redirigir a reservar.html con los datos en la URL
  const url = `/reservar/reservar.html?fecha=${encodeURIComponent(fecha)}&hora=${encodeURIComponent(hora)}&personas=${encodeURIComponent(personas)}`;
  window.location.href = url;
});
  update();


});



