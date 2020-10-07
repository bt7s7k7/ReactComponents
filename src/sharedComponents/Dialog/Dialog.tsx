import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { concatClasses } from ".."
import { Frame, FrameProps } from "../Grid/Frame"
import { Theme } from "../Theme/Theme"
import styles from "./Dialog.module.scss"

export interface DialogProps extends FrameProps {
    onClose?: () => void,
    round?: boolean
}

export let Dialog: React.FC<DialogProps> = ({ className, round = true, onClose = () => { }, ...props }) => {
    const backdrop = useRef<HTMLDivElement>(null)
    const frame = useRef<HTMLDivElement>(null)

    useEffect(() => {
        backdrop.current?.classList.add(styles.active)
        frame.current?.classList.add(styles.active)
    }, [])

    return createPortal((
        <Frame direction="row" ref={backdrop} onClick={() => onClose()} center className={concatClasses(styles.parent)}>
            <Frame ref={frame} onClick={event => event.stopPropagation()} background className={concatClasses(className, styles.dialog, round && Theme.classes.round)} p="a5" {...props} />
        </Frame>
    ), document.body)
}