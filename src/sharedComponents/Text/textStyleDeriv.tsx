import React from "react"
import { colors, fonts, textSizes } from "../constants"
import { TextStyle } from "./TextStyle"

export let TextColor = Object.assign({},
    ...Object.entries(colors).map(([key, value]) => ({ [key]: ((props) => <TextStyle {...{ ...props, color: value }} />) as typeof TextStyle }))
) as { [P in keyof typeof colors]: typeof TextStyle }

export let TextSize = Object.assign({},
    ...Object.entries(textSizes).map(([key, value]) => ({ [key]: ((props) => <TextStyle {...{ ...props, size: value }} />) as typeof TextStyle }))
) as { [P in keyof typeof textSizes]: typeof TextStyle }

export let Font = Object.assign({},
    ...Object.entries(fonts).map(([key, value]) => ({ [key]: ((props) => <TextStyle {...{ ...props, font: value }} />) as typeof TextStyle }))
) as { [P in keyof typeof fonts]: typeof TextStyle }