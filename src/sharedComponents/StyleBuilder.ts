export class StyleBuilder {
    protected style = {} as React.CSSProperties

    addStyle<T extends keyof React.CSSProperties>(key: T, value: React.CSSProperties[T] | null) {
        if (value != null) {
            this.style[key] = value
        }

        return this
    }

    build() {
        return this.style
    }
}