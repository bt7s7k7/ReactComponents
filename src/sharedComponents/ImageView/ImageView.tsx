import React from "react";
import { Frame, FrameProps } from "../Grid/Frame";
import { StyleableProps } from "../StyleBuilder";
import { useTheme } from "../Theme/ThemeContext";

export interface ImageViewProps extends StyleableProps {
    src?: string
    height?: React.CSSProperties["height"]
    width?: React.CSSProperties["width"]
    alt?: string,
    cover?: boolean,
    fit?: React.CSSProperties["objectFit"]
}

let Component: React.FC<ImageViewProps> = (props) => {
    let theme = useTheme()
    return <theme.components.ImageView {...props} />
}

let frameOf: React.FC<ImageViewProps & FrameProps> = (props) => <Frame {...props} component={Component} />

export const ImageView: typeof Component & { Frame: typeof frameOf } = Object.assign(Component, { Frame: frameOf })