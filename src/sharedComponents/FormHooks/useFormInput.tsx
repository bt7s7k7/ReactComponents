import React, { useCallback, useState } from "react";
import { IValidator } from "./IValidator";

export interface FormComponentProps<T> {
    value?: T
    onChange?: (newValue: T) => void,
    error?: string | null,
    label?: string
}

type ComponentValueType<T> = T extends React.ComponentType<FormComponentProps<infer P>> ? P : any
type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : any

export interface IUseFormInputOptions<T extends React.ComponentType<FormComponentProps<any>>> {
    validators?: IValidator<ComponentValueType<T>>[],
    props?: ComponentProps<T>
}

/** 
 * Creates a controlled form component with the provided component, keeping state and error information.
 * @returns [HookedComponent, state, setState, error, setError]
 */
export function useFormInput<T extends React.ComponentType<FormComponentProps<any>>>(Component: T, defaultValue: ComponentValueType<T>, label: string, { validators = [], props }: IUseFormInputOptions<T> = {}) {
    const [state, setState] = useState(defaultValue)
    const [error, setError] = useState<string | null>(null)

    const setStateAndValidate = useCallback((value: ComponentValueType<T>) => {
        let error = null
        for (let validator of validators) {
            let result = validator(value)
            if (typeof result == "string") {
                error = result
                break
            }
        }

        setError(error)
        setState(value)
    }, [validators])

    const result = {
        // @ts-ignore
        Component: <Component {...props} value={state} onChange={setStateAndValidate} error={error} label={label} />,
        state,
        setState: setStateAndValidate,
        error,
        setError,
    }

    const resultArray = [
        result.Component,
        result.state,
        result.setState,
        result.error,
        result.setError
    ] as const

    return Object.assign(resultArray, result) as typeof result & typeof resultArray
}