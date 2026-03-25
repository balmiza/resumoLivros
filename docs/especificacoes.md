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
├── index.html              # Única página — layout com sidebar + painel de resumo
├── css/
│   └── style.css           # Estilos globais (dark mode)
├── js/
│   └── main.js             # Lógica: carregar lista, pesquisa, renderizar resumo
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

## Layout

```
┌─────────────────┬──────────────────────────────────────────┐
│   SIDEBAR       │   PAINEL DE RESUMO                       │
│                 │                                          │
│  [Pesquisa 🔍]  │   [Capa grande]                          │
│  ─────────────  │   Título do Livro                        │
│  [img] Livro 1  │   Autor · Categoria · Ano                │
│  [img] Livro 2  │   ──────────────────────────             │
│  [img] Livro 3  │   Conteúdo do resumo em Markdown...      │
│  [img] Livro 4  │                                          │
│                 │                                          │
└─────────────────┴──────────────────────────────────────────┘
```

- **Single page**: tudo acontece em `index.html` sem navegação entre páginas
- **Sidebar fixa** à esquerda, painel de resumo ocupa o restante da tela
- Em mobile: sidebar vira menu colapsável (hamburguer)

---

## Funcionalidades

### Sidebar
- Lista de livros com miniatura da capa e título
- Barra de pesquisa filtra a lista em tempo real por título ou autor
- Ordenação padrão: mais recente primeiro (por `ano_leitura`)
- Item selecionado fica destacado visualmente

### Painel de Resumo
- Ao clicar num livro da sidebar, carrega o resumo no painel direito
- Exibe: capa, título, autor, categoria, ano de leitura e texto do resumo
- Resumo renderizado a partir do Markdown via marked.js
- Estado inicial: tela de boas-vindas (nenhum livro selecionado)

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

- Tema: **dark mode** (fundo escuro, texto claro)
- Layout: responsivo — sidebar fixa no desktop, colapsável no mobile
- Fonte: sistema (`system-ui`)
- Paleta base: `#0f0f0f` fundo, `#1a1a1a` sidebar, `#e0e0e0` texto, acento em tom de laranja/âmbar para item selecionado
