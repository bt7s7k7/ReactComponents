import React from "react"
import { Frame, FrameProps } from "../Grid/Frame"
import { StyleBuilder } from "../StyleBuilder"
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

    var internalStyleBuilder = new StyleBuilder({})
    internalStyleBuilder.addClass(styles.scrollArea)

    if (x === true) {
        internalStyleBuilder.addClass(styles.scrollAreaX)
    }

    if (y === true || x === false) {
        internalStyleBuilder.addClass(styles.scrollAreaY)
    }

    return (
        <Frame {...frameProps}>
            <div {...internalStyleBuilder.build()}>
                <Frame {...frameProps} fill>
                    {children}
                </Frame>
            </div>
        </Frame>
    )
}