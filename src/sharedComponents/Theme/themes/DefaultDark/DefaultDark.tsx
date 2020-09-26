import { IThemeDefinition } from "../../IThemeDefinition"
import { DefaultLight } from "../DefaultLight/DefaultLight"
import styles from "./DefaultDark.module.scss"

export const DefaultDark: IThemeDefinition = {
    ...DefaultLight,
    className: DefaultLight.className + " " + styles.theme
}