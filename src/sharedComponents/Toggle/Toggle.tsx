import React, { CSSProperties } from "react"
import { FormComponentProps } from "../FormHooks/useFormInput"
import { Frame, FrameProps } from "../Grid/Frame"
import { StyleableProps } from "../StyleBuilder"
import { IThemeDefinition } from "../Theme/IThemeDefinition"
import { useTheme } from "../Theme/ThemeContext"

export interface ToggleProps extends StyleableProps, FormComponentProps<boolean> {
    color?: CSSProperties["backgroundColor"] | keyof IThemeDefinition["colors"],
    confirm?: boolean,
    deny?: boolean
}

let Component: React.FC<ToggleProps> = (props) => {
    let theme = useTheme()
    return <theme.components.Toggle {...props} />
}

let frameOf: React.FC<ToggleProps & FrameProps> = (props) => <Frame {...props} component={Component} />

export const Toggle: typeof Component & { Frame: typeof frameOf } = Object.assign(Component, { Frame: frameOf })