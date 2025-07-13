import type { ColorInfo } from "../types/shared-types";

type ColorDetailsListProps = {
  palette: ColorInfo[];
  copyToClipboard: (text: string) => void;
};

export const ColorDetailsList = ({
  palette,
  copyToClipboard,
}: ColorDetailsListProps) => {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-4">Detalhes das Cores</h4>
      <div className="grid grid-cols-1 gap-4">
        {palette.map((color, index) => (
          <div key={index} className="group">
            <div
              className="w-full h-20 rounded-lg shadow-sm border border-gray-200 cursor-pointer transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: color.hex }}
              onClick={() => copyToClipboard(color.hex)}
            />

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">{color.name}</h4>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    color.role === "dominante"
                      ? "bg-blue-100 text-blue-800"
                      : color.role === "secundária"
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {color.role}
                </span>
              </div>

              <p className="text-sm text-gray-600">{color.description}</p>

              {color.psychology && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                  <p className="text-xs text-yellow-800">
                    <span className="font-medium">Psicologia:</span>{" "}
                    {color.psychology}
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">HEX:</span>
                  <button
                    onClick={() => copyToClipboard(color.hex)}
                    className="flex items-center gap-1 text-xs font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    {color.hex}
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">RGB:</span>
                  <button
                    onClick={() => copyToClipboard(color.rgb)}
                    className="flex items-center gap-1 text-xs font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    {color.rgb}
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">HSL:</span>
                  <button
                    onClick={() => copyToClipboard(color.hsl)}
                    className="flex items-center gap-1 text-xs font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    {color.hsl}
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Uso sugerido:</p>
                <p className="text-xs text-gray-700">{color.usage}</p>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">Contraste:</span>
                  <span className="text-xs text-gray-700">
                    {color.contrast_ratio}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Acessibilidade:</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      color.accessibility.includes("AAA")
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {color.accessibility}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
