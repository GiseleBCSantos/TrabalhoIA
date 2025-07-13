import { useState } from "react";
import type {
  PaletteDisplayProps,
  TailwindColorClass,
} from "../types/shared-types";

import { PaletteHeader } from "./palette-header";
import { PalettePreviewSwatches } from "./palette-preview-watches";
import { SiteSimulationPreview } from "./site-simulator-preview";
import { TailwindConfigCode } from "./tailwind-config-code";
import { TailwindIndividualClasses } from "./tailwind-individual-classes";
import { ColorDetailsList } from "./color-details-list";
import {
  exportCSS,
  exportPalette,
  generateTailwindClasses,
} from "../utils/utils";

export const PaletteDisplay = ({ palette, theme }: PaletteDisplayProps) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const orderedPaletteForPreview = [...palette].sort((a, b) => {
    const roleOrder = { dominante: 1, secundária: 2, destaque: 3 };
    return roleOrder[a.role] - roleOrder[b.role];
  });

  return (
    <div className="flex flex-col h-full">
      <PaletteHeader
        palette={palette}
        theme={theme}
        exportCSS={() => exportCSS(theme, palette)}
        exportPalette={exportPalette}
      />

      <div className="flex-1 p-6 overflow-y-auto">
        {palette.length > 0 ? (
          <div className="space-y-8">
            <PalettePreviewSwatches
              orderedPaletteForPreview={orderedPaletteForPreview}
              copyToClipboard={copyToClipboard}
            />
            <SiteSimulationPreview palette={palette} />
            <TailwindConfigCode
              generateTailwindClasses={() => generateTailwindClasses(palette)}
              copyToClipboard={copyToClipboard}
              palette={palette}
            />
            <TailwindIndividualClasses
              generateTailwindClasses={() => generateTailwindClasses(palette)}
              copyToClipboard={copyToClipboard}
              palette={palette}
            />
            <ColorDetailsList
              palette={palette}
              copyToClipboard={copyToClipboard}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-12 h-12 border-4 border-dashed border-gray-300 rounded-full"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma paleta gerada
            </h3>
            <p className="text-gray-500 max-w-sm">
              Converse com o assistente à esquerda para gerar uma paleta de
              cores personalizada com IA para seu projeto.
            </p>
          </div>
        )}
      </div>

      {copiedColor && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Copiado: {copiedColor}
        </div>
      )}
    </div>
  );
};
