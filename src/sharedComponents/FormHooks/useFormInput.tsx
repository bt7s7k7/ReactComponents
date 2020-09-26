import React, { useCallback, useState } from "react";
import { IValidator } from "./IValidator";

export interface FormComponentProps<T> {
    value?: T
    onChange?: (newValue: T) => void,
    error?: string | null,
    label?: string
}

/** 
 * Creates a controlled form component with the provided component, keeping state and error information.
 * @returns [HookedComponent, state, setState, error, setError]
 */
export function useFormInput<T>(Component: React.ComponentType<FormComponentProps<T>>, defaultValue: T, label: string, validators: IValidator<T>[] = []) {
    const [state, setState] = useState(defaultValue)
    const [error, setError] = useState<string | null>(null)

    const setStateAndValidate = useCallback((value: T) => {
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
        Component: <Component value={state} onChange={setStateAndValidate} error={error} label={label} />,
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