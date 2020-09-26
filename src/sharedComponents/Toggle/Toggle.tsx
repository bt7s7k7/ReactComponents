import React from "react"
import { FormComponentProps } from "../FormHooks/useFormInput"
import { Frame, FrameProps } from "../Grid/Frame"
import { StyleableProps } from "../StyleBuilder"
import { useTheme } from "../Theme/ThemeContext"

export interface ToggleProps extends StyleableProps, FormComponentProps<boolean> { }

let Component: React.FC<ToggleProps> = (props) => {
    let theme = useTheme()
    return <theme.components.Toggle {...props} />
}

let frameOf: React.FC<ToggleProps & FrameProps> = (props) => <Frame {...props} component={Component} />

export const Toggle: typeof Component & { Frame: typeof frameOf } = Object.assign(Component, { Frame: frameOf })