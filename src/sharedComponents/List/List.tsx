import React from "react"
import { FormComponentProps } from "../FormHooks/useFormInput"
import { TextStyle } from "../Text/TextStyle"
import styles from "./List.module.scss"

export interface ListItem {
    key: string,
    label: string | ((v: ListItem) => JSX.Element)
}

export interface ListProps extends FormComponentProps<string | null> {
    list?: ListItem[],
    render?: (value: ListItem, index: number, key: string, handleClick: () => void, isActive: boolean) => JSX.Element,
}

export let List = ({
    list = [],
    render = (v, i, k, handleClick, isActive) => (
        <button key={k} className={styles.element + (isActive ? " " + styles.active : "")} onClick={handleClick}>
            {typeof v.label == "function" ? v.label(v) :
                <TextStyle>
                    {v.label}
                </TextStyle>
            }
        </button>
    ),
    onChange = () => { },
    value: selected = null,
    error = null,
}: ListProps) => {

    return (
        <div className={styles.container}>
            {list.map((value, index) => {
                const handleClick = () => {
                    if (selected === value.key) {
                        onChange(null)
                    } else {
                        onChange(value.key)
                    }
                }

                return render(value, index, value.key, handleClick, selected === value.key)
            })}
        </div>
    )
}