import type { TailwindColorClass } from "../types/shared-types";

type TailwindConfigCodeProps = {
  generateTailwindClasses: (palette: any) => TailwindColorClass[];
  copyToClipboard: (text: string) => void;
  palette: any;
};

export const TailwindConfigCode = ({
  generateTailwindClasses,
  copyToClipboard,
  palette,
}: TailwindConfigCodeProps) => {
  const tailwindClasses = generateTailwindClasses(palette);
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
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        Configuração Tailwind
      </h4>
      <div className="bg-gray-900 rounded-lg p-4 text-sm">
        <div className="text-gray-300 mb-2">// tailwind.config.js</div>
        <div className="text-blue-400">module.exports = {"{"}</div>
        <div className="text-blue-400 ml-2"> theme: {"{"}</div>
        <div className="text-blue-400 ml-4"> extend: {"{"}</div>
        <div className="text-blue-400 ml-6"> colors: {"{"}</div>
        {tailwindClasses.map((color, index) => (
          <div
            key={index}
            className="ml-8 flex items-center justify-between group"
          >
            <div>
              <span className="text-green-400">'{color.className}'</span>
              <span className="text-white">: </span>
              <span className="text-yellow-300">'{color.hex}'</span>
              <span className="text-white">,</span>
            </div>
            <button
              onClick={() =>
                copyToClipboard(`'${color.className}': '${color.hex}'`)
              }
              className="opacity-0 group-hover:opacity-100 ml-2 p-1 hover:bg-gray-700 rounded transition-all"
              title="Copiar linha"
            >
              <svg
                className="w-3 h-3 text-gray-400"
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
        ))}
        <div className="text-blue-400 ml-6"> {"}"},</div>
        <div className="text-blue-400 ml-4"> {"}"},</div>
        <div className="text-blue-400 ml-2"> {"}"},</div>
        <div className="text-blue-400">{"}"}</div>
        <button
          onClick={() => {
            const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
${tailwindClasses
  .map((color) => `        '${color.className}': '${color.hex}'`)
  .join(",\n")}
      },
    },
  },
}`;
            copyToClipboard(tailwindConfig);
          }}
          className="mt-3 flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
        >
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
          Copiar Configuração Completa
        </button>
      </div>
    </div>
  );
};
