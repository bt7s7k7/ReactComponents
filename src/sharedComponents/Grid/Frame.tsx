import React, { forwardRef } from "react"
import { StyleableProps, useStyleBuilder } from "../StyleBuilder"
import { useTheme } from "../Theme/ThemeContext"
import styles from "./Frame.module.scss"

export interface FrameProps extends StyleableProps, React.DOMAttributes<HTMLDivElement> {
    basis?: React.CSSProperties["flexBasis"]
    grow?: React.CSSProperties["flexGrow"]
    shrink?: React.CSSProperties["flexShrink"]
    fill?: boolean
    alignCross?: React.CSSProperties["alignItems"]
    alignMain?: React.CSSProperties["justifyContent"]
    direction?: React.CSSProperties["flexDirection"],
    center?: boolean,
    background?: React.CSSProperties["background"] | boolean,
    p?: string
    m?: string,
    b?: string,
    children?: React.ReactNode,
    component?: React.ComponentType<StyleableProps>
}

export function parseDirectionalProp(prop: string | null, value = "var(--gap-size)") {
    if (prop != null) {
        let top = 0
        let right = 0
        let bottom = 0
        let left = 0

        let directions = {
            t: (a) => top = a,
            b: (a) => bottom = a,
            l: (a) => left = a,
            r: (a) => right = a,
            x: (a) => { left = a; right = a },
            y: (a) => { top = a; bottom = a },
            a: (a) => { top = a; bottom = a; left = a; right = a },
        } as Record<string, (amount: number) => void>

        for (let i = 0; i < prop.length; i += 2) {
            let axis = prop[i]
            let amount = prop[i + 1]
            if (axis != null && amount != null) {
                let amountNum = parseInt(amount)
                if (!isNaN(amountNum)) {
                    let func = directions[axis]
                    if (func != null) func(amountNum)
                    else throw new Error(`Failed to parse dir prop, axis "${axis}" not found at ${i}`)
                } else throw new Error(`Failed to parse dir prop, amount (${amount}) is not a number at ${i}`)
            }
        }

        if (top !== 0 || right !== 0 || bottom !== 0 || left !== 0) {
            if (top === right && right === bottom && bottom === left) {
                return `calc(${top} * ${value}) `
            } else {
                return `calc(${top} * ${value}) ` +
                    `calc(${right} * ${value}) ` +
                    `calc(${bottom} * ${value}) ` +
                    `calc(${left} * ${value}) `
            }
        } else return null
    } else return null
}

export function parseBorder(prop: string | null, borderValue = "var(--border)") {
    if (prop != null) {
        let top = false
        let right = false
        let bottom = false
        let left = false

        let valNext = true

        let directions = {
            t: () => top = valNext,
            r: () => right = valNext,
            b: () => bottom = valNext,
            l: () => left = valNext,
            x: () => left = right = valNext,
            y: () => top = bottom = valNext,
            a: () => top = bottom = right = left = valNext
        } as Record<string, () => void>

        [...prop].forEach((ch, i) => {
            if (ch === "!") {
                valNext = false
            } else if (ch in directions) {
                directions[ch]()
                valNext = true
            } else {
                throw new Error(`Unknown axis "${ch}" at ${i}`)
            }
        })
        if (top || right || bottom || left) {
            return {
                borderTop: top ? borderValue : "none",
                borderRight: right ? borderValue : "none",
                borderBottom: bottom ? borderValue : "none",
                borderLeft: left ? borderValue : "none",
            }
        } else return null
    } else return null
}

export let Frame = forwardRef<HTMLDivElement, FrameProps>(function Frame({
    children,
    basis = null,
    grow = null,
    shrink = null,
    fill = false,
    alignCross = null,
    alignMain = null,
    direction = null,
    background = null,
    center = false,
    p: padding = null,
    m: margin = null,
    b: border = null,
    component: Component = null,
    ...props
}, ref) {
    const { colors } = useTheme()

    var styleBuilder = useStyleBuilder(props)
        .addStyle("flexDirection", direction)
        .addStyle("flexBasis", basis)
        .addStyle("flexGrow", grow)
        .addStyle("justifyContent", alignMain)
        .addStyle("alignItems", alignCross)
        .addStyle("background", typeof background === "boolean" ? (background ? colors.background : null) : (background))
        .addStyle("padding", parseDirectionalProp(padding))
        .addStyle("margin", parseDirectionalProp(margin))
        .addStyles(parseBorder(border))

    styleBuilder.addClass(styles.frame)

    if (fill) {
        styleBuilder.addClass(styles.fill)
    }

    if (center) {
        styleBuilder.addClass(styles.center)
    }

    if (Component != null) {
        let { className: _ignore, style: _, ...childProps } = props

        return <Component {...styleBuilder.build()} {...childProps}>{children}</Component>
    } else {
        return <div {...styleBuilder.build()} ref={ref}>{children}</div>
    }
})

