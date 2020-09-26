import React from "react"
import { classes, colors, fonts } from "../constants"
import { StyleBuilder } from "../StyleBuilder"
import { TextFrame } from "./TextFrame"

/** This component produces a code block, children are put inside a pre */
export let Code: typeof TextFrame = (props) => {
    return (
        <TextFrame font={fonts.monospace} p="a3" background={colors.code} {...props} {...new StyleBuilder(props).addClass(classes.round).build()} />
    )
}