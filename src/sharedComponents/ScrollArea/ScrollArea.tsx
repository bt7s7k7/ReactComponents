import React from "react"
import { Frame, FrameProps } from "../Grid/Frame"
import styles from "./ScrollArea.module.scss"

export interface ScrollAreaProps {
    x?: boolean
    y?: boolean
}

export let ScrollArea: React.FC<ScrollAreaProps & FrameProps> = ({
    x: y = false,
    y: x = false,
    children,
    ...frameProps
}) => {

    let className = styles.scrollArea

    if (x === true) {
        className += " " + styles.scrollAreaX
    }

    if (y === true || x === false) {
        className += " " + styles.scrollAreaY
    }

    return (
        <Frame {...frameProps}>
            <div className={className}>
                <Frame {...frameProps} fill>
                    {children}
                </Frame>
            </div>
        </Frame>
    )
}