import React from "react"
import { ButtonProps } from "../../../../Button/Button"
import { Frame } from "../../../../Grid/Frame"
import { useStyleBuilder } from "../../../../StyleBuilder"
import { TextStyle } from "../../../../Text/TextStyle"
import { useTheme } from "../../../ThemeContext"
import styles from "./Button.module.scss"
import { RipplePrototype, Rippling } from "./Rippling"

/**
 * Use this element to indicate a clickable area. Text of the button is provided as the children.
 */
export let DefaultWhiteThemeButton: React.FC<ButtonProps> = ({ shadow = true, children, bland, confirm, deny, round = false, baseColor, fab = false, ...props }) => {
    let theme = useTheme()
    let background = baseColor ?? (fab ? theme.colors.background : theme.colors.link)

    if (confirm) background = theme.colors.confirm
    if (deny) background = theme.colors.deny
    if (bland) background = theme.colors.background

    let styleBuilder = useStyleBuilder(props)
        .addClass(styles.button)

    if (round) styleBuilder.addClass(theme.classes.round)
    if (fab) styleBuilder.addClass(styles.fab)

    let ripples: RipplePrototype[] = [
        {
            trigger: "down",
            duration: 0.25
        }
    ]

    !fab && shadow && styleBuilder.addClass(theme.classes.shadow)
    props.className = styleBuilder.build().className

    return (
        <Rippling {...props} ripples={ripples} baseColor={background} {...styleBuilder.build()}>
            <Frame center={typeof children == "string"} p="a2">
                {typeof children == "string"
                    ? <TextStyle color={bland ? theme.colors.foreground : theme.colors.button} noSelect>
                        {children}
                    </TextStyle>
                    : children
                }
            </Frame>
        </Rippling>
    )
}