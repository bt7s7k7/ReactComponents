import React, { useCallback, useEffect, useRef } from "react"
import { colors } from "../constants"
import { Frame, FrameProps } from "../Grid/Frame"
import { BaseProps } from "../StyleBuilder"

export interface RipplePrototype {
    duration: number
    lerpTo?: [number, number, number]
    trigger: "down" | "enter"
    keepAlive?: boolean
    /** @default 100 */
    radius?: number
    /** @default 10 */
    minRadius?: number
    /** @default 50 */
    brighten?: number
}

export interface RipplingProps extends Omit<FrameProps, "background">, BaseProps {
    baseColor?: string,
    ripples?: RipplePrototype[]
}

export let Rippling: React.FC<RipplingProps> = ({ baseColor = colors.link, ripples = [], ...props }) => {

    let element = useRef<HTMLDivElement>(null)

    let computedBaseColor = useRef([0, 0, 0])

    useEffect(() => {
        if (element.current != null) {
            let base = baseColor
            if (base.startsWith("var")) {
                let computed = getComputedStyle(element.current)
                base = computed.getPropertyValue(base.substr(4, base.length - 4 - 1)).trim()
            }

            let color = [
                parseInt(base.substr(1, 2), 16),
                parseInt(base.substr(3, 2), 16),
                parseInt(base.substr(5, 2), 16)
            ]

            computedBaseColor.current = color
        }
    }, [baseColor])

    let animRipples = useRef<{ prototype: RipplePrototype, start: number | null, keepAliveOverride: number | null }[]>([])

    let animStart = useRef([0, 0])

    let animFrame = useRef(0)
    let animate = useCallback(() => {

        let toHex = (color: number[]) => "#" + color.map(v => Math.min(v, 255).toString(16).padStart(2, "0")).join("")

        let hexBaseColor = toHex(computedBaseColor.current)

        let output = [] as { color: number[], hexColor: string, offset: number }[]

        output.push({ hexColor: hexBaseColor, offset: 0, color: computedBaseColor.current })

        animRipples.current = animRipples.current.filter((ripple, i) => {
            if (ripple.start != null) {
                let baseColor = computedBaseColor.current
                let frac = ((Date.now() - ripple.start) / 1000) / ripple.prototype.duration
                let otherColor = [0, 0, 0]
                let colorFrac = ripple.prototype.keepAlive ? (ripple.keepAliveOverride != null ? ((Date.now() - ripple.keepAliveOverride) / 1000) / ripple.prototype.duration : 0) : frac
                if (ripple.prototype.lerpTo != null) {
                    otherColor = baseColor.map((base, i) => {
                        return Math.floor(base * (colorFrac) + ripple.prototype.lerpTo![i] * (1 - colorFrac))
                    })
                } else {
                    let add = (ripple.prototype.brighten ?? 50) * (1 - colorFrac)
                    otherColor = baseColor.map(v => v + Math.floor(add))
                }

                let hexColor = toHex(otherColor)

                if (frac > 1) {
                    if (ripple.prototype.keepAlive) {
                        frac = 1
                    } else {
                        ripple.start = null
                    }
                }

                if (colorFrac > 1) {
                    ripple.start = null
                }
                let offset = (ripple.prototype.minRadius ?? 10) + frac * (ripple.prototype.radius ?? 100)

                output.push({ color: otherColor, hexColor: hexColor, offset: output[output.length - 1].offset })
                output.push({ color: otherColor, hexColor: hexColor, offset: offset })
            }

            return ripple.start != null
        })

        output.push({ hexColor: hexBaseColor, offset: output[output.length - 1].offset, color: computedBaseColor.current })

        element.current!.style.background = `radial-gradient(circle at ${animStart.current[0]}px ${animStart.current[1]}px, ${output.map(v => `${v.hexColor} ${v.offset}%`).join(", ")})`

        animFrame.current = requestAnimationFrame(animate)
    }, [])

    useEffect(() => {
        animFrame.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animFrame.current)
    }, [animate])

    let triggerHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, trigger: RipplePrototype["trigger"]) => {
        ripples.forEach(ripple => {
            if (ripple.trigger === trigger) {
                animRipples.current.unshift({ prototype: ripple, start: Date.now(), keepAliveOverride: null })
            }
        })

        let rect = element.current!.getBoundingClientRect()

        animStart.current = [event.clientX - rect.x, event.clientY - rect.y]
    }

    return (
        <Frame {...props} ref={element} onMouseEnter={(event) => {
            if (props.onMouseEnter != null) props.onMouseEnter(event)
            triggerHandler(event, "enter")
        }} onMouseDown={event => {
            event.preventDefault()
            if (props.onMouseDown != null) props.onMouseDown(event)
            triggerHandler(event, "down")
        }} onMouseLeave={(event) => {
            if (props.onMouseLeave) props.onMouseLeave(event)

            animRipples.current.forEach(v => v.prototype.trigger === "enter" && v.prototype.keepAlive && v.keepAliveOverride == null && (v.keepAliveOverride = Date.now()))
        }} />
    )
}