// export type Color = {
//   name: string;
//   hex: string;
// };

// export type Palette = Color[];

export type ColorInfo = {
  name: string;
  role: "dominante" | "secundária" | "destaque";
  hex: string;
  hsl: string;
  rgb: string;
  description: string;
  usage: string;
  contrast_ratio: string;
  accessibility: string;
  psychology?: string;
};

export type GeneratePaletteResult = {
  palette: any | null;
  metadata: {
    harmony_type: string;
    theme_analysis: string;
    usage_tips: string;
    generated_by: string;
    theme: string;
    model?: string;
  } | null;
  error: string | null;
  isGenerating: boolean;
};

export type PaletteDisplayProps = {
  palette: ColorInfo[];
  theme: string;
};

export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export type TailwindColorClass = {
  name: string;
  hex: string;
  className: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
};
