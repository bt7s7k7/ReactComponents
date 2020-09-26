import React, { useCallback, useMemo, useRef } from "react"
import { useStyleBuilder } from "../../../../StyleBuilder"
import { ToggleProps } from "../../../../Toggle/Toggle"
import styles from "./Toggle.module.scss"

export let DefaultLightThemeToggle: React.FC<ToggleProps> = ({
    value = false,
    onChange = () => { },
    error = null,
    label = ""
}) => {
    let id = useMemo(() => Math.random(), []).toString().substr(2)
    let checkbox = useRef<HTMLInputElement>(null)

    const styleBuilder = useStyleBuilder({})
        .addClass(styles.toggle)
        .addClass(styles.background)
        .addClass(value && styles.active)
        .addClass(error && styles.error)

    const handleClick = useCallback(() => { onChange(!value); checkbox.current!.focus() }, [value, onChange])

    return (
        <div id={id} {...styleBuilder.build()} onClick={handleClick}>
            <div className={styles.background + " " + styles.color}></div>
            <div className={styles.knob}></div>
            <input className={styles.hidden} type="checkbox" checked={value} ref={checkbox} onChange={handleClick} />
            <div className={styles.text + " " + styles.label}>{label}</div>
            <div className={styles.text + " " + styles.errorLabel}>
                <div>{error}</div>
            </div>
        </div>
    )
}