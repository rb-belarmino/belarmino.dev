# Design System: Belarmino.dev

Este documento contém as especificações do sistema de design utilizado no portfólio, configurado nativamente no Tailwind v4 (`src/app/globals.css`).

## 🎨 Paleta de Cores (Cores Base)
Utilizamos um esquema de cores Dark com foco em contraste Neon (Cyberpunk/Tech).

| Variável Tailwind | Hexadecimal | Descrição |
| :--- | :--- | :--- |
| `--color-background` | `#051424` | Fundo principal da aplicação. |
| `--color-on-background`| `#d4e4fa` | Texto principal no fundo. |
| `--color-surface` | `#051424` | Fundo de componentes (cards, seções). |
| `--color-primary` | `#00f3ff` | Cor de destaque primária (Ciano/Neon). |
| `--color-on-primary` | `#00373a` | Texto que sobrepõe a cor primária. |
| `--color-surface-border` | `#1a1a1b` | Cor usada nas bordas padrão de inputs e cards. |

## ✨ Sombras e Efeitos "Glow"
Para evitar o uso de RGBA espalhado pelo código, criamos variáveis de sombreamento com base no brilho Neon da cor primária.

| Classe Tailwind | CSS Subjacente | Uso Recomendado |
| :--- | :--- | :--- |
| `shadow-glow-sm` | `0 0 10px rgba(0, 243, 255, 0.2)` | Estados de hover suaves, bordas ativas. |
| `shadow-glow-md` | `0 0 15px rgba(0, 243, 255, 0.3)` | Inputs em foco, ícones ativos. |
| `shadow-glow-lg` | `0 0 20px rgba(0, 243, 255, 0.4)` | Botões primários, cards em destaque (hover). |
| `shadow-glow-xl` | `0 0 30px rgba(0, 243, 255, 0.4)` | Efeitos muito fortes (ex: Hero botões). |
| `drop-shadow-glow-text` | `0 0 12px rgba(100, 240, 255, 0.9)` | Textos coloridos com efeito de neon luminoso. |
| `shadow-glow-surface` | `0 -10px 30px rgba(0, 0, 0, 0.5)` | Sombra base para navegação inferior mobile. |

## 📐 Como Usar
Como o projeto utiliza o Tailwind v4, qualquer variável declarada no bloco `@theme` é automaticamente convertida em utilitários CSS. 

Por exemplo:
- Onde antes usávamos: `border-[#1a1a1b]`
- Agora usamos: `border-surface-border`

- Onde antes usávamos: `hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]`
- Agora usamos: `hover:shadow-glow-lg`
