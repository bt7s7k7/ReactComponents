import React from "react"
import { StyleableProps, StyleBuilder } from "../StyleBuilder"
import styles from "./Page.module.scss"

/**
 * Component that is 100vh high
 */
export let Page: React.FC<StyleableProps> = ({ children, ...props }) => {
    return (
        <div {...new StyleBuilder(props).addClass(styles.page).build()}>{children}</div>
    )
}