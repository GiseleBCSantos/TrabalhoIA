"use client";

import { useState } from "react";
import { ColorChatbot } from "../components/color-chatbot";
import { PaletteDisplay } from "../components/shared-types-display";
import type { ColorInfo } from "../types/shared-types";

export const Home = () => {
  const [palette, setPalette] = useState<ColorInfo[]>([]);
  const [theme, setTheme] = useState<string>("");

  const updatePalette = (newPalette: ColorInfo[]) => {
    setPalette(newPalette);
  };

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Gerador de Paleta de Cores com IA
            </h1>
            <p className="mt-2 text-gray-600">
              Assistente inteligente que cria paletas personalizadas usando
              teoria das cores e IA
            </p>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-120px)]">
        <div className="w-1/2 bg-white border-r border-gray-200">
          <ColorChatbot
            updatePalette={updatePalette}
            updateTheme={updateTheme}
          />
        </div>

        <div className="w-1/2 bg-gray-50">
          <PaletteDisplay palette={palette} theme={theme} />
        </div>
      </div>
    </div>
  );
};
