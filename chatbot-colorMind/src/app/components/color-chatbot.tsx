import type React from "react";
import { useState, useRef, useEffect } from "react";
import { usePaletteGenerator } from "../hooks/use-palette-generator";
import type { ColorInfo, Message } from "../types/shared-types";
import { ImageIcon, Loader2, Send, X } from "lucide-react";

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
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { generatePalette, isGenerating, error } = usePaletteGenerator();

  const generateResponse = async (
    theme: string,
    userMessage: string,
    imageBase64?: string
  ): Promise<string> => {
    const result = await generatePalette(theme, userMessage, imageBase64);
    console.log(imageBase64);

    if (result.palette) {
      updatePalette(result.palette);
      updateTheme(theme);
      const generatedBy =
        result.metadata?.generated_by === "Google Gemini AI"
          ? "IA Gemini"
          : "Fallback Local";
      return (
        `🤖 Criei uma paleta personalizada com ${generatedBy} para "${theme}"!\n\n` +
        result.palette
          .map(
            (color: ColorInfo) =>
              `• ${color.name} (${color.hex}) - ${color.role}`
          )
          .join("\n") +
        "\n\n💡 Esta paleta considera teoria das cores, contraste e acessibilidade. Peça ajustes se precisar!"
      );
    } else {
      return `❌ Desculpe, não consegui gerar uma paleta personalizada no momento. Motivo: ${
        result.error || "Erro desconhecido"
      }. Por favor, tente novamente ou descreva seu projeto de outra forma. Enquanto isso, exibo uma paleta padrão.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedImageFile) return;

    const userMessageText = inputValue.trim();
    const messageId = Date.now().toString();

    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        text: selectedImageFile
          ? `[Imagem: ${selectedImageFile.name}] ${userMessageText}`
          : userMessageText,
        sender: "user",
        timestamp: new Date(),
        imageUrl: imagePreviewUrl || undefined,
      },
    ]);

    setInputValue("");
    const currentImageFile = selectedImageFile;
    setSelectedImageFile(null);
    setImagePreviewUrl(null);

    let base64Image: string | undefined;
    let themeForAI = userMessageText || "paleta de cores";
    let promptForAI = userMessageText || "Gerar paleta de cores.";

    if (currentImageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(currentImageFile);
      await new Promise<void>((resolve, reject) => {
        reader.onloadend = () => {
          base64Image = reader.result as string;
          themeForAI = `paleta da imagem ${currentImageFile.name}`;
          promptForAI =
            `Gerar paleta baseada na imagem: ${currentImageFile.name}. ${userMessageText}`.trim();
          resolve();
        };
        reader.onerror = reject;
      });
    }

    try {
      const responseText = await generateResponse(
        themeForAI,
        promptForAI,
        base64Image
      );

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
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isGenerating) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSelectedImageFile(null);
    setImagePreviewUrl(null);
  };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setInputValue("");
    } else {
      setSelectedImageFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handleClearImage = () => {
    setSelectedImageFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">
          🤖 Assistente IA de Cores (Gemini)
        </h3>
        <p className="text-sm text-gray-600">
          {isGenerating
            ? "Gerando paleta com IA..."
            : "Descreva seu projeto ou envie uma imagem para uma paleta personalizada"}
        </p>
      </div>

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
              {message.imageUrl && (
                <img
                  src={message.imageUrl || "/placeholder.svg"}
                  alt="Imagem enviada pelo usuário"
                  className="max-w-full h-auto rounded-lg mb-2"
                  style={{ maxHeight: "150px" }}
                />
              )}
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {message.text}
              </div>
            </div>
          </div>
        ))}

        {isGenerating && (
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
                </span>
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && !isGenerating && !selectedImageFile && (
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

      <div className="border-t border-gray-200 p-4">
        {imagePreviewUrl && (
          <div className="relative mb-4 p-2 border border-gray-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={imagePreviewUrl || "/placeholder.svg"}
                alt="Pré-visualização da imagem"
                className="w-12 h-12 object-cover rounded"
              />
              <span className="text-sm text-gray-700">
                {selectedImageFile?.name}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearImage}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
              disabled={isGenerating}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remover imagem</span>
            </button>
          </div>
        )}

        <div className="flex gap-3">
          {!selectedImageFile ? (
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isGenerating
                  ? "Gerando paleta..."
                  : "Descreva seu projeto para uma paleta personalizada..."
              }
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[48px] max-h-[150px] resize-y"
              disabled={isGenerating}
              rows={1}
            />
          ) : (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Adicione um texto opcional para a imagem..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isGenerating}
            />
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageFileChange}
            className="hidden"
            disabled={isGenerating}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isGenerating}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 shrink-0"
          >
            <ImageIcon className="h-5 w-5" />
            <span className="sr-only">Adicionar Imagem</span>
          </button>
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={
              (!inputValue.trim() && !selectedImageFile) || isGenerating
            }
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shrink-0"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Enviar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
