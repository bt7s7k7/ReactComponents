import React from "react"
import { Frame, FrameProps } from "../Grid/Frame"
import { useStyleBuilder } from "../StyleBuilder"
import styles from "./ScrollArea.module.scss"

export interface ScrollAreaProps {
    /** Should scroll in the x axis 
     * @default false
     */
    x?: boolean
    /** Should scroll in the y axis 
     * @default this.x == false ? true : false
     */
    y?: boolean
}

export let ScrollArea: React.FC<ScrollAreaProps & FrameProps> = ({
    x: y = false,
    y: x = false,
    children,
    ...frameProps
}) => {

    var internalStyleBuilder = useStyleBuilder({})
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