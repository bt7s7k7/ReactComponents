import React from "react"
import styles from "./Page.module.css"


export let Page: React.FC<{}> = ({ children }) => {
    return (
        <div className={styles.page}>{children}</div>
    )
}