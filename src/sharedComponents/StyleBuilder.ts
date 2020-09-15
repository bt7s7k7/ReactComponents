
export class StyleBuilder {
    protected style = {} as React.CSSProperties
    protected overrideStyle = {} as React.CSSProperties
    protected classes = [] as string[]
    protected overrideClasses = [] as string[]

    addStyle<T extends keyof React.CSSProperties>(key: T, value: React.CSSProperties[T] | null) {
        if (value != null) {
            this.style[key] = value
        }

        return this
    }

    addStyles(styles: Partial<React.CSSProperties> | null) {
        if (styles != null)
            Object.entries(styles).forEach(([key, value]) => value != null && this.addStyle(key as keyof React.CSSProperties, value))
        return this
    }

    addClass(className: string) {
        this.classes.push(className)

        return this
    }

    build(props: BaseProps = {}) {
        let { noPropagation = false } = props
        return { ...(noPropagation ? {} : props), style: { ...this.style, ...this.overrideStyle }, className: [...this.classes, ...this.overrideClasses].join(" ") }
    }

    constructor({ style = {}, className = "" }: StyleableProps) {
        this.overrideStyle = { ...style }
        if (typeof className == "string") {
            this.overrideClasses.push(className)
        } else {
            this.overrideClasses.push(...(className.filter(v => v != null) as string[]))
        }
    }
}

export interface StyleableProps {
    className?: string | (string | null)[]
    style?: React.CSSProperties
}

export interface BaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "color"> {
    noPropagation?: boolean
}