import { StyleableProps } from "./StyleBuilder";

export const auto = Symbol("auto")

type ClassArray = Exclude<StyleableProps["className"], string | undefined>
export function concatClasses(...classes: StyleableProps["className"][]): ClassArray {
    return [...classes.map(className => className instanceof Array ? className : [className]).flat()]
}