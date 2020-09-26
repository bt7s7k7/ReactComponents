export const Validators = {
    checked: (msg = "This field must be checked") => (value: boolean) => value ? null : msg,
    unchecked: (msg = "This field must not be checked") => (value: boolean) => !value ? null : msg,
    matchRegexp: (regexp: RegExp, msg = `Text must match ${regexp}`) => (value: string) => regexp.test(value) ? null : msg
}