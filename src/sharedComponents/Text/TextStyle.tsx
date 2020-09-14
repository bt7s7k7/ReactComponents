import React from "react"
import { colors, fonts, textSizes } from "../constants"

export interface TextStyleProps {
    color?: React.CSSProperties["color"],
    size?: React.CSSProperties["fontSize"]
    weight?: React.CSSProperties["fontWeight"]
    bold?: boolean,
    font?: React.CSSProperties["fontFamily"]
}

export let TextStyle: React.FC<TextStyleProps> = ({
    color = colors.foreground,
    size = textSizes.normal,
    weight = "normal",
    bold = false,
    font = fonts.normal,
    children
}) => {
    if (bold) {
        weight = "bold"
    }

    return (
        <span style={{
            color: color,
            fontWeight: weight,
            fontSize: size,
            fontFamily: font
        }}>{children}</span>
    )
}