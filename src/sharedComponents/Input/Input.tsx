import React, { HTMLProps } from "react"
import { FormComponentProps } from "../FormHooks/useFormInput"
import { Frame, FrameProps } from "../Grid/Frame"
import { StyleableProps } from "../StyleBuilder"
import { useTheme } from "../Theme/ThemeContext"

export interface InputProps extends FormComponentProps<string>, StyleableProps {
    type?: HTMLProps<HTMLInputElement>["type"],
    autocomplete?: HTMLProps<HTMLInputElement>["autoComplete"],
    pattern?: HTMLProps<HTMLInputElement>["pattern"] | RegExp
}

let Component: React.FC<InputProps> = (props) => {
    let theme = useTheme()
    return <theme.components.Input {...props} />
}

let frameOf: React.FC<InputProps & FrameProps> = (props) => <Frame {...props} component={Component} />

export const Input: typeof Component & { Frame: typeof frameOf } = Object.assign(Component, { Frame: frameOf })