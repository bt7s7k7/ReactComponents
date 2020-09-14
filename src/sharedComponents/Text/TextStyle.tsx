import React from "react"
import { StyleBuilder } from "../StyleBuilder"
import styles from "./TextStyle.module.scss"

export interface TextStyleProps {
    color?: React.CSSProperties["color"],
    size?: React.CSSProperties["fontSize"]
    weight?: React.CSSProperties["fontWeight"]
    bold?: boolean,
    font?: React.CSSProperties["fontFamily"],
    className?: string
}

export let TextStyle: React.FC<TextStyleProps> = ({
    color = null,
    size = null,
    weight = null,
    bold = false,
    font = null,
    children,
    className = ""
}) => {
    if (bold) {
        className += " " + styles.bold
    }

    var styleBuilder = new StyleBuilder()
        .addStyle("color", color)
        .addStyle("fontSize", size)
        .addStyle("fontWeight", weight)
        .addStyle("fontFamily", font)

    return (
        <span style={styleBuilder.build()} className={styles.textStyle + " " + className}>{children}</span>
    )
}