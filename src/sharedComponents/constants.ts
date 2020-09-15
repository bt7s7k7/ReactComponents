import styles from "./index.module.scss"
export const colors = {
    hover: "var(--hover-color)",
    active: "var(--active-color)",
    confirm: "var(--confirm-color)",
    delete: "var(--delete-color)",
    link: "var(--link-color)",
    background: "var(--background-color)",
    foreground: "var(--foreground-color)",
    button: "var(--button-color)",
    code: "var(--code-color)"
} as const

export const textSizes = {
    normal: "var(--normal-text-size)",
    heading: "var(--heading-text-size)",
    header: "var(--header-text-size)",
} as const

export const fonts = {
    normal: "var(--normal-font)",
    monospace: "var(--monospace-font)",
    serif: "var(--serif-font)",
} as const

export const classes = {
    shadow: styles.shadow,
    round: styles.round
} as const