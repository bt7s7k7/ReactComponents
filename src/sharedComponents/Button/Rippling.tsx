import React, { useCallback, useEffect, useRef } from "react"
import { colors } from "../constants"
import { Frame, FrameProps } from "../Grid/Frame"
import { BaseProps } from "../StyleBuilder"

export interface RipplePrototype {
    duration: number
    offset?: number
    lerpTo?: [number, number, number]
    trigger: "down" | "enter"
    keepAlive?: boolean
    radius?: number
    minRadius?: number
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

    let animRipples = useRef<{ prototype: RipplePrototype, start: number | null }[]>([])

    useEffect(() => {
        animRipples.current = ripples.map(v => ({ prototype: v, start: null }))
    }, [ripples])

    let animStart = useRef([0, 0])

    let animFrame = useRef(0)
    let animate = useCallback(() => {

        let toHex = (color: number[]) => "#" + color.map(v => Math.min(v, 255).toString(16).padStart(2, "0")).join("")

        let hexBaseColor = toHex(computedBaseColor.current)

        let output = [] as { color: string, offset: number }[]

        output.push({ color: hexBaseColor, offset: 0 })

        animRipples.current.forEach((ripple, i) => {
            if (ripple.start != null) {
                let frac = ((Date.now() - ripple.start) / 1000) / ripple.prototype.duration
                let offset = (ripple.prototype.minRadius ?? 10) + frac * (ripple.prototype.radius ?? 100)
                let otherColor = [0, 0, 0]
                if (ripple.prototype.lerpTo != null) {
                    otherColor = computedBaseColor.current.map((base, i) => {
                        let offset = (ripple.prototype.lerpTo![i] - base) * (frac)
                        return base + offset
                    })
                } else {
                    let add = (ripple.prototype.brighten ?? 50) * (1 - frac)
                    otherColor = computedBaseColor.current.map(v => v + Math.floor(add))
                }

                let hexColor = toHex(otherColor)

                if (frac > 1) {
                    if (ripple.prototype.keepAlive) {
                        frac = 1
                    } else {
                        ripple.start = null
                    }
                }

                output.push({ color: hexColor, offset: output[output.length - 1].offset })
                output.push({ color: hexColor, offset: offset })
            }
        })

        output.push({ color: hexBaseColor, offset: output[output.length - 1].offset })

        element.current!.style.background = `radial-gradient(circle at ${animStart.current[0]}px ${animStart.current[1]}px, ${output.map(v => `${v.color} ${v.offset}%`).join(", ")})`

        animFrame.current = requestAnimationFrame(animate)
    }, [])

    useEffect(() => {
        animFrame.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animFrame.current)
    }, [animate])

    let triggerHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, trigger: RipplePrototype["trigger"]) => {
        animRipples.current.forEach(v => v.prototype.trigger === trigger && (v.start = Date.now()))

        let rect = element.current!.getBoundingClientRect()

        animStart.current = [event.clientX - rect.x, event.clientY - rect.y]
    }

    return (
        <Frame {...props} ref={element} onMouseEnter={(event) => {
            if (props.onMouseEnter != null) props.onMouseEnter(event)
            triggerHandler(event, "enter")
        }} onMouseDown={event => {
            if (props.onMouseDown != null) props.onMouseDown(event)
            triggerHandler(event, "down")
        }} />
    )
}