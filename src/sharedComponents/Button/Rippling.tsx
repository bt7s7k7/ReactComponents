import React, { useCallback, useEffect, useRef } from "react"
import { colors } from "../constants"
import { Frame, FrameProps } from "../Grid/Frame"
import { BaseProps } from "../StyleBuilder"

export interface RipplePrototype {
    /** How long till the animation ends in seconds */
    duration: number
    /** Which color should the ripple have. When set disables `.brighten`
     *  @default null
     */
    lerpTo?: [number, number, number]
    /** What action should trigger this animation */
    trigger: "down" | "enter"
    /** Should the animation continue after `.duration`. Doesn't work with `.trigger == "down"`
     * @default false
     */
    keepAlive?: boolean
    /** Radius of the finished animation in percentage
     *  @default 100 */
    radius?: number
    /** Starting radius of the animation in percentage 
     * @default 10 */
    minRadius?: number
    /** Amount to brighten the base color by in RGB values (0 - 255) 
     * @default 50 */
    brighten?: number
}

export interface RipplingProps extends Omit<FrameProps, "background">, BaseProps {
    baseColor?: string,
    ripples?: RipplePrototype[]
}

/** Use this element to create an area with rippling waves just as the `Button` has. */
export let Rippling: React.FC<RipplingProps> = ({ baseColor = colors.link, ripples = [], ...props }) => {

    let element = useRef<HTMLDivElement>(null)

    let computedBaseColor = useRef([0, 0, 0])

    useEffect(() => { // Computing the actual value of the baseColor, which could be a CSS variable
        if (element.current != null) {
            let base = baseColor
            if (base.startsWith("var")) { // If it's a variable resolve it 
                let computed = getComputedStyle(element.current)
                base = computed.getPropertyValue(base.substr(4, base.length - 4 - 1)).trim()
            }

            let color = [ // Parse the hex color string
                parseInt(base.substr(1, 2), 16),
                parseInt(base.substr(3, 2), 16),
                parseInt(base.substr(5, 2), 16)
            ]

            computedBaseColor.current = color
        }
    }, [baseColor])

    /** All active ripples */
    let animRipples = useRef<{
        /** Prototype of the ripple */
        prototype: RipplePrototype,
        /** When the ripple has started, set to null to delete the ripple */
        start: number | null,
        /** When the ripple started to end (when `keepAlive` == true). 
         * 
         *  For example if `trigger` == "enter" and then the mouse leaves 
         * */
        keepAliveOverride: number | null
    }[]>([])

    /** Start location of the animation / ripples relative to the element */
    let animStart = useRef([0, 0])
    /** Current requestAnimationFrame id we will have to clean up */
    let animFrame = useRef(0)
    let animate = useCallback(() => {

        let toHex = (color: number[]) => "#" + color.map(v => Math.min(v, 255).toString(16).padStart(2, "0")).join("")

        let hexBaseColor = toHex(computedBaseColor.current)
        /** Array of all ripples */
        let output = [] as { color: number[], hexColor: string, offset: number }[]
        // Push the center, because if no ripples active there will be only one keyframe for the gradient 
        output.push({ hexColor: hexBaseColor, offset: 0, color: computedBaseColor.current })

        animRipples.current = animRipples.current.filter((ripple, i) => {
            if (ripple.start != null) {
                let baseColor = computedBaseColor.current
                /** Fraction (0 - 1) of the animation finished */
                let frac = ((Date.now() - ripple.start) / 1000) / ripple.prototype.duration
                /** Color of the ripple */
                let otherColor = [0, 0, 0]
                /** Fraction adjusted for keepAlive and keepAliveOverride */
                let colorFrac = ripple.prototype.keepAlive ? (ripple.keepAliveOverride != null ? ((Date.now() - ripple.keepAliveOverride) / 1000) / ripple.prototype.duration : 0) : frac

                // Calculate the color of the ripple
                if (ripple.prototype.lerpTo != null) { // lerpTo
                    otherColor = baseColor.map((base, i) => {
                        return Math.floor(base * (colorFrac) + ripple.prototype.lerpTo![i] * (1 - colorFrac))
                    })
                } else { // brighten
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

                /** Calculate the percentage to use in the gradient */
                let offset = (ripple.prototype.minRadius ?? 10) + frac * (ripple.prototype.radius ?? 100)

                // Mark the end of the previous ripple
                output.push({ color: otherColor, hexColor: hexColor, offset: output[output.length - 1].offset })
                // Mark the end of our ripple
                output.push({ color: otherColor, hexColor: hexColor, offset: offset })
            }
            // When start == null delete this ripple
            return ripple.start != null
        })

        // Push the baseColor to be the outer keyframe of the gradient to set the rest of the background to be the baseColor
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