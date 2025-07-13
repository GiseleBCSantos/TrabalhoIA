# 🎨 ColorMind – Gerador de Paleta de Cores com IA

ColorMind é um site que utiliza inteligência artificial para gerar paletas de cores harmoniosas com base em temas fornecidos pelo usuário. Ideal para designers, desenvolvedores e entusiastas que buscam inspiração visual.

---

## ✨ Funcionalidades

- ✅ Entrada de tema personalizado (ex: "praia", "futurismo", "anos 80")
- ✅ Geração automática de paleta de 5 cores usando IA
- ✅ Exibição visual das cores com códigos HEX
- ✅ Geração de código CSS com variáveis (`--primary`, `--secondary`, etc.)
- ✅ Geração de configuração `tailwind.config.js` com as cores
- ✅ Exibição de um modelo de site estilizado com a paleta

---

## 🚀 Demonstração

> Em breve! _(link para a versão publicada com Vercel, Netlify, etc.)_

---

## 🖼️ Exemplo de Uso

1. Digite um tema no campo de entrada
2. Clique em "Gerar Paleta"
3. Veja:
   - 🎨 As cores com seus códigos
   - 💻 Código CSS e Tailwind
   - 🌐 Um modelo de site colorido com o tema

---

## ⚙️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/)
- Vite (para build e dev server)

---

## 🧠 Como Funciona

1. O usuário digita um tema (ex: "neve", "jardim zen")
2. A aplicação envia esse tema para a API do ChatGPT
3. A IA responde com uma paleta JSON com 5 cores
4. O sistema:
   - Exibe a paleta
   - Gera os blocos de código CSS/Tailwind
   - Renderiza um modelo de site com as cores

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/colormind.git

# Acesse a pasta do projeto
cd colormind

# Instale as dependências
npm install

# Crie um arquivo .env com sua chave da OpenAI
touch .env
```
