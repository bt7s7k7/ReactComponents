import React from "react"
import { Frame, FrameProps } from "../Grid/Grid"

const GREY_DATA_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QJDhEDEIewbJYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADElEQVQI12MoLy8HAALOAWbheX3bAAAAAElFTkSuQmCC"

export interface ImageProps extends FrameProps {
    src?: string
    height?: React.CSSProperties["height"]
    width?: React.CSSProperties["width"]
    alt?: string
}

export let Image: React.FC<ImageProps> = ({
    src = GREY_DATA_URI,
    height = "auto",
    width = "auto",
    alt = "placeholder",
    ...props
}) => {
    return (
        <Frame {...props}>
            <img src={src} alt={alt} style={{
                height,
                width
            }}></img>
        </Frame>
    )
}