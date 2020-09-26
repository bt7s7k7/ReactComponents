import React from "react"
import { IThemeDefinition } from "./IThemeDefinition"
import styles from "./Theme.module.scss"
import { ThemeContext } from "./ThemeContext"
import { DefaultLight } from "./themes/DefaultLight/DefaultLight"

export interface ThemeProps {
    theme: IThemeDefinition
}

function makeLookupFunction<K extends keyof IThemeDefinition, C extends keyof React.CSSProperties>(themeKey: K, property: C) {
    return (value: React.CSSProperties[C] | keyof IThemeDefinition[K] | null, theme: IThemeDefinition): React.CSSProperties[C] | null => {
        if (value == null) return null
        // @ts-ignore
        else if (typeof value == "string" && value in theme[themeKey]) {
            // @ts-ignore
            return theme[themeKey][value]
        } else {
            // @ts-ignore
            return value
        }
    }
}

const staticProps = {
    lookupColor: makeLookupFunction("colors", "color"),
    lookupTextSize: makeLookupFunction("textSizes", "fontSize"),
    lookupFont: makeLookupFunction("fonts", "fontFamily"),
    lookupClass: (className: string, theme: IThemeDefinition) => {
        if (className in theme.classes) {
            return theme.classes[className as keyof IThemeDefinition["classes"]]
        } else {
            return className
        }
    },
    colors: Object.assign({}, ...Object.keys(DefaultLight.colors).map(key => ({ [key]: key }))) as { [P in keyof IThemeDefinition["colors"]]: P },
    fonts: Object.assign({}, ...Object.keys(DefaultLight.fonts).map(key => ({ [key]: key }))) as { [P in keyof IThemeDefinition["fonts"]]: P },
    textSizes: Object.assign({}, ...Object.keys(DefaultLight.textSizes).map(key => ({ [key]: key }))) as { [P in keyof IThemeDefinition["textSizes"]]: P },
    classes: Object.assign({}, ...Object.keys(DefaultLight.classes).map(key => ({ [key]: key }))) as { [P in keyof IThemeDefinition["classes"]]: P },
}

export let Theme: React.FC<ThemeProps> & typeof staticProps = Object.assign(({ theme, children }: React.PropsWithChildren<ThemeProps>) => {
    return (
        <ThemeContext.Provider value={theme}>
            <div className={styles.theme + " " + theme.className}>{children}</div>
        </ThemeContext.Provider>
    )
}, staticProps)
