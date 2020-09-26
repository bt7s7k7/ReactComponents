import React from "react"
import { classes, colors } from "../constants"
import { FrameProps } from "../Grid/Frame"
import { StyleBuilder } from "../StyleBuilder"
import { TextStyle } from "../Text/TextStyle"
import styles from "./Button.module.scss"
import { Rippling, RipplingProps } from "./Rippling"

export interface ButtonProps extends RipplingProps {
    /** Is the button a confirm button (should it be green?) */
    confirm?: boolean
    /** Is the button a deny/delete button (should it be red?) */
    deny?: boolean
    /** Is the button round */
    round?: boolean
}

/**
 * Use this element to indicate a clickable area. Text of the button is provided as the children.
 */
export let Button: React.FC<ButtonProps> = ({ children, confirm, deny, round = false, baseColor, ...props }) => {

    let background: FrameProps["background"] = baseColor ?? colors.link

    if (confirm) background = colors.confirm
    if (deny) background = colors.delete

    let styleBuilder = new StyleBuilder(props)
        .addClass(styles.button)

    if (round) styleBuilder.addClass(classes.round)

    props.ripples = props.ripples ?? [
        {
            trigger: "down",
            duration: 0.25
        }
    ]

    styleBuilder.addClass(classes.shadow)
    props.className = styleBuilder.build().className

    return (
        <Rippling center {...props} p="a2" baseColor={background} >
            <TextStyle color={colors.button} noSelect>
                {children}
            </TextStyle>
        </Rippling>
    )
}