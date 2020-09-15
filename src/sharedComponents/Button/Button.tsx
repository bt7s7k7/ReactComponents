import React from "react"
import { colors } from "../constants"
import { FrameProps } from "../Grid/Frame"
import { TextStyle } from "../Text/TextStyle"
import styles from "./Button.module.scss"
import { Rippling, RipplingProps } from "./Rippling"

export interface ButtonProps extends RipplingProps {
    confirm?: boolean
    deny?: boolean
}

export let Button: React.FC<ButtonProps> = ({ children, confirm, deny, baseColor, ...props }) => {

    let background: FrameProps["background"] = baseColor ?? colors.link

    if (confirm) background = colors.confirm
    if (deny) background = colors.delete

    props.ripples = props.ripples ?? [
        {
            trigger: "down",
            duration: 0.5
        }
    ]

    props.className = (props.className ?? "") + " " + styles.button

    return (
        <Rippling {...props} p="a2" baseColor={background} >
            <TextStyle color={colors.button} noSelect>
                {children}
            </TextStyle>
        </Rippling>
    )
}