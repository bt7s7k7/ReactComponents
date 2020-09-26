export const Validators = {
    checked: (msg = "This field must be checked") => (value: boolean) => value ? null : msg,
    unchecked: (msg = "This field must not be checked") => (value: boolean) => !value ? null : msg,
}