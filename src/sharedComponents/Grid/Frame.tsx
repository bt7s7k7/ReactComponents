import React from "react"
import { StyleBuilder } from "../StyleBuilder"
import styles from "./Frame.module.scss"

export interface FrameProps {
    basis?: React.CSSProperties["flexBasis"]
    grow?: React.CSSProperties["flexGrow"]
    shrink?: React.CSSProperties["flexShrink"]
    fill?: boolean
    alignCross?: React.CSSProperties["alignItems"]
    alignMain?: React.CSSProperties["justifyContent"]
    direction?: React.CSSProperties["flexDirection"],
    center?: boolean,
    className?: string,
    color?: React.CSSProperties["backgroundColor"],
}

export let Frame: React.FC<FrameProps> = ({
    children,
    basis = null,
    grow = null,
    shrink = null,
    fill = false,
    alignCross = null,
    alignMain = null,
    direction = null,
    color = null,
    center = false,
    className = ""
}) => {
    if (fill) {
        className += " " + styles.fill
    }

    if (center) {
        className += " " + styles.center
    }

    var styleBuilder = new StyleBuilder()
        .addStyle("flexDirection", direction)
        .addStyle("flexBasis", basis)
        .addStyle("flexGrow", grow)
        .addStyle("justifyContent", alignMain)
        .addStyle("alignItems", alignCross)
        .addStyle("backgroundColor", color)

    return <div style={styleBuilder.build()} className={styles.frame + " " + className}>{children}</div>
}

