import React from "react"
import styles from "./Frame.module.css"

export interface FrameProps {
    basis?: React.CSSProperties["flexBasis"]
    grow?: React.CSSProperties["flexGrow"]
    shrink?: React.CSSProperties["flexShrink"]
    fill?: boolean
    alignCross?: React.CSSProperties["alignItems"]
    alignMain?: React.CSSProperties["justifyContent"]
    direction?: React.CSSProperties["flexDirection"],
    center?: boolean
}

export let Frame: React.FC<FrameProps> = ({
    children,
    basis = "initial",
    grow = "initial",
    shrink = "initial",
    fill = false,
    alignCross = "stretch",
    alignMain = "flex-start",
    direction = "column",
    center = false
}) => {
    if (fill) {
        grow = 1
        shrink = 1
    }

    if (center) {
        alignCross = "center"
        alignMain = "space-around"
    }

    return <div style={{
        flexDirection: direction,
        flexBasis: basis,
        flexGrow: grow,
        flexShrink: shrink,
        justifyContent: alignMain,
        alignItems: alignCross,
        display: "flex"
    }} className={styles.frame}>{children}</div>
}

