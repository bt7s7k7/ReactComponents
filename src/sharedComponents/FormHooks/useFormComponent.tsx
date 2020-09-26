import React, { useState } from "react";

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
export function useFormComponent<T>(Component: React.ComponentType<FormComponentProps<T>>, defaultValue: T, label: string = "") {
    const [state, setState] = useState(defaultValue)
    const [error, setError] = useState<string | null>(null)

    return [
        <Component value={state} onChange={setState} error={error} label={label} />,
        state,
        setState,
        error,
        setError
    ] as const
}