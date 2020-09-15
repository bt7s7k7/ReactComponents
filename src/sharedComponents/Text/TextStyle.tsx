import React from "react"
import { StyleableProps, StyleBuilder } from "../StyleBuilder"
import styles from "./TextStyle.module.scss"

export interface TextStyleProps extends StyleableProps {
    color?: React.CSSProperties["color"],
    size?: React.CSSProperties["fontSize"]
    weight?: React.CSSProperties["fontWeight"]
    bold?: boolean,
    font?: React.CSSProperties["fontFamily"],
}

export let TextStyle: React.FC<TextStyleProps> = ({
    color = null,
    size = null,
    weight = null,
    bold = false,
    font = null,
    children,
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

    return (
        <span {...props} {...styleBuilder.build()}>{children}</span>
    )
}