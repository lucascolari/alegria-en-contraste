// Catálogo (datos de demostración)
const CATALOGO = [
  { id: 'flor', nombre: 'Flor rara', precio: 32000, cat: 'color', img: 'images/flor.jpg', desc: 'Pétalos impresos en 3D con base de plata.' },
  { id: 'geometria', nombre: 'Geometría', precio: 30000, cat: 'geometricos', img: 'images/geom.jpg', desc: 'Volúmenes limpios en amarillo sol.' },
  { id: 'gotas', nombre: 'Gotas', precio: 28000, cat: 'color', img: 'images/gotas.jpg', desc: 'Formas fluidas en azul profundo.' },
  { id: 'tripode', nombre: 'Trípode', precio: 26000, cat: 'geometricos', img: 'images/forma1.jpg', desc: 'Triángulos verdes de aristas marcadas.' },
  { id: 'dunas', nombre: 'Dunas', precio: 31000, cat: 'organicos', img: 'images/forma2.jpg', desc: 'Pliegues suaves color hueso.' },
  { id: 'argolla', nombre: 'Argolla viva', precio: 27000, cat: 'color', img: 'images/forma3.jpg', desc: 'Argollas gruesas en magenta.' },
  { id: 'onix', nombre: 'Onix', precio: 34000, cat: 'piedras', img: 'images/forma4.jpg', desc: 'Piedra negra con terminación en perla.' },
  { id: 'marea', nombre: 'Marea violeta', precio: 36000, cat: 'organicos', img: 'images/violeta.jpg', desc: 'Onda violeta con perla natural.' },
];

const CATEGORIAS = {
  geometricos: 'Geométricos',
  organicos: 'Orgánicos',
  color: 'Color',
  piedras: 'Piedras',
};

const peso = (n) => '$ ' + n.toLocaleString('es-AR');

// ---------- Carrito (demostración, guardado en el navegador) ----------
function leerCarrito() {
  try { return JSON.parse(localStorage.getItem('alegria-cart') || '[]'); }
  catch { return []; }
}
function guardarCarrito(c) {
  try { localStorage.setItem('alegria-cart', JSON.stringify(c)); } catch {}
  pintarBadge();
}
function agregarAlCarrito(id) {
  const prod = CATALOGO.find((p) => p.id === id);
  if (!prod) return;
  const c = leerCarrito();
  const item = c.find((i) => i.id === id);
  if (item) item.cant += 1;
  else c.push({ id, cant: 1 });
  guardarCarrito(c);
  toast(prod.nombre + ' agregado al carrito');
  pintarDrawer();
  abrirDrawer();
}
function quitarDelCarrito(id) {
  guardarCarrito(leerCarrito().filter((i) => i.id !== id));
  pintarDrawer();
}
function totalItems() {
  return leerCarrito().reduce((s, i) => s + i.cant, 0);
}
function totalPrecio() {
  return leerCarrito().reduce((s, i) => {
    const p = CATALOGO.find((x) => x.id === i.id);
    return s + (p ? p.precio * i.cant : 0);
  }, 0);
}
function pintarBadge() {
  document.querySelectorAll('.cart-count').forEach((el) => { el.textContent = totalItems(); });
}

// ---------- Header / Footer compartidos ----------
function headerHTML(activo) {
  const links = [
    ['index.html', 'Inicio'],
    ['aros.html', 'Aros'],
    ['colecciones.html', 'Colecciones'],
    ['sobre.html', 'Sobre Alegría'],
    ['contacto.html', 'Contacto'],
  ];
  const nav = links
    .map(([h, t]) => `<a href="${h}"${h === activo ? ' class="activo"' : ''}>${t}</a>`)
    .join('');
  return `
  <div class="shell header-inner">
    <a class="brand" href="index.html">
      <span class="brand-name">ALEGRÍA</span>
      <span class="brand-sub">EN CONTRASTE</span>
    </a>
    <nav class="main-nav">${nav}</nav>
    <div class="header-actions">
      <button class="icon-btn" aria-label="Buscar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
      </button>
      <button class="icon-btn cart-btn" aria-label="Carrito" onclick="abrirDrawer()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
        <span class="cart-count">0</span>
      </button>
      <button class="icon-btn menu-toggle" aria-label="Menú" onclick="document.body.classList.toggle('nav-open')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
      </button>
    </div>
  </div>`;
}

function footerHTML() {
  return `
  <div class="shell footer-inner">
    <div class="footer-brand">
      <span class="brand-name">ALEGRÍA</span>
      <span class="brand-sub">EN CONTRASTE</span>
      <p class="muted">Aros de autor hechos con impresión 3D, plata y materiales naturales. Diseñados y producidos en Buenos Aires.</p>
    </div>
    <div class="footer-col">
      <h5>Tienda</h5>
      <a href="aros.html">Todos los aros</a>
      <a href="colecciones.html">Colecciones</a>
      <a href="sobre.html">Sobre Alegría</a>
      <a href="contacto.html">Contacto</a>
    </div>
    <div class="footer-col">
      <h5>Ayuda</h5>
      <a href="contacto.html">Envíos a todo el país</a>
      <a href="contacto.html">Cambios y devoluciones</a>
      <a href="contacto.html">Medios de pago</a>
      <a href="contacto.html">Preguntas frecuentes</a>
    </div>
    <div class="footer-col">
      <h5>Seguinos</h5>
      <a href="#">Instagram</a>
      <a href="#">TikTok</a>
      <a href="#">WhatsApp</a>
      <p class="muted">hola@alegriaencontraste.com</p>
    </div>
  </div>
  <div class="shell footer-bottom">
    <span>© 2026 Alegría en Contraste. Todos los derechos reservados.</span>
    <span>Transferencia · Tarjeta · MODO · Envíos a todo el país</span>
  </div>`;
}

function drawerHTML() {
  return `
  <div class="drawer-overlay" onclick="cerrarDrawer()"></div>
  <aside class="drawer" aria-label="Carrito">
    <div class="drawer-head">
      <h4>Tu carrito</h4>
      <button class="icon-btn" aria-label="Cerrar" onclick="cerrarDrawer()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
      </button>
    </div>
    <div class="drawer-body" id="drawer-body"></div>
    <div class="drawer-foot" id="drawer-foot"></div>
  </aside>`;
}

function pintarDrawer() {
  const body = document.getElementById('drawer-body');
  const foot = document.getElementById('drawer-foot');
  if (!body || !foot) return;
  const c = leerCarrito();
  if (!c.length) {
    body.innerHTML = '<p class="drawer-empty muted">Todavía no agregaste ningún aro.</p>';
    foot.innerHTML = '<a class="btn btn-dark" href="aros.html" onclick="cerrarDrawer()">Ver los aros</a>';
    return;
  }
  body.innerHTML = c.map((i) => {
    const p = CATALOGO.find((x) => x.id === i.id);
    return `<div class="drawer-item">
      <img src="${p.img}" alt="${p.nombre}">
      <div class="drawer-item-info">
        <strong>${p.nombre}</strong>
        <span class="muted">${i.cant} × ${peso(p.precio)}</span>
      </div>
      <button class="drawer-remove" aria-label="Quitar" onclick="quitarDelCarrito('${i.id}')">&times;</button>
    </div>`;
  }).join('');
  foot.innerHTML = `
    <div class="drawer-total"><span>Total</span><strong>${peso(totalPrecio())}</strong></div>
    <button class="btn btn-dark" style="width:100%;justify-content:center" onclick="checkoutDemo()">Finalizar compra</button>`;
}

function abrirDrawer() { document.body.classList.add('drawer-open'); pintarDrawer(); }
function cerrarDrawer() { document.body.classList.remove('drawer-open'); }
function checkoutDemo() {
  toast('Esta es una muestra: el pago estará disponible en la versión final.');
}

// ---------- Toast ----------
let toastT;
function toast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 2600);
}

// ---------- Inicio ----------
document.addEventListener('DOMContentLoaded', () => {
  const activo = document.body.dataset.page || '';
  const h = document.getElementById('site-header');
  const f = document.getElementById('site-footer');
  if (h) h.innerHTML = headerHTML(activo);
  if (f) f.innerHTML = footerHTML();
  document.body.insertAdjacentHTML('beforeend', drawerHTML());
  pintarBadge();

  document.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => agregarAlCarrito(btn.dataset.add));
  });

  const form = document.getElementById('form-contacto');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.reset();
      toast('¡Gracias! Te vamos a responder a la brevedad.');
    });
  }

  const news = document.getElementById('form-news');
  if (news) {
    news.addEventListener('submit', (e) => {
      e.preventDefault();
      news.reset();
      toast('¡Listo! Te suscribiste al newsletter.');
    });
  }
});
