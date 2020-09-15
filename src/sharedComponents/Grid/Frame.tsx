import React from "react"
import { StyleableProps, StyleBuilder } from "../StyleBuilder"
import styles from "./Frame.module.scss"

export interface FrameProps extends StyleableProps {
    basis?: React.CSSProperties["flexBasis"]
    grow?: React.CSSProperties["flexGrow"]
    shrink?: React.CSSProperties["flexShrink"]
    fill?: boolean
    alignCross?: React.CSSProperties["alignItems"]
    alignMain?: React.CSSProperties["justifyContent"]
    direction?: React.CSSProperties["flexDirection"],
    center?: boolean,
    color?: React.CSSProperties["backgroundColor"],
    p?: string
    m?: string
}

export function parseDirectionalProp(prop: string | null) {
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
            return `calc(${top} * var(--gap-size)) ` +
                `calc(${right} * var(--gap-size)) ` +
                `calc(${bottom} * var(--gap-size)) ` +
                `calc(${left} * var(--gap-size)) `
        } else return null
    } else return null
}

export let Frame: React.FC<FrameProps> = ({
    children,
    basis = null,
    grow = null,
    shrink = null,
    fill = false,
    alignCross = null,
    alignMain = null,
    direction = null,
    color = null,
    center = false,
    p: padding = null,
    m: margin = null,
    ...props
}) => {
    var styleBuilder = new StyleBuilder(props)
        .addStyle("flexDirection", direction)
        .addStyle("flexBasis", basis)
        .addStyle("flexGrow", grow)
        .addStyle("justifyContent", alignMain)
        .addStyle("alignItems", alignCross)
        .addStyle("backgroundColor", color)
        .addStyle("padding", parseDirectionalProp(padding))
        .addStyle("margin", parseDirectionalProp(margin))

    styleBuilder.addClass(styles.frame)

    if (fill) {
        styleBuilder.addClass(styles.fill)
    }

    if (center) {
        styleBuilder.addClass(styles.center)
    }


    return <div {...props} {...styleBuilder.build()}>{children}</div>
}

