import React from "react"
import { Frame, FrameProps } from "../Grid/Frame"
import { TextStyle, TextStyleProps } from "./TextStyle"

/** Frame fill with styled text */
export let TextFrame: React.FC<FrameProps & TextStyleProps> = ({ noSelect, ...props }) => {
    return (
        <Frame {...props}>
            <TextStyle noSelect={noSelect} {...props}>
                {props.children}
            </TextStyle>
        </Frame>
    )
}