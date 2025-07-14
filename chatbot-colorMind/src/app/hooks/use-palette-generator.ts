import { useState, useCallback } from "react";
import type { GeneratePaletteResult } from "../types/shared-types";

const defaultPalette = {
  colors: [
    {
      name: "Azul Digital",
      role: "dominante",
      hex: "#0F172A",
      hsl: "hsl(222, 47%, 11%)",
      rgb: "rgb(15, 23, 42)",
      description: "Cor principal inspirada em interfaces modernas",
      usage: "Headers, navegação, elementos principais",
      contrast_ratio: "21:1 com texto branco",
      accessibility: "AAA",
      psychology: "Confiança tecnológica",
    },
    {
      name: "Cinza Claro",
      role: "secundária",
      hex: "#F1F5F9",
      hsl: "hsl(210, 40%, 96%)",
      rgb: "rgb(241, 245, 249)",
      description: "Cor suave para áreas de conteúdo",
      usage: "Fundos de seções, cards, áreas de conteúdo",
      contrast_ratio: "19:1 com texto preto",
      accessibility: "AAA",
      psychology: "Clareza e simplicidade",
    },
    {
      name: "Verde Moderno",
      role: "destaque",
      hex: "#10B981",
      hsl: "hsl(160, 84%, 39%)",
      rgb: "rgb(16, 185, 129)",
      description: "Verde fresco para elementos interativos",
      usage: "Botões, links, elementos de ação",
      contrast_ratio: "4.5:1 com texto branco",
      accessibility: "AA",
      psychology: "Inovação e crescimento",
    },
    {
      name: "Cinza Escuro",
      role: "secundária",
      hex: "#334155",
      hsl: "hsl(217, 23%, 27%)",
      rgb: "rgb(51, 65, 85)",
      description: "Cor para textos e elementos importantes",
      usage: "Textos principais, títulos, rodapés",
      contrast_ratio: "12:1 com fundo branco",
      accessibility: "AAA",
      psychology: "Profissionalismo",
    },
    {
      name: "Cinza Médio",
      role: "secundária",
      hex: "#64748B",
      hsl: "hsl(217, 19%, 47%)",
      rgb: "rgb(100, 116, 139)",
      description: "Cor neutra para elementos secundários",
      usage: "Textos secundários, bordas, elementos sutis",
      contrast_ratio: "4.5:1 com fundo branco",
      accessibility: "AA",
      psychology: "Suporte visual",
    },
  ],
};

