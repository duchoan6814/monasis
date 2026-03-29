import { createAnimations } from "@tamagui/animations-react-native";
import { defaultConfig } from "@tamagui/config/v5";
import { shorthands } from "@tamagui/shorthands";
import { createTamagui } from "tamagui";

// Adobe palette "The Wave (Pado)"
const brandPurple = "#AF36BF"; // hsl(292, 56%, 48%)
const brandBlue = "#3889F2"; // hsl(213, 87%, 58%)
const brandYellow = "#F2BE22"; // hsl(45, 89%, 54%)
const brandRed = "#F20F0F"; // hsl(0, 89%, 50%)

const purpleScaleLight = {
  color1: "hsl(292, 80%, 99.5%)",
  color2: "hsl(292, 65%, 97%)",
  color3: "hsl(292, 55%, 94%)",
  color4: "hsl(292, 52%, 88%)",
  color5: "hsl(292, 50%, 82%)",
  color6: "hsl(292, 50%, 72%)",
  color7: "hsl(292, 52%, 62%)",
  color8: "hsl(292, 54%, 55%)",
  color9: brandPurple,
  color10: "hsl(292, 56%, 42%)",
  color11: "hsl(292, 58%, 33%)",
  color12: "hsl(292, 60%, 12%)",
  color: "hsl(292, 60%, 12%)",
  colorHover: "hsl(292, 60%, 12%)",
  colorPress: "hsl(292, 56%, 48%)",
  colorFocus: "hsl(292, 60%, 12%)",
  background: "hsl(292, 80%, 99.5%)",
  backgroundHover: "hsl(292, 65%, 97%)",
  backgroundPress: "hsl(292, 55%, 94%)",
  backgroundFocus: "hsl(292, 55%, 94%)",
  accentBackground: brandPurple,
  accentColor: "#ffffff",
  borderColor: "hsl(292, 52%, 88%)",
  borderColorHover: "hsl(292, 55%, 94%)",
  placeholderColor: "hsl(292, 30%, 55%)",
};

const purpleScaleDark = {
  color1: "hsl(292, 30%, 7%)",
  color2: "hsl(292, 28%, 11%)",
  color3: "hsl(292, 26%, 15%)",
  color4: "hsl(292, 28%, 20%)",
  color5: "hsl(292, 30%, 26%)",
  color6: "hsl(292, 36%, 35%)",
  color7: "hsl(292, 42%, 44%)",
  color8: "hsl(292, 50%, 53%)",
  color9: "hsl(292, 56%, 58%)",
  color10: "hsl(292, 58%, 68%)",
  color11: "hsl(292, 62%, 80%)",
  color12: "hsl(292, 70%, 96%)",
  color: "hsl(292, 70%, 96%)",
  colorHover: "hsl(292, 70%, 96%)",
  colorPress: "hsl(292, 56%, 58%)",
  colorFocus: "hsl(292, 70%, 96%)",
  background: "hsl(292, 30%, 7%)",
  backgroundHover: "hsl(292, 30%, 10%)",
  backgroundPress: "hsl(292, 26%, 15%)",
  backgroundFocus: "hsl(292, 26%, 15%)",
  accentBackground: "hsl(292, 56%, 58%)",
  accentColor: "#ffffff",
  borderColor: "hsl(292, 28%, 20%)",
  borderColorHover: "hsl(292, 26%, 15%)",
  placeholderColor: "hsl(292, 40%, 55%)",
};

const brandColorOverrides = {
  blue9: brandBlue,
  blue10: "#2B7AE8",
  yellow9: brandYellow,
  yellow10: "#E8AF10",
  red9: brandRed,
  red10: "#E00D0D",
};

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  shorthands: {
    ...defaultConfig.shorthands,
    ...shorthands,
  },
  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
      ...purpleScaleLight,
      ...brandColorOverrides,
    },
    dark: {
      ...defaultConfig.themes.dark,
      ...purpleScaleDark,
      ...brandColorOverrides,
    },
  },
  settings: {
    onlyAllowShorthands: false,
  },
  animations: createAnimations({
    bouncy: {
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    lazy: {
      damping: 18,
      stiffness: 50,
    },
    quick: {
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
  }),
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
