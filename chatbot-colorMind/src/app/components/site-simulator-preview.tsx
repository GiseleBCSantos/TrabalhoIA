import type { ColorInfo } from "../types/shared-types";
import { isLightColor } from "../utils/utils";

type SiteSimulationPreviewProps = {
  palette: ColorInfo[];
};

export const SiteSimulationPreview = ({
  palette,
}: SiteSimulationPreviewProps) => {
  if (palette.length === 0) return null;

  const lightestColor = palette.reduce((prev, current) =>
    isLightColor(prev.hex) ? prev : current
  ).hex;
  const darkestColor = palette.reduce((prev, current) =>
    !isLightColor(prev.hex) ? prev : current
  ).hex;

  const primaryBg =
    palette.find((c) => c.role === "dominante")?.hex ||
    palette[0]?.hex ||
    "#000000";
  const mainContentBg =
    palette.find((c) => c.usage.toLowerCase().includes("fundo principal"))
      ?.hex ||
    palette[1]?.hex ||
    "#FFFFFF";
  const accentColor =
    palette.find((c) => c.role === "destaque")?.hex ||
    palette[3]?.hex ||
    "#0066cc";
  const secondarySupportColor =
    palette.find((c) => c.usage.toLowerCase().includes("apoio"))?.hex ||
    palette[4]?.hex ||
    "#CCCCCC";

  const getContrastingTextColor = (bgColor: string) =>
    isLightColor(bgColor) ? darkestColor : lightestColor;

  const headerFooterTextColor = getContrastingTextColor(primaryBg);
  const cardBgColor =
    palette.find((c) => c.usage.toLowerCase().includes("cards"))?.hex ||
    secondarySupportColor;
  const cardTextColor = getContrastingTextColor(cardBgColor);
  const inputBgColor = secondarySupportColor;
  const inputTextColor = getContrastingTextColor(inputBgColor);
  const accentButtonTextColor = getContrastingTextColor(accentColor);

  return (
    <div className="flex justify-center">
      <div
        className="w-[300px] h-[200px] border border-gray-300 rounded-lg overflow-hidden shadow-sm"
        style={{ backgroundColor: mainContentBg }}
      >
        <div
          className="h-[20%] flex items-center justify-between px-[4%]"
          style={{ backgroundColor: primaryBg }}
        >
          <div
            className="text-xs font-bold"
            style={{ color: headerFooterTextColor }}
          >
            Logo
          </div>
          <div className="flex gap-[8%]">
            <div
              className="text-[10px] hover:opacity-80 cursor-pointer"
              style={{ color: headerFooterTextColor }}
            >
              Home
            </div>
            <div
              className="text-[10px] hover:opacity-80 cursor-pointer"
              style={{ color: headerFooterTextColor }}
            >
              About
            </div>
          </div>
        </div>

        <div
          className="h-[65%] flex items-center justify-center"
          style={{ backgroundColor: mainContentBg }}
        >
          <div
            className="w-[70%] h-[80%] rounded-md p-[6%]"
            style={{ backgroundColor: cardBgColor }}
          >
            <div className="text-center mb-[8%]">
              <div
                className="text-xs font-semibold mb-[4%]"
                style={{ color: cardTextColor }}
              >
                Login
              </div>
            </div>
            <div className="space-y-[6%]">
              <div
                className="h-[15%] rounded text-[8px] flex items-center px-[4%]"
                style={{ backgroundColor: inputBgColor, color: inputTextColor }}
              >
                Email
              </div>
              <div
                className="h-[15%] rounded text-[8px] flex items-center px-[4%]"
                style={{ backgroundColor: inputBgColor, color: inputTextColor }}
              >
                Password
              </div>
              <div
                className="h-[18%] rounded text-[8px] flex items-center justify-center font-medium cursor-pointer hover:opacity-90"
                style={{
                  backgroundColor: accentColor,
                  color: accentButtonTextColor,
                }}
              >
                Sign In
              </div>
            </div>
          </div>
        </div>

        <div
          className="h-[15%] flex items-center justify-center text-[8px]"
          style={{ backgroundColor: primaryBg, color: headerFooterTextColor }}
        >
          © 2024 Site Preview
        </div>
      </div>
    </div>
  );
};
