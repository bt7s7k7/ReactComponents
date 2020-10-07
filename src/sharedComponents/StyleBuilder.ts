import { IThemeDefinition } from "./Theme/IThemeDefinition"
import { Theme } from "./Theme/Theme"
import { useTheme } from "./Theme/ThemeContext"

export class StyleBuilder {
    protected style = {} as React.CSSProperties
    protected overrideStyle = {} as React.CSSProperties
    protected classes = [] as string[]
    protected overrideClasses = [] as string[]

    public addStyle<T extends keyof React.CSSProperties>(key: T, value: React.CSSProperties[T] | null) {
        if (value != null) {
            this.style[key] = value
        }

        return this
    }

    public addStyles(styles: Partial<React.CSSProperties> | null) {
        if (styles != null)
            Object.entries(styles).forEach(([key, value]) => value != null && this.addStyle(key as keyof React.CSSProperties, value))
        return this
    }

    public setProperty(key: string, value: string | null | undefined) {
        if (value != null) (this.style as any)[key] = value
        return this
    }

    public addClass(className: string | null | false) {
        if (className) this.classes.push(Theme.lookupClass(className, this.theme))
        return this
    }

    public build() {
        return { style: { ...this.style, ...this.overrideStyle }, className: [...this.classes, ...this.overrideClasses].join(" ") }
    }

    protected constructor({ style = {}, className = "" }: StyleableProps, protected theme: IThemeDefinition) {
        this.overrideStyle = { ...style }

        const addClass = (className: string) => {
            this.overrideClasses.push(Theme.lookupClass(className, theme))
        }

        if (className instanceof Array) {
            className.forEach(v => v && addClass(v))
        } else {
            className && addClass(className)
        }
    }

    static makeStyleBuilder(props: StyleableProps, theme: IThemeDefinition) {
        return new StyleBuilder(props, theme)
    }
}

export interface StyleableProps {
    className?: string | null | false | (string | null | false | undefined)[]
    style?: React.CSSProperties
}

export function useStyleBuilder(props: StyleableProps) {
    return StyleBuilder.makeStyleBuilder(props, useTheme())
}