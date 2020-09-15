import React from "react"
import { BaseProps, StyleableProps, StyleBuilder } from "../StyleBuilder"
import styles from "./TextStyle.module.scss"

export interface TextStyleProps extends StyleableProps, BaseProps {
    color?: React.CSSProperties["color"],
    size?: React.CSSProperties["fontSize"]
    weight?: React.CSSProperties["fontWeight"]
    bold?: boolean,
    font?: React.CSSProperties["fontFamily"],
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

    var styleBuilder = new StyleBuilder(props)
        .addStyle("color", color)
        .addStyle("fontSize", size)
        .addStyle("fontWeight", weight)
        .addStyle("fontFamily", font)

    styleBuilder.addClass(styles.textStyle)

    if (bold) {
        styleBuilder.addClass(styles.bold)
    }

    if (noSelect) {
        styleBuilder.addClass(styles.noSelect)
    }

    return (
        <span {...styleBuilder.build(props)}>{children}</span>
    )
}