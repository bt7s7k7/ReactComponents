import React from "react"
import { StyleableProps, useStyleBuilder } from "../StyleBuilder"
import { IThemeDefinition } from "../Theme/IThemeDefinition"
import { Theme } from "../Theme/Theme"
import { useTheme } from "../Theme/ThemeContext"
import styles from "./TextStyle.module.scss"

export interface TextStyleProps extends StyleableProps {
    /** Color value for the text */
    color?: React.CSSProperties["color"] | keyof IThemeDefinition["colors"],
    size?: React.CSSProperties["fontSize"] | keyof IThemeDefinition["textSizes"]
    weight?: React.CSSProperties["fontWeight"]
    bold?: boolean,
    font?: React.CSSProperties["fontFamily"] | keyof IThemeDefinition["fonts"]
    /** Make the text not selectable */
    noSelect?: boolean
}

export let TextStyle: React.FC<TextStyleProps> = ({
    color = null,
    size = null,
    weight = null,
    bold = false,
    font = null,
    children,
    noSelect = false,
    ...props
}) => {
    let theme = useTheme()

    var styleBuilder = useStyleBuilder(props)
        .addStyle("color", Theme.lookupColor(color, theme))
        .addStyle("fontSize", Theme.lookupTextSize(size, theme))
        .addStyle("fontWeight", weight)
        .addStyle("fontFamily", Theme.lookupFont(font, theme))

    styleBuilder.addClass(styles.textStyle)

    if (bold) {
        styleBuilder.addClass(styles.bold)
    }

    if (noSelect) {
        styleBuilder.addClass(styles.noSelect)
    }

    return (
        <span {...styleBuilder.build()}>{children}</span>
    )
}