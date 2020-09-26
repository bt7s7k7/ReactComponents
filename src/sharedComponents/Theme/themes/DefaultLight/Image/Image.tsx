import React from "react"
import { ImageViewProps } from "../../../../ImageView/ImageView"
import { useStyleBuilder } from "../../../../StyleBuilder"
import styles from "./Image.module.scss"

const GREY_DATA_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QJDhEDEIewbJYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADElEQVQI12MoLy8HAALOAWbheX3bAAAAAElFTkSuQmCC"

export let DefaultWhiteThemeImageView: React.FC<ImageViewProps> = ({
    src = GREY_DATA_URI,
    height = null,
    width = null,
    alt = "placeholder",
    cover = false,
    fit = null,
    ...props
}) => {
    let builder = useStyleBuilder(props)
        .addStyle("width", width)
        .addStyle("height", height)
        .addClass(styles.image)

    if (cover) builder.addClass(styles.cover)

    builder.addStyle("objectFit", fit)

    return (
        <img src={src} alt={alt} {...builder.build()}></img>
    )
}