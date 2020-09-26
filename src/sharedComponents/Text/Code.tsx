import React from "react"
import { useStyleBuilder } from "../StyleBuilder"
import { useTheme } from "../Theme/ThemeContext"
import { TextFrame } from "./TextFrame"

/** This component produces a code block, children are put inside a pre */
export let Code: typeof TextFrame = (props) => {
    const { fonts, colors, classes } = useTheme()
    return (
        <TextFrame font={fonts.monospace} p="a3" background={colors.code} {...props} {...useStyleBuilder(props).addClass(classes.round).build()} />
    )
}