import React from "react"
import { IThemeDefinition } from "../Theme/IThemeDefinition"
import { Theme } from "../Theme/Theme"
import { TextStyle } from "./TextStyle"

export let TextColor = Object.assign({},
    ...Object.entries(Theme.colors).map(([key, value]) => ({ [key]: ((props) => <TextStyle {...{ ...props, color: value }} />) as typeof TextStyle }))
) as { [P in keyof IThemeDefinition["colors"]]: typeof TextStyle }

export let TextSize = Object.assign({},
    ...Object.entries(Theme.textSizes).map(([key, value]) => ({ [key]: ((props) => <TextStyle {...{ ...props, size: value }} />) as typeof TextStyle }))
) as { [P in keyof IThemeDefinition["textSizes"]]: typeof TextStyle }

export let Font = Object.assign({},
    ...Object.entries(Theme.fonts).map(([key, value]) => ({ [key]: ((props) => <TextStyle {...{ ...props, font: value }} />) as typeof TextStyle }))
) as { [P in keyof IThemeDefinition["fonts"]]: typeof TextStyle }