export function usePaletteGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const generatePalette = useCallback(
    async (
      theme: string,
      userMessage: string,
      imageBase64?: string
    ): Promise<GeneratePaletteResult> => {
      setIsGenerating(true);
      setError(null);

      const prompt = `Você é um especialista em teoria das cores, design e acessibilidade. Sua tarefa é criar uma paleta de cores harmoniosa e funcional baseada no tema fornecido.

CONTEXTO DO USUÁRIO:
Tema/Projeto: ${theme}
Mensagem do usuário: ${userMessage}
${
  imageBase64
    ? "CONTEXTO VISUAL: Analise a imagem fornecida para extrair as cores e o humor geral."
    : ""
}

DIRETRIZES PARA CRIAÇÃO DA PALETA:

Você é um especialista em teoria das cores, design visual e acessibilidade digital. Sua tarefa é criar uma paleta de **5 cores harmoniosas e funcionais**, com base no **tema fornecido pelo usuário**.

---

📌 **CONTEXTO DO PROJETO**

- **Tema/Projeto**: ${theme}  
- **Mensagem do usuário**: ${userMessage}

---

🎨 TEORIA DAS CORES
- Utilize harmonias cromáticas (análogas, complementares, tríades, tetrádicas)
- Considere a temperatura das cores (quentes vs frias)
- Aplique a regra 60-30-10:
  - 60%: Cor dominante (backgrounds, cabeçalhos)
  - 30%: Cores secundárias (áreas de conteúdo, seções, cards)
  - 10%: Cor de destaque (botões, links, CTAs)
- Equilibre saturação e luminosidade para legibilidade e conforto visual

🧠 PSICOLOGIA DAS CORES
- Azul: confiança, tecnologia, segurança
- Verde: saúde, natureza, sustentabilidade
- Vermelho: atenção, energia, urgência
- Roxo: criatividade, luxo, introspecção
- Laranja: dinamismo, acolhimento, entusiasmo
- Amarelo: otimismo, alerta, juventude (usar com moderação)
- Cinza: neutralidade, sofisticação, estabilidade
- Preto: elegância, força, formalidade
- Branco: leveza, simplicidade, clareza

♿ ACESSIBILIDADE E LEGIBILIDADE
- Contraste mínimo de 4.5:1 (nível AA)
- Ideal: contraste de 7:1 (nível AAA)
- Evite usar apenas vermelho/verde para diferenciação
- Evite cores muito semelhantes entre:
  - Fundo geral e componentes como cards/caixas
  - Navbar/Footer e o background principal
- Evite navbar/footer em cores muito claras se o fundo for escuro
- Sempre garanta legibilidade de textos sobre qualquer fundo
- Teste legibilidade com texto branco e preto para cada cor
- Considere daltonismo (evite apenas vermelho/verde para diferenciação).
- Teste legibilidade em diferentes contextos.


🛠️ APLICAÇÃO PRÁTICA
- Crie EXATAMENTE 5 cores, cada uma com um papel funcional claro e distinto para a interface:
     - **1. Cor Principal (Dominante)**: Para backgrounds de headers, footers, barras de navegação e elementos de grande destaque. Deve ter alto contraste com a Cor de Texto Principal.
     - **2. Cor de Fundo Principal**: Para o background geral do corpo do site/aplicação, cards e seções de conteúdo. Deve ter alto contraste com a Cor de Texto Principal.
     - **3. Cor de Texto Principal**: Para títulos, corpo de texto, labels de formulário e links principais. Deve ter **alto contraste** com a Cor Principal e a Cor de Fundo Principal.
     - **4. Cor de Destaque/Ação**: Para botões, links, CTAs (Call-to-Actions) e elementos interativos que precisam chamar a atenção. Deve se destacar e ter bom contraste com as cores de fundo onde será aplicada.
     - **5. Cor Secundária/Apoio**: Para elementos sutis, bordas, ícones, textos secundários (como placeholders de input ou copyright no rodapé) ou como um tom complementar que adicione profundidade.

   - Garanta que TODAS as 5 cores sejam visivelmente distintas umas das outras e que cada uma tenha um propósito funcional claro na interface.
   - Assegure que a combinação de cores de fundo e texto sempre resulte em alta legibilidade.
   - Balanceie cores vibrantes com neutras
  - A paleta deve ser visualmente coesa e funcional quando visualizada em conjunto


IMPORTANTE: Responda APENAS com um JSON válido no seguinte formato:
{
"colors": [
  {
    "name": "Nome descritivo da cor",
    "role": "dominante" | "secundária" | "destaque",
    "hex": "#RRGGBB",
    "hsl": "hsl(H, S%, L%)",
    "rgb": "rgb(R, G, B)",
    "description": "Descrição poética/inspiradora da cor",
    "usage": "Onde e como usar esta cor especificamente",
    "contrast_ratio": "X:1 com texto branco/preto",
    "accessibility": "AA" | "AAA",
    "psychology": "Impacto psicológico desta cor"
  }
],
"harmony_type": "Tipo de harmonia cromática usada",
"theme_analysis": "Análise do tema e decisões de design",
"usage_tips": "Dicas específicas de aplicação desta paleta"
}

REGRAS IMPORTANTES:
- Crie EXATAMENTE 5 cores.
- Os papéis devem ser:
  - 1 Cor Principal (Dominante)
  - 1 Cor de Fundo Principal
  - 1 Cor de Texto Principal
  - 1 Cor de Destaque/Ação
  - 1 Cor Secundária/Apoio
- **Todas as 5 cores geradas DEVEM ser utilizadas de forma visível e funcional no preview do site.**
- **A Cor de Texto Principal deve ter contraste excelente (AAA) com a Cor Principal e a Cor de Fundo Principal.**
- **Evite usar a mesma cor para background e texto em elementos adjacentes (ex: logo e header, título e card).**
- **A Cor de Destaque/Ação deve ser claramente visível e contrastar com o fundo onde é aplicada.**
- Valores HEX sempre em maiúsculo.
- Nomes criativos mas descritivos.
- Considere o contexto cultural do tema.
- Balance cores neutras com cores vibrantes.
- Garanta que a paleta funcione em conjunto e que todas as cores sejam visivelmente distintas e utilizáveis.
- RESPONDA APENAS COM JSON, SEM TEXTO ADICIONAL.

Tema: ${theme}`;

      try {
        if (!import.meta.env.VITE_GOOGLE_API_KEY) {
          console.error(
            "ERRO: GOOGLE_API_KEY não encontrada. Usando paleta default."
          );
          const fallback = defaultPalette;
          return {
            palette: fallback.colors,
            metadata: {
              harmony_type: "Harmonia personalizada",
              theme_analysis: `Paleta de fallback para o tema: ${theme}. Motivo: API Key ausente`,
              usage_tips:
                "Esta paleta balanceia cores vibrantes com tons neutros para máxima versatilidade",
              generated_by: "Fallback Local",
              theme: theme,
            },
            error: "API Key ausente",
            isGenerating: false,
          };
        }

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: prompt }],
                },
              ],
            }),
          }
        );

        const json = await response.json();

        if (!response.ok || !json?.candidates?.[0]?.content?.parts?.[0]?.text) {
          throw new Error("Falha na resposta da API Gemini");
        }

        const aiResponse = json.candidates[0].content.parts[0].text;

        let paletteData;
        try {
          let cleanResponse = aiResponse.trim();
          if (cleanResponse.startsWith("```json")) {
            cleanResponse = cleanResponse
              .substring(7, cleanResponse.lastIndexOf("```"))
              .trim();
          } else if (cleanResponse.startsWith("```")) {
            cleanResponse = cleanResponse
              .substring(3, cleanResponse.lastIndexOf("```"))
              .trim();
          }

          const firstBrace = cleanResponse.indexOf("{");
          const lastBrace = cleanResponse.lastIndexOf("}");
          if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            cleanResponse = cleanResponse.substring(firstBrace, lastBrace + 1);
          }

          paletteData = JSON.parse(cleanResponse);
        } catch (parseError) {
          console.error(
            "ERRO: Falha ao fazer parse do JSON da IA:",
            parseError
          );
          console.error("Resposta bruta da IA que causou o erro:", aiResponse);
          const fallback = defaultPalette;
          return {
            palette: fallback.colors,
            metadata: {
              harmony_type: "Harmonia personalizada",
              theme_analysis: `Paleta de fallback para o tema: ${theme}. Motivo: Erro de parse JSON da IA`,
              usage_tips:
                "Esta paleta balanceia cores vibrantes com tons neutros para máxima versatilidade",
              generated_by: "Fallback Local",
              theme: theme,
            },
            error: "Erro de parse JSON da IA",
            isGenerating: false,
          };
        }

        if (
          !paletteData.colors ||
          !Array.isArray(paletteData.colors) ||
          paletteData.colors.length !== 5
        ) {
          console.error(
            "ERRO: Estrutura da paleta da IA inválida (cores ausentes ou quantidade incorreta):",
            paletteData
          );
          const fallback = defaultPalette;
          return {
            palette: fallback.colors,
            metadata: {
              harmony_type: "Harmonia personalizada",
              theme_analysis: `Paleta de fallback para o tema: ${theme}. Motivo: Estrutura de paleta IA inválida`,
              usage_tips:
                "Esta paleta balanceia cores vibrantes com tons neutros para máxima versatilidade",
              generated_by: "Fallback Local",
              theme: theme,
            },
            error: "Estrutura de paleta IA inválida",
            isGenerating: false,
          };
        }

        for (const color of paletteData.colors) {
          if (!color.name || !color.hex || !color.role) {
            console.error(
              "ERRO: Cor inválida encontrada na paleta da IA (campos essenciais ausentes):",
              color
            );
            const fallback = defaultPalette;
            return {
              palette: fallback.colors,
              metadata: {
                harmony_type: "Harmonia personalizada",
                theme_analysis: `Paleta de fallback para o tema: ${theme}. Motivo: Cor inválida na paleta IA`,
                usage_tips:
                  "Esta paleta balanceia cores vibrantes com tons neutros para máxima versatilidade",
                generated_by: "Fallback Local",
                theme: theme,
              },
              error: "Cor inválida na paleta IA",
              isGenerating: false,
            };
          }
        }

        return {
          success: true,
          palette: paletteData.colors,
          metadata: {
            harmony_type: paletteData.harmony_type || "Harmonia personalizada",
            theme_analysis:
              paletteData.theme_analysis || `Paleta criada para: ${theme}`,
            usage_tips:
              paletteData.usage_tips || "Paleta balanceada para uso versátil",
            generated_by: "Google Gemini AI",
            theme: theme,
            model: "gemini-1.5-flash",
          },
          error: null,
          isGenerating: false,
        } as GeneratePaletteResult;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro de rede ou inesperado.";
        console.error(
          "ERRO CRÍTICO: Erro inesperado na geração de paleta:",
          err
        );
        const fallback = defaultPalette;
        return {
          palette: fallback.colors,
          metadata: {
            harmony_type: "Harmonia personalizada",
            theme_analysis: `Paleta de fallback para o tema: ${theme}. Motivo: Erro interno do cliente`,
            usage_tips:
              "Esta paleta balanceia cores vibrantes com tons neutros para máxima versatilidade",
            generated_by: "Fallback Local",
            theme: theme,
          },
          error: errorMessage,
          isGenerating: false,
        };
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return { generatePalette, isGenerating, error };
}
