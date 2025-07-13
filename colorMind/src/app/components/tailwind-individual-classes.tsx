import type { TailwindColorClass } from "../types/shared-types";

type TailwindIndividualClassesProps = {
  generateTailwindClasses: (palette: any) => TailwindColorClass[];
  copyToClipboard: (text: string) => void;
  palette: any;
};

export const TailwindIndividualClasses = ({
  generateTailwindClasses,
  copyToClipboard,
  palette,
}: TailwindIndividualClassesProps) => {
  const tailwindClasses = generateTailwindClasses(palette);

  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-4">Classes Tailwind</h4>
      <div className="grid grid-cols-1 gap-3">
        {tailwindClasses.map((color, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-3 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: color.hex }}
              />
              <span className="font-medium text-gray-900">{color.name}</span>
            </div>
            <span className="text-sm text-gray-500">{color.hex}</span>
            <div className="grid grid-cols-3 gap-2 text-xs mt-2">
              <button
                onClick={() => copyToClipboard(color.bgClass)}
                className="inline-flex items-center justify-between p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <span className="font-mono">{color.bgClass}</span>
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
              <button
                onClick={() => copyToClipboard(color.textClass)}
                className="inline-flex items-center justify-between p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <span className="font-mono">{color.textClass}</span>
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
              <button
                onClick={() => copyToClipboard(color.borderClass)}
                className="inline-flex items-center justify-between p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <span className="font-mono">{color.borderClass}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
};
