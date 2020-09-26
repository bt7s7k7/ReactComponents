import React, { useEffect, useRef } from "react"
import { colors } from "../constants"
import styles from "./LoadingIndicator.module.scss"

export interface LoadingIndicatorProps {
    /** Duration in seconds of the loading animation 
     *  @default 0.6 */
    duration?: number
    /** Radius in pixels of the loading animation 
     *  @default 50
     */
    radius?: number
    /** Background style of the dots in the loading animation
     *  @default colors.foreground
     */
    background?: string
    /** Background style of the dots in the loading animation in the error state
     *  @default colors.delete
    */
    backgroundError?: string
    /** Size (not radius) in pixels of the dots in the loading animation 
     *  @default 10
     */
    dotSize?: number
    /** Is the error state active? 
     *  @default false
     */
    error?: boolean
}

/**
 * This elements shows a loading animation. Can also indicate an error using the `error` property.
 */
export let LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
    duration = 0.6,
    radius = 50,
    background = colors.foreground,
    backgroundError = colors.delete,
    dotSize = 10,
    error = false
}) => {
    let container = useRef<HTMLDivElement>(null)

    useEffect(() => { // Setting the CSS variables
        container.current?.style.setProperty("--anim-duration", duration + "s")
        container.current?.style.setProperty("--anim-radius", radius + "px")
        container.current?.style.setProperty("--anim-background", background)
        container.current?.style.setProperty("--anim-error", backgroundError)
        container.current?.style.setProperty("--anim-dot", dotSize + "px")
    }, [duration, radius, background, dotSize, backgroundError])

    useEffect(() => { // Transition from animation
        if (!container.current) return
        const children = [...container.current!.childNodes].map(v => v.firstChild! as HTMLDivElement).filter(v => v != null && "setAttribute" in v)
        if (error) {
            /** Position of the container element */
            const initPos = container.current!.getBoundingClientRect()
            const childPositions = children.map(v => v.getBoundingClientRect())
            /** Offsets of the children from container */                /* ↓ `dotSize` added to counteract the offset in the styles */
            const diffs = childPositions.map((v) => ({ x: v.x - initPos.x + dotSize / 2, y: v.y - initPos.y + dotSize / 2 }))
            /** CSS transform values to translate the children to their location they had during animation */
            const translates = diffs.map(v => `translate(${v.x}px, ${v.y}px)`)
            children.forEach((child, i) => {
                const translate = translates[i]
                // Disable the animation and set the position, the child would have had if animated, enable the transition (staggered by child index to look better)
                child.setAttribute("style", `animation: none; transform: ${translate}; transition: transform 0.2s ease-in-out; transition-delay: ${i * 0.1}s`)
                setTimeout(() => {
                    // Remove the transform to start the transition to the original location
                    child.style.removeProperty("transform")
                }, 1)
            })

        } else { // Clear all changes when error is cleared
            container.current!.style.removeProperty("transform")
            children.forEach((child, i) => {
                child.removeAttribute("style")
            })
        }
    }, [error, dotSize])

    return (
        <>
            <div ref={container} className={(error ? styles.error + " " : "") + styles.container}>
                <div className={styles.alpha + " " + styles.dot}>
                    <div></div>
                </div>
                <div className={styles.beta + " " + styles.dot}>
                    <div></div>
                </div>
                <div className={styles.gamma + " " + styles.dot}>
                    <div></div>
                </div>
                <div className={styles.exclamation}>!</div>
            </div>
        </>
    )
}