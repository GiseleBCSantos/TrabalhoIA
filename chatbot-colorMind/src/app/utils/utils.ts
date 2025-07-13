import type { ColorInfo, TailwindColorClass } from "../types/shared-types";

export const exportPalette = (theme: string, palette: any) => {
  const paletteData = {
    theme,
    colors: palette.map((color: ColorInfo) => ({
      name: color.name,
      hex: color.hex,
      role: color.role,
      psychology: color.psychology,
    })),
    generated_at: new Date().toISOString(),
  };

  const dataStr = JSON.stringify(paletteData, null, 2);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = `paleta-${theme
    .toLowerCase()
    .replace(/\s+/g, "-")}.json`;

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};

export const exportCSS = (theme: string, palette: any) => {
  const cssCode = `:root {
${palette
  .map(
    (color: ColorInfo, index: number) =>
      `  --color-${color.role}-${index + 1}: ${color.hex};`
  )
  .join("\n")}

/* Cores por função */
${palette
  .filter((c: any) => c.role === "dominante")
  .map(
    (color: ColorInfo, index: number) =>
      `  --color-primary-${index + 1}: ${color.hex};`
  )
  .join("\n")}
${palette
  .filter((c: any) => c.role === "secundária")
  .map(
    (color: ColorInfo, index: number) =>
      `  --color-secondary-${index + 1}: ${color.hex};`
  )
  .join("\n")}
${palette
  .filter((c: any) => c.role === "destaque")
  .map(
    (color: ColorInfo, index: number) =>
      `  --color-accent-${index + 1}: ${color.hex};`
  )
  .join("\n")}
}

/* Classes utilitárias */
${palette
  .map(
    (color: ColorInfo) =>
      `.bg-${color.name
        .toLowerCase()
        .replace(/\s+/g, "-")} { background-color: ${color.hex}; }`
  )
  .join("\n")}
${palette
  .map(
    (color: ColorInfo) =>
      `.text-${color.name.toLowerCase().replace(/\s+/g, "-")} { color: ${
        color.hex
      }; }`
  )
  .join("\n")}`;

  const dataUri = "data:text/css;charset=utf-8," + encodeURIComponent(cssCode);
  const exportFileDefaultName = `paleta-${theme
    .toLowerCase()
    .replace(/\s+/g, "-")}.css`;

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};

export const generateTailwindClasses = (palette: any): TailwindColorClass[] => {
  return palette.map((color: ColorInfo) => {
    const className = color.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return {
      name: color.name,
      hex: color.hex,
      className: className,
      bgClass: `bg-${className}`,
      textClass: `text-${className}`,
      borderClass: `border-${className}`,
    };
  });
};

export const isLightColor = (hex: string): boolean => {
  const r = Number.parseInt(hex.substring(1, 3), 16);
  const g = Number.parseInt(hex.substring(3, 5), 16);
  const b = Number.parseInt(hex.substring(5, 7), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.5;
};
