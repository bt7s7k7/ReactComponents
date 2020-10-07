import React from "react"
import { Frame, FrameProps } from "../Grid/Frame"
import { TextStyle, TextStyleProps } from "./TextStyle"

/** Frame fill with styled text */
export let TextFrame: React.FC<FrameProps & TextStyleProps> = ({ noSelect, className, style, ...props }) => {
    return (
        <Frame {...props}>
            <TextStyle className={className} style={style} noSelect={noSelect} {...props}>
                {props.children}
            </TextStyle>
        </Frame>
    )
}