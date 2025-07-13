import type { ColorInfo } from "../types/shared-types";

type PalettePreviewSwatchesProps = {
  orderedPaletteForPreview: ColorInfo[];
  copyToClipboard: (color: string) => void;
};

export const PalettePreviewSwatches = ({
  orderedPaletteForPreview,
  copyToClipboard,
}: PalettePreviewSwatchesProps) => {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        Preview da Paleta
      </h4>
      <div className="grid grid-cols-5 gap-2 h-20 rounded-lg overflow-hidden shadow-sm border border-gray-200">
        {orderedPaletteForPreview.map((color, index) => (
          <div
            key={index}
            className="flex-1 cursor-pointer hover:scale-105 transition-transform"
            style={{ backgroundColor: color.hex }}
            title={`${color.name} - ${color.hex}`}
            onClick={() => copyToClipboard(color.hex)}
          />
        ))}
      </div>
    </div>
  );
};
