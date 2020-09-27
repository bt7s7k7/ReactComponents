import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { InputProps } from "../../../../Input/Input";
import { useStyleBuilder } from "../../../../StyleBuilder";
import styles from "./Input.module.scss";

export const DefaultLightThemeInput: React.FC<InputProps> = ({
    value = "",
    onChange = () => { },
    label = "",
    error = null,
    type = "text",
    autocomplete = "off",
    pattern
}) => {
    let element = useRef<HTMLInputElement | null>(null)
    let [validationError, setValidationError] = useState<string | null>(null)

    error = error ?? validationError

    let styleBuilder = useStyleBuilder({})
        .addClass(styles.container)
        .addClass(value !== "" && styles.active)
        .addClass(error != null && styles.error)

    let [keepError, setKeepError] = useState(error)

    useEffect(() => {
        if (error) {
            setKeepError(error)
        }
    }, [error])

    useLayoutEffect(() => {
        let message = element.current?.validationMessage
        if (message == null || message === "") setValidationError(null)
        else setValidationError(message)
    }, [value])

    return (
        <div {...styleBuilder.build()}>
            <input
                type={type}
                ref={element}
                autoComplete={autocomplete}
                value={value}
                className={styles.input}
                pattern={typeof pattern == "object" ? pattern.toString() : pattern}
                onChange={(event) => onChange(event.target.value)}
            />
            <div className={styles.label}>{label}</div>
            <div className={styles.bottom}></div>
            <div className={styles.bottomSelected}></div>
            <div className={styles.errorLabel}>
                <div>{keepError}</div>
            </div>
        </div>
    )
}