import React from "react";
import { Frame, FrameProps } from "../Grid/Frame";
import { StyleableProps } from "../StyleBuilder";
import { useTheme } from "../Theme/ThemeContext";

export interface ButtonProps extends StyleableProps {
    /** Is the button a confirm button (should it be green?) */
    confirm?: boolean
    /** Is the button a deny/delete button (should it be red?) */
    deny?: boolean
    /** Is the button background color */
    bland?: boolean
    /** Is the button round */
    round?: boolean,
    baseColor?: React.CSSProperties["backgroundColor"],
    fab?: boolean,
    /** Should the button have a shadow */
    shadow?: boolean
}

let Component: React.FC<ButtonProps> = (props) => {
    let theme = useTheme()
    return <theme.components.Button {...props} />
}

let frameOf: React.FC<ButtonProps & FrameProps> = (props) => <Frame {...props} component={Component} />

export const Button: typeof Component & { Frame: typeof frameOf } = Object.assign(Component, { Frame: frameOf })