import React, { useEffect, useState } from "react";
import { InputProps } from "../../../../Input/Input";
import { useStyleBuilder } from "../../../../StyleBuilder";
import styles from "./Input.module.scss";

export const DefaultLightThemeInput: React.FC<InputProps> = ({
    value = "",
    onChange = () => { },
    label = "",
    error = null
}) => {
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

    return (
        <div {...styleBuilder.build()}>
            <input value={value} className={styles.input} onChange={(event) => onChange(event.target.value)} type="email" />
            <div className={styles.label}>{label}</div>
            <div className={styles.bottom}></div>
            <div className={styles.bottomSelected}></div>
            <div className={styles.errorLabel}>
                <div>{keepError}</div>
            </div>
        </div>
    )
}