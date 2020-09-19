import React from "react"
import { Frame, FrameProps } from "../Grid/Frame"
import { StyleBuilder } from "../StyleBuilder"
import styles from "./Image.module.scss"

const GREY_DATA_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QJDhEDEIewbJYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADElEQVQI12MoLy8HAALOAWbheX3bAAAAAElFTkSuQmCC"

export interface ImageProps extends FrameProps {
    src?: string
    height?: React.CSSProperties["height"]
    width?: React.CSSProperties["width"]
    alt?: string,
    cover?: boolean,
    fit?: React.CSSProperties["objectFit"]
}

export let Img: React.FC<ImageProps> = ({
    src = GREY_DATA_URI,
    height = null,
    width = null,
    alt = "placeholder",
    cover = false,
    fit = null,
    ...props
}) => {
    let builder = new StyleBuilder({})
        .addStyle("width", width)
        .addStyle("height", height)
        .addClass(styles.image)

    if (cover) builder.addClass(styles.cover)

    builder.addStyle("objectFit", fit)

    return (
        <Frame {...props}>
            <img src={src} alt={alt} {...builder.build()}></img>
        </Frame>
    )
}