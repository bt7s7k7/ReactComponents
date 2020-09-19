import React, { useEffect, useRef } from "react"
import { colors } from "../constants"
import styles from "./LoadingIndicator.module.scss"

export interface LoadingIndicatorProps {
    duration?: number
    radius?: number
    background?: string
    backgroundError?: string
    dotSize?: number
    error?: boolean
}

export let LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
    duration = 0.6,
    radius = 50,
    background = colors.foreground,
    backgroundError = colors.delete,
    dotSize = 10,
    error = false
}) => {
    let container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        container.current?.style.setProperty("--anim-duration", duration + "s")
        container.current?.style.setProperty("--anim-radius", radius + "px")
        container.current?.style.setProperty("--anim-background", background)
        container.current?.style.setProperty("--anim-error", backgroundError)
        container.current?.style.setProperty("--anim-dot", dotSize + "px")
    }, [duration, radius, background, dotSize, backgroundError])

    useEffect(() => {
        if (!container.current) return
        const children = [...container.current!.childNodes].map(v => v.firstChild! as HTMLDivElement).filter(v => v != null && "setAttribute" in v)
        if (error) {
            const initPos = container.current!.getBoundingClientRect()
            const childPositions = children.map(v => v.getBoundingClientRect())
            const diffs = childPositions.map((v) => ({ x: v.x - initPos.x + dotSize / 2, y: v.y - initPos.y + dotSize / 2 }))
            const translates = diffs.map(v => `translate(${v.x}px, ${v.y}px)`)
            children.forEach((child, i) => {
                const translate = translates[i]
                child.setAttribute("style", `animation: none; transform: ${translate}; transition: transform 0.2s ease-in-out; transition-delay: ${i * 0.1}s`)
                setTimeout(() => {
                    child.style.removeProperty("transform")
                }, 1)
            })

        } else {
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