import React from "react"
import { Frame, FrameProps } from "../Grid/Frame"
import { TextStyle, TextStyleProps } from "./TextStyle"

/** Frame fill with styled text */
export let TextFrame: React.FC<FrameProps & TextStyleProps> = (props) => {
    return (
        <Frame {...props}>
            <TextStyle {...props} noPropagation>
                {props.children}
            </TextStyle>
        </Frame>
    )
}