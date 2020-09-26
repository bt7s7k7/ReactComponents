import { createContext, useContext } from "react";
import { IThemeDefinition } from "./IThemeDefinition";
import { DefaultLight } from "./themes/DefaultLight/DefaultLight";

export const ThemeContext = createContext<IThemeDefinition>(DefaultLight)

export function useTheme() {
    return useContext(ThemeContext)
}