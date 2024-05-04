export const accentColorsValues = {
  pink: '341 76% 62%',
  blue: '193 72% 55%',
  yellow: '41 76% 51%',
} as const;

export const accentColors = Object.keys(
  accentColorsValues,
) as (keyof typeof accentColorsValues)[];
