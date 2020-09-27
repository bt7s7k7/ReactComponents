export const Validators = {
    checked: (msg = "This field must be checked") => (value: boolean) => value ? null : msg,
    unchecked: (msg = "This field must not be checked") => (value: boolean) => !value ? null : msg,
    matchRegexp: (regexp: RegExp, msg = `Text must match ${regexp}`) => (value: string) => regexp.test(value) ? null : msg,
    number: (msg = "This field must be a number") => (value: string) => /^[+-]?\d*(\.\d+)?([eE][+-]?\d+(\.\d+)?)?$/.test(value) ? null : msg,
    integer: (msg = "This field must be a number") => (value: string) => /^\d+$/.test(value) ? null : msg,
}