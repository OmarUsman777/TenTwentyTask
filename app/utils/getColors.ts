import { defaultColors } from "../styles";

export function getRandomColor(): string {
    const colors = Object.values(defaultColors).filter(color => color !== defaultColors.BLACK && color !== defaultColors.WHITE && color !== defaultColors.OFFWHITE);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
}