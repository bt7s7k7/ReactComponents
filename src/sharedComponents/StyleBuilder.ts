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

    addClass(className: string) {
        this.classes.push(className)

        return this
    }

    build() {
        return { style: { ...this.style, ...this.overrideStyle }, className: [...this.classes, ...this.overrideClasses].join(" ") }
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