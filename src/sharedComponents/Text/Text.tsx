import React from "react"
import { Frame, FrameProps } from "../Grid/Grid"
import { TextStyle, TextStyleProps } from "./TextStyle"

export let Text: React.FC<FrameProps & TextStyleProps> = (props) => {
    return (
        <Frame {...props}>
            <TextStyle {...props}>
                {props.children}
            </TextStyle>
        </Frame>
    )
}