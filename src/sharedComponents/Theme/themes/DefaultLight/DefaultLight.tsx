import { IThemeDefinition } from "../../IThemeDefinition";
import { DefaultWhiteThemeButton } from "./Button/Button";
import styles from "./DefaultLight.module.scss";
import { DefaultWhiteThemeImageView } from "./Image/Image";
import { DefaultWhiteThemeLoadingIndicator } from "./LoadingIndicator/LoadingIndicator";
import { DefaultLightThemeToggle } from "./Toggle/Toggle";

export const DefaultLight: IThemeDefinition = {
    colors: {
        hover: "var(--hover-color)",
        active: "var(--active-color)",
        confirm: "var(--confirm-color)",
        deny: "var(--delete-color)",
        link: "var(--link-color)",
        background: "var(--background-color)",
        foreground: "var(--foreground-color)",
        button: "var(--button-color)",
        code: "var(--code-color)",
        error: "var(--error-color)"
    },
    textSizes: {
        normal: "var(--normal-text-size)",
        heading: "var(--heading-text-size)",
        header: "var(--header-text-size)",
    },
    fonts: {
        normal: "var(--normal-font)",
        monospace: "var(--monospace-font)",
        serif: "var(--serif-font)",
    },
    classes: {
        shadow: styles.shadow,
        round: styles.round
    },
    components: {
        Button: DefaultWhiteThemeButton,
        ImageView: DefaultWhiteThemeImageView,
        LoadingIndicator: DefaultWhiteThemeLoadingIndicator,
        Toggle: DefaultLightThemeToggle
    },
    className: styles.theme
}