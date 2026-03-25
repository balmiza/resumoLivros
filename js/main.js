const bookList   = document.getElementById('book-list');
const searchInput = document.getElementById('search');
const noResults   = document.getElementById('no-results');
const welcome     = document.getElementById('welcome');
const bookDetail  = document.getElementById('book-detail');
const hamburger   = document.getElementById('hamburger');
const sidebar     = document.getElementById('sidebar');
const overlay     = document.getElementById('overlay');

let allBooks = [];
let activeSlug = null;

// ── Carrega e renderiza a lista ───────────────────────────
async function init() {
  const res = await fetch('data/livros.json');
  allBooks = await res.json();
  allBooks.sort((a, b) => b.ano_leitura - a.ano_leitura);
  renderList(allBooks);
}

function renderList(books) {
  bookList.innerHTML = '';
  noResults.classList.toggle('hidden', books.length > 0);

  books.forEach(book => {
    const li = document.createElement('li');
    li.className = 'book-item' + (book.slug === activeSlug ? ' active' : '');
    li.dataset.slug = book.slug;

    const thumb = book.capa
      ? `<img class="book-thumb" src="${book.capa}" alt="${book.titulo}" loading="lazy" onerror="this.replaceWith(placeholder())">`
      : placeholder().outerHTML;

    li.innerHTML = `
      ${thumb}
      <div class="item-info">
        <div class="item-title">${book.titulo}</div>
        <div class="item-author">${book.autor}</div>
      </div>
    `;

    li.addEventListener('click', () => openBook(book));
    bookList.appendChild(li);
  });
}

function placeholder() {
  const div = document.createElement('div');
  div.className = 'book-thumb-placeholder';
  div.textContent = '📖';
  return div;
}

// ── Abre o livro no painel ────────────────────────────────
async function openBook(book) {
  activeSlug = book.slug;
  renderList(allBooks.filter(b => matchSearch(b, searchInput.value)));

  document.getElementById('detail-cover').src    = book.capa || '';
  document.getElementById('detail-cover').alt    = book.titulo;
  document.getElementById('detail-title').textContent     = book.titulo;
  document.getElementById('detail-author').textContent    = book.autor;
  document.getElementById('detail-categoria').textContent = book.categoria;
  document.getElementById('detail-ano').textContent       = book.ano_leitura;

  document.getElementById('detail-content').innerHTML = '<p style="color:var(--text-muted)">Carregando resumo...</p>';

  welcome.classList.add('hidden');
  bookDetail.classList.remove('hidden');

  try {
    const res = await fetch(book.resumo);
    if (!res.ok) throw new Error('Arquivo não encontrado');
    const md = await res.text();
    document.getElementById('detail-content').innerHTML = marked.parse(md);
  } catch {
    document.getElementById('detail-content').innerHTML = '<p style="color:var(--text-muted)">Resumo não disponível.</p>';
  }

  // fecha sidebar no mobile
  closeSidebar();

  // scrola o painel para o topo
  document.getElementById('main-panel').scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Pesquisa ─────────────────────────────────────────────
function matchSearch(book, query) {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  return book.titulo.toLowerCase().includes(q) || book.autor.toLowerCase().includes(q);
}

searchInput.addEventListener('input', () => {
  const filtered = allBooks.filter(b => matchSearch(b, searchInput.value));
  renderList(filtered);
});

// ── Mobile hamburger ──────────────────────────────────────
hamburger.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('open');
});

overlay.addEventListener('click', closeSidebar);

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
}

// ── Start ─────────────────────────────────────────────────
init();
