import React, { useLayoutEffect, useRef, useState } from "react";
import { Frame } from "../Grid/Frame";
import { FormInput } from "./useFormInput";

export type FormResult<T extends Record<string, FormInput<any>>> = { [P in keyof T]: T[P]["state"] }

export function useForm<T extends Record<string, FormInput<any>>>(inputs: T, onSubmit: (result: FormResult<T>) => void = () => { }) {
    let entries = Object.entries(inputs)
    let element = useRef<HTMLFormElement | null>(null)
    let [valid, setValid] = useState(true)

    let newValid = true

    entries.forEach(([, { error }]) => error != null && (newValid = false))

    let validRef = useRef(true)

    useLayoutEffect(() => {
        let formValid = newValid && element.current!.checkValidity()

        formValid !== valid && setValid(formValid)

        validRef.current = formValid
    }, [newValid, entries, valid])


    const makeResult = () => Object.assign({}, ...entries.map(([name, { state }]) => ({ [name]: state }))) as FormResult<T>

    const validate = async () => {
        entries.forEach(([, { state, setState }]) => setState(state))
        setTimeout(() => {
            let valid = validRef.current
            alert(valid)
        }, 1)
    }

    const handleSubmit = () => {
        validate()
    }

    let jsxElement = (
        <form
            onSubmit={event => {
                event.preventDefault()
                handleSubmit()
            }}
            onKeyDown={event => {
                if (event.key === "Enter") {
                    handleSubmit()
                }
            }}
            ref={element}
        >
            {entries.map(([key, { element }]) => (
                <Frame key={key}>
                    {element}
                </Frame>
            ))}
        </form>
    )

    return [jsxElement, makeResult(), handleSubmit, valid] as const
}