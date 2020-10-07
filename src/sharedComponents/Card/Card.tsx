import React from "react"
import { Frame, FrameProps } from "../Grid/Frame"
import { Theme } from "../Theme/Theme"

export interface CardProps extends FrameProps {

}

export let Card: React.FC<CardProps> = ({ className, ...props }) => {
    return (
        <Frame b="a" className={[...(className instanceof Array ? className : [className]), Theme.classes.round]} {...props} />
    )
}