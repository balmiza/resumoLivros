# Especificações do Projeto — Resumo de Livros

## Visão Geral

Site estático pessoal para publicar resumos dos livros lidos. O objetivo é ter um espaço organizado para registrar aprendizados e compartilhar leituras.

---

## Stack Técnica

| Componente    | Tecnologia            |
|---------------|-----------------------|
| Frontend      | HTML + CSS + JS puro  |
| Conteúdo      | Arquivos Markdown     |
| Hospedagem    | GitHub Pages          |
| Versionamento | Git + GitHub          |

---

## Estrutura de Pastas

```
resumoLivros/
├── index.html              # Página inicial — lista de livros
├── livro.html              # Template de página individual do livro
├── css/
│   └── style.css           # Estilos globais
├── js/
│   ├── main.js             # Lógica da lista de livros
│   └── livro.js            # Lógica da página individual
├── livros/
│   └── [slug-do-livro]/
│       ├── resumo.md       # Resumo em Markdown
│       └── capa.jpg        # Imagem da capa do livro
├── data/
│   └── livros.json         # Índice com metadados de todos os livros
└── docs/
    └── especificacoes.md   # Este arquivo
```

---

## Estrutura dos Dados (`data/livros.json`)

Cada livro é representado por um objeto com os seguintes campos:

```json
{
  "slug": "o-hobbit",
  "titulo": "O Hobbit",
  "autor": "J.R.R. Tolkien",
  "ano_leitura": 2025,
  "categoria": "Ficção",
  "capa": "livros/o-hobbit/capa.jpg",
  "resumo": "livros/o-hobbit/resumo.md"
}
```

### Campos obrigatórios

| Campo         | Tipo   | Descrição                                      |
|---------------|--------|------------------------------------------------|
| `slug`        | string | Identificador único, usado na URL              |
| `titulo`      | string | Título do livro                                |
| `autor`       | string | Nome do autor                                  |
| `ano_leitura` | number | Ano em que o livro foi lido                    |
| `categoria`   | string | Categoria/gênero do livro                      |
| `capa`        | string | Caminho relativo para a imagem da capa         |
| `resumo`      | string | Caminho relativo para o arquivo Markdown       |

---

## Funcionalidades

### Página Inicial (`index.html`)
- Grid responsivo com os livros lidos
- Cada card exibe: capa, título, autor e categoria
- Cards clicáveis que navegam para a página individual do livro
- Ordenação padrão: mais recente primeiro (por `ano_leitura`)

### Página Individual (`livro.html?slug=<slug>`)
- Lê o `slug` da query string da URL
- Busca os metadados em `livros.json`
- Faz fetch e renderiza o Markdown do resumo como HTML
- Exibe: capa, título, autor, categoria e o texto do resumo

---

## Fluxo para Adicionar um Novo Livro

1. Criar a pasta `livros/<slug-do-livro>/`
2. Adicionar `capa.jpg` (imagem da capa)
3. Criar `resumo.md` com o conteúdo do resumo
4. Adicionar o objeto do livro em `data/livros.json`
5. Fazer commit e push — o GitHub Pages atualiza automaticamente

---

## Hospedagem (GitHub Pages)

- Repositório: `github.com/<usuario>/resumoLivros`
- Branch de publicação: `main` (raiz `/`)
- URL pública: `https://<usuario>.github.io/resumoLivros/`
- Ativar em: Settings > Pages > Source: `main` / `/ (root)`

---

## Renderização de Markdown

O conteúdo dos resumos é escrito em Markdown e renderizado no browser via a biblioteca [**marked.js**](https://marked.js.org/) (CDN, sem build step necessário).

---

## Design

- Layout: responsivo (mobile-first)
- Fonte: sistema (`system-ui`)
- Tema: claro, limpo e minimalista
- Grid de livros: 2 colunas em mobile, 3-4 em desktop
