import React from "react"
export let Frame: React.FC<{
    basis?: React.CSSProperties["flexBasis"],
    grow?: React.CSSProperties["flexGrow"],
    shrink?: React.CSSProperties["flexShrink"],
    fill?: boolean,
    alignCross?: React.CSSProperties["alignItems"],
    alignMain?: React.CSSProperties["justifyContent"],
    direction?: React.CSSProperties["flexDirection"]
}> = ({
    children,
    basis = "initial",
    grow = "initial",
    shrink = "initial",
    fill = false,
    alignCross = "stretch",
    alignMain = "flex-start",
    direction = "column"
}) => {
        if (fill) {
            grow = 1
            shrink = 1
        }

        return <div style={{
            flexDirection: direction,
            flexBasis: basis,
            flexGrow: grow,
            flexShrink: shrink,
            justifyContent: alignMain,
            alignItems: alignCross,
            display: "flex"
        }}>{children}</div>
    }

export let Col: typeof Frame = (props) => <Frame {...{ ...props, direction: "column" }} />
export let Row: typeof Frame = (props) => <Frame {...{ ...props, direction: "row" }} />