"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";

import { usePaletteGenerator } from "../hooks/use-palette-generator";
import type { ColorInfo, Message } from "../types/shared-types";

type ColorChatbotProps = {
  updatePalette: (palette: ColorInfo[]) => void;
  updateTheme: (theme: string) => void;
};

export const ColorChatbot = ({
  updatePalette,
  updateTheme,
}: ColorChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! 🎨 Sou seu assistente especialista em cores, agora com IA Gemini! Posso criar paletas personalizadas considerando teoria das cores, acessibilidade e psicologia das cores. Descreva seu projeto e eu criarei uma paleta perfeita!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { generatePalette, isGenerating, error } = usePaletteGenerator(); // Use o novo hook

  const generateResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();

    const isQuestion =
      message.includes("como") ||
      message.includes("por que") ||
      message.includes("qual") ||
      message.includes("onde") ||
      message.includes("quando") ||
      message.includes("?");

    const isAboutCurrentPalette =
      message.includes("esta paleta") ||
      message.includes("essa paleta") ||
      message.includes("estas cores") ||
      message.includes("essas cores");

    if (!isQuestion || !isAboutCurrentPalette) {
      let theme = userMessage.trim();
      theme = theme.replace(
        /^(crie|gere|faça|quero|preciso|uma|um|de|da|do|para|com|sobre|mas|e|o|a)\s+/gi,
        ""
      );
      theme = theme.replace(
        /paleta\s*(de\s*cores?\s*)?(para|com|sobre)?\s*/gi,
        ""
      );
      theme = theme.replace(/\s*(é|são|deveria|não|ter|nela|nele)\s*/gi, "");

      if (!theme || theme.length < 2) {
        theme = userMessage.trim();
      }

      // Use o hook para gerar a paleta
      const result = await generatePalette(theme, userMessage);

      if (result.palette) {
        updatePalette(result.palette);
        updateTheme(theme);
        const generatedBy =
          result.metadata?.generated_by === "Google Gemini AI"
            ? "IA Gemini"
            : "Fallback Local"; // Atualizado
        return (
          `🤖 Criei uma paleta personalizada com ${generatedBy} para "${theme}"!\n\n` +
          result.palette
            .map(
              (color: any) => `• ${color.name} (${color.hex}) - ${color.role}`
            )
            .join("\n") +
          "\n\n💡 Esta paleta considera teoria das cores, contraste e acessibilidade. Peça ajustes se precisar!"
        );
      } else {
        // Se houver erro na geração, use uma mensagem de erro e uma paleta padrão
        // A paleta de fallback já é retornada pelo hook em caso de erro
        return `❌ Desculpe, não consegui gerar uma paleta personalizada no momento. Motivo: ${
          result.error || "Erro desconhecido"
        }. Por favor, tente novamente ou descreva seu projeto de outra forma. Enquanto isso, exibo uma paleta padrão.`;
      }
    }

    if (message.includes("contraste") || message.includes("acessibilidade")) {
      return "Para informações detalhadas sobre contraste e acessibilidade, você pode ver os dados de cada cor no painel à direita. Cada cor mostra sua classificação AA/AAA e ratio de contraste!";
    }

    if (message.includes("psicologia") || message.includes("significado")) {
      return "Cada cor tem um impacto psicológico específico! No painel à direita você pode ver a descrição e o impacto psicológico de cada cor da paleta atual.";
    }

    // Resposta padrão - mas ainda assim gerar uma paleta
    const defaultTheme = "projeto moderno";
    const result = await generatePalette(defaultTheme, userMessage);
    if (result.palette) {
      updatePalette(result.palette);
      updateTheme(defaultTheme);
      return `Criei uma paleta para você! Quanto mais específico você for sobre seu projeto, melhor será a paleta. Tente descrever:

• Tipo de projeto (app, site, logo, etc.)
• Público-alvo (jovens, profissionais, crianças)
• Sentimento desejado (calmo, energético, elegante)
• Referências (natureza, tecnologia, vintage)

🎨 Veja a paleta no painel à direita!`;
    } else {
      return `❌ Desculpe, não consegui gerar uma paleta personalizada no momento. Motivo: ${
        result.error || "Erro desconhecido"
      }. Por favor, tente novamente ou descreva seu projeto de outra forma. Enquanto isso, exibo uma paleta padrão.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    // isTyping agora é controlado apenas por isGenerating do hook
    // setIsTyping(true) // Removido

    try {
      const responseText = await generateResponse(currentInput);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      // setIsTyping(false) // Removido
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const suggestions = [
    "Crie uma paleta para um app de fitness",
    "Gere cores para uma cafeteria moderna",
    "Preciso de uma paleta para um site de arquitetura",
    "Quero cores para um blog de viagens",
    "Faça uma paleta para uma startup de tecnologia",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">
          🤖 Assistente IA de Cores (Gemini)
        </h3>{" "}
        {/* Atualizado */}
        <p className="text-sm text-gray-600">
          {isGenerating
            ? "Gerando paleta com IA..."
            : "Descreva seu projeto para uma paleta personalizada"}
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900 border border-gray-200"
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {message.text}
              </div>
            </div>
          </div>
        ))}

        {/* Typing/Generating Indicator */}
        {isGenerating && ( // Use isGenerating do hook
          <div className="flex justify-start">
            <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  Criando com Gemini...
                </span>{" "}
                {/* Atualizado */}
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        {messages.length === 1 &&
          !isGenerating && ( // Use isGenerating do hook
            <div className="space-y-3">
              <p className="text-sm text-gray-500 text-center">
                Exemplos de solicitações:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-2 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isGenerating
                ? "Gerando paleta..."
                : "Descreva seu projeto para uma paleta personalizada..."
            }
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isGenerating} // Use isGenerating do hook
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isGenerating} // Use isGenerating do hook
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isGenerating ? ( // Use isGenerating do hook
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
