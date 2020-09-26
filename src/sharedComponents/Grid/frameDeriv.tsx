import React, { forwardRef } from "react";
import { Frame, FrameProps } from "./Frame";


export let Col = forwardRef<HTMLDivElement, FrameProps>(function Col(props, ref) { return <Frame {...{ ...props, direction: "column" }} ref={ref} /> })
export let Row = forwardRef<HTMLDivElement, FrameProps>(function Row(props, ref) { return <Frame {...{ ...props, direction: "row" }} ref={ref} /> })
export let Spacer = forwardRef<HTMLDivElement, FrameProps>(function Spacer(props, ref) { return <Frame {...{ ...props, fill: true }} ref={ref} /> })